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

export const lotteryOnUpdate = functions
  .region(location)
  .firestore.document('/lotteries/{documentId}')
  .onUpdate(async (change) => {
    // const before = change.before.data();
    const after = change.after.data();

    const taskName = after.taskName;

    const endWhenFull = after.endWhenFull;
    const participants = after.participants;
    const maxParticipants = after.maxParticipants;

    if (
      endWhenFull &&
      maxParticipants > 0 &&
      maxParticipants === participants.length
    ) {
      const tasksClient = new CloudTasksClient();
      await tasksClient.runTask({ name: taskName });
    }
  });

export const lotteryOnDelete = functions
  .region(location)
  .firestore.document('/lotteries/{documentId}')
  .onDelete(async (snap) => {
    const tasksClient = new CloudTasksClient();
    const taskName = snap.data().taskName;
    await tasksClient.deleteTask({ name: taskName });
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

    const winnersResult = _.slice(_.shuffle(participants), 0, numberOfWinners);
    functions.logger.error('nie ma lipy', { winnersResult });

    const usersRef = admin.firestore().collection('users');
    const lotteryWinner = await usersRef
      .where('uid', 'in', winnersResult)
      .get();
    functions.logger.error({ lotteryWinner });

    // TODO: fix empty lottery crash

    let winnerDetails: any = [];

    if (lotteryWinner.empty) {
      functions.logger.error('No winners');
    } else {
      functions.logger.info('else');
      lotteryWinner.forEach((user: any) => {
        const userData = user.data();
        functions.logger.info({ userData });

        winnerDetails.push({
          displayName: userData.displayName,
          uid: userData.uid,
        });
      });
    }
    functions.logger.info({ winnerDetails });
    await lotteryRef.set(
      {
        winners: winnerDetails,
        taskId: admin.firestore.FieldValue.delete(),
        status: 'ended',
      },
      { merge: true }
    );

    return res.status(200).json({ message: `ok`, winners: winnersResult });
  });
