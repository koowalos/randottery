import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as _ from 'lodash';
const { CloudTasksClient } = require('@google-cloud/tasks');
admin.initializeApp();
// const db = admin.firestore();
// const auth = admin.auth();

// Get the project ID from the FIREBASE_CONFIG env var

const location = 'europe-west2';
const project = JSON.parse(process.env.FIREBASE_CONFIG!).projectId;
const serviceAccountEmail = 'cloudtask@randottery-dev.iam.gserviceaccount.com';

export const addToTaskQueue = functions
  .region(location)
  .firestore.document('/lotteries/{documentId}')
  .onCreate(async (snap, context) => {
    functions.logger.log('Changing status to ready', context.params.documentId);
    const endDate = snap.data().endDate;
    // const project = 'randottery';
    const queue = 'firestore-ttl';
    const tasksClient = new CloudTasksClient();
    const queuePath: string = tasksClient.queuePath(project, location, queue);
    // const url = `https://${location}-${project}.cloudfunctions.net/initLotterySolver?id=${context.params.documentId}`;
    const url =
      'https://europe-west2-randottery-dev.cloudfunctions.net/authTest';
    const task = {
      httpRequest: {
        httpMethod: 'GET',
        url,
        oidcToken: {
          serviceAccountEmail,
        },
      },
      scheduleTime: {
        seconds: endDate.seconds,
      },
    };

    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to Cloud Firestore.
    // Setting an 'uppercase' field in Cloud Firestore document returns a Promise.
    // return snap.ref
    //   .set({ taskId: '32434534456' }, { merge: true })
    //   .then((res) => {
    //     return tasksClient.createTask({
    //       parent: queuePath,
    //       task,
    //     });
    //   });

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
    const lotteryId: any = req.query.id;
    if (!lotteryId) {
      functions.logger.error('Lottery ID missing');
      res.status(400).json({ message: `Lottery ID missing` });
      return;
    }
    // Push the new message into Cloud Firestore using the Firebase Admin SDK.
    const lotteryRef = admin.firestore().collection('lotteries').doc(lotteryId);
    const doc = await lotteryRef.get();

    if (!doc.exists) {
      functions.logger.error('Lottery does not exist');
      res.status(400).json({ message: `Lottery does not exist` });
      return;
    }

    const { participants, numberOfWinners, winners, status }: any = doc.data();
    if (winners || status !== 'active') {
      functions.logger.error('Lottery already closed');
      res.status(400).json({ message: `Lottery already closed` });
      return;
    }
    const winnersResult = _.chain(participants)
      .shuffle()
      .slice(0, numberOfWinners)
      .value();

    try {
      await lotteryRef.set(
        {
          winners: winnersResult,
          taskId: admin.firestore.FieldValue.delete(),
          status: 'ended',
        },
        { merge: true }
      );
      res.status(200).json({ message: `ok`, winners: winnersResult });
      return;
    } catch (err) {
      functions.logger.error('Something is wrong', err);
      res.status(400).json({ message: `Something is wrong`, err });
      return;
    }
  });

export const createHttpTaskWithToken = functions
  .region(location)
  .https.onRequest(async (req, res) => {
    const client = new CloudTasksClient();
    const queue = 'firestore-ttl';
    const payload = {
      id: Date.now(),
    };
    const parent = client.queuePath(project, location, queue);

    const task: any = {
      httpRequest: {
        httpMethod: 'POST',
        url: 'https://europe-west2-randottery-dev.cloudfunctions.net/authTest',
        body: Buffer.from(JSON.stringify(payload)).toString('base64'),
        headers: {
          'Content-Type': 'application/json',
        },
        oidcToken: {
          serviceAccountEmail:
            'cloudtask2@randottery-dev.iam.gserviceaccount.com',
        },
      },
    };

    task.scheduleTime = {
      seconds: Date.now() / 1000 + 3600,
    };

    console.log('Sending task:');
    console.log(task);
    // Send create task request.
    const request = { parent, task };
    const [response] = await client.createTask(request);
    const name = response.name;
    res.status(200).json({ message: `Created task ${name}`, response });
    // [END cloud_tasks_create_http_task_with_token]
  });

export const authTest = functions
  .region(location)
  .https.onRequest(async (req, res) => {
    const { id } = req.body;
    functions.logger.log({ message: `ok`, id });
    res.status(200).json({ message: `ok`, id });
  });
