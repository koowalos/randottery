import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as _ from 'lodash';
require('dotenv').config();
const { CloudTasksClient } = require('@google-cloud/tasks');

admin.initializeApp();

const location = process.env.LOCATION || 'europe-west2';
const project = process.env.PROJECT;
const serviceAccountEmail = process.env.SERVICEACCOUNTEMAIL;

export const addToTaskQueue = functions
  .region(location)
  .firestore.document('/lotteries/{documentId}')
  .onCreate(async (snap, context) => {
    const payload = {
      id: context.params.documentId,
    };
    functions.logger.log('Changing status to ready', payload);
    const endDate = snap.data().endDate;
    const queue = 'firestore-ttl';
    const tasksClient = new CloudTasksClient();
    const queuePath: string = tasksClient.queuePath(project, location, queue);
    const url = `https://${location}-${project}.cloudfunctions.net/initLotterySolver`;
    const task = {
      httpRequest: {
        httpMethod: 'POST',
        url,
        body: Buffer.from(JSON.stringify(payload)).toString('base64'),
        headers: {
          'Content-Type': 'application/json',
        },
        oidcToken: {
          serviceAccountEmail,
        },
      },
      scheduleTime: {
        seconds: endDate.seconds,
      },
    };

    const [response] = await tasksClient.createTask({
      parent: queuePath,
      task,
    });
    functions.logger.info('Task:', response);
    const update = { taskName: response.name };
    await snap.ref.update(update);
  });

export const initLotterySolver = functions
  .region(location)
  .https.onRequest(async (req, res) => {
    const { id } = req.body;

    if (!id) {
      functions.logger.error('Lottery ID missing');
      return res.status(400).json({ message: `Lottery ID missing` });
    }

    const lotteryRef = admin.firestore().collection('lotteries').doc(id);
    const doc = await lotteryRef.get();

    if (!doc.exists) {
      functions.logger.error('Lottery does not exist');
      return res.status(400).json({ message: `Lottery does not exist` });
    }

    const { participants, numberOfWinners, winners, status }: any = doc.data();

    if (winners || status !== 'active') {
      functions.logger.error('Lottery already closed');
      return res.status(400).json({ message: `Lottery already closed` });
    }

    const winnersResult = _.chain(participants)
      .shuffle()
      .slice(0, numberOfWinners)
      .value();

    await lotteryRef.set(
      {
        winners: winnersResult,
        taskId: admin.firestore.FieldValue.delete(),
        status: 'ended',
      },
      { merge: true }
    );

    return res.status(200).json({ message: `ok`, winners: winnersResult });
  });
