import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as _ from 'lodash';
import axios from 'axios'
require('dotenv').config();

admin.initializeApp();

const location = process.env.LOCATION || 'europe-west2';
const project = process.env.PROJECT;
const serviceAccountEmail = process.env.SERVICEACCOUNTEMAIL;

const addToCloudTasks = async (id: string, endDate: { seconds: number }) => {
  const queue = 'firestore-ttl';
  const { CloudTasksClient } = require('@google-cloud/tasks');
  const tasksClient = new CloudTasksClient();
  const queuePath: string = tasksClient.queuePath(project, location, queue);
  const url = `https://${location}-${project}.cloudfunctions.net/initLotterySolver`;
  const task = {
    httpRequest: {
      httpMethod: 'POST',
      url,
      body: Buffer.from(JSON.stringify({
        id
      })).toString('base64'),
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

  return response
}

const runCloudTask = async (taskName: string) => {
  const { CloudTasksClient } = require('@google-cloud/tasks');
  const tasksClient = new CloudTasksClient();
  await tasksClient.runTask({ name: taskName });
}

const deleteCloudTask = async (taskName: string) => {
  const { CloudTasksClient } = require('@google-cloud/tasks');
  const tasksClient = new CloudTasksClient();
  await tasksClient.deleteTask({ name: taskName });
}


const runInitLotterySolver = async (id: string) => {
  return axios.post(`http://localhost:5001/${project}/${location}/initLotterySolver`, {
    id
  }).then((result) => {
    return result
  }).catch((err) => {
    return err
  });
}

export const addToTaskQueue = functions
  .region(location)
  .firestore.document('/lotteries/{documentId}')
  .onCreate(async (snap, context) => {
    let update = { taskName: 'dummyName' };

    if (!snap.exists) {
      return
    }

    if (!process.env.FUNCTIONS_EMULATOR) {
      const { name } = await addToCloudTasks(context.params.documentId, snap.data().endDate)
      update = { taskName: name };
    }

    await snap.ref.update(update);
  });

export const lotteryOnUpdate = functions
  .region(location)
  .firestore.document('/lotteries/{documentId}')
  .onUpdate(async (change) => {
    // const before = change.before.data();
    const after = change.after.data();
    const { endWhenFull, participants, maxParticipants, status, taskName } = after;

    if (
      endWhenFull &&
      (maxParticipants > 0) &&
      maxParticipants === participants.length &&
      status === 'active'
    ) {
      if (!process.env.FUNCTIONS_EMULATOR) {
        await runCloudTask(taskName) // solve lottery because its full
        return
      } else {
        await runInitLotterySolver(change.after.id)
        return
      }
    }
    return
  });

export const lotteryOnDelete = functions
  .region(location)
  .firestore.document('/lotteries/{documentId}')
  .onDelete(async (snap) => {
    if (!snap.exists) {
      return
    }
    if (!process.env.FUNCTIONS_EMULATOR) {
      await deleteCloudTask(snap.data().taskName)
      return
    }
  });

export const initLotterySolver = functions
  .region(location)
  .https.onRequest(async (req, res) => {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: `Lottery ID missing` });
    }

    const lotteryRef = admin.firestore().collection('lotteries').doc(id);
    const doc = await lotteryRef.get();

    if (!doc.exists) {
      return res.status(400).json({ message: `Lottery does not exist` });
    }

    const { participants, numberOfWinners, winners, status }: any = doc.data();

    if (winners || status !== 'active') {
      return res.status(400).json({ message: `Lottery already closed`, id });
    }

    const winnerDetails: any = [];
    const winnersResult = _.slice(_.shuffle(participants), 0, numberOfWinners);

    if (winnersResult.length > 0) {
      const usersRef = admin.firestore().collection('users');
      const lotteryWinner = await usersRef
        .where('uid', 'in', winnersResult)
        .get(); // TODO: fix empty lottery crash

      if (!lotteryWinner.empty) {
        lotteryWinner.forEach((user: any) => {
          const userData = user.data();

          winnerDetails.push({
            displayName: userData.displayName,
            uid: userData.uid,
          });
        });
      }
    }

    await lotteryRef.set(
      {
        winners: winnerDetails,
        taskName: admin.firestore.FieldValue.delete(),
        status: 'ended',
      },
      { merge: true }
    );

    return res.status(200).json({ message: `ok`, winners: winnersResult });
  });
