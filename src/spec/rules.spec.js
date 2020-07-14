import { mockData, mockUser } from './mocks';
import firebase from 'firebase/app';
const { setup, teardown } = require('./helpers');

const firebaseTimestamp = (seconds, subtract = false) => {
  return firebase.firestore.Timestamp.fromMillis(
    subtract ? Date.now() - seconds * 1000 : Date.now() + seconds * 1000
  );
};

describe('Database rules', () => {
  let db;
  let ref;
  let refLotteries;
  let refUsers;
  // Applies only to tests in this describe block
  beforeAll(async () => {
    db = await setup(mockUser, mockData);
    ref = db.collection('some-nonexistent-collection');
    refLotteries = db.collection('lotteries');
    refUsers = db.collection('users');
  });

  afterAll(async () => {
    console.log('afterAll');
    await teardown();
  });

  test('READ   | ALLOW | when read current user', async () => {
    await expect(refUsers.doc('ponciusz')).toAllow();
  });

  test('READ   | DENY  | when reading/writing an unauthorized collection', async () => {
    await expect(ref.get()).toDeny();
  });

  test('READ   | DENY  | when read users collection', async () => {
    await expect(refUsers.get()).toDeny();
  });

  test('READ   | DENY  | when read other user profile', async () => {
    await expect(refUsers.doc('kowal').get()).toDeny();
  });

  test('CREATE | ALLOW | create Lottery', async () => {
    await expect(
      refLotteries.doc('ponciusz_new').set({
        endDate: firebaseTimestamp(3600),
        endWhenFull: true,
        maxParticipants: 100,
        name: 'loteria',
        numberOfWinners: 1,
        owner: 'ponciusz',
        participants: [],
        prize: 'banan',
        status: 'active',
      })
    ).toAllow();
  });

  test('CREATE | DENY  | create Lottery with passed date ', async () => {
    await expect(
      refLotteries.doc('ponciusz_passed').set({
        endDate: firebaseTimestamp(3600, true),
        endWhenFull: true,
        maxParticipants: 100,
        name: 'loteria',
        numberOfWinners: 1,
        owner: 'ponciusz',
        participants: [],
        prize: 'banan',
        status: 'active',
      })
    ).toDeny();
  });

  test('CREATE | DENY  | create Lottery with more winners than participants', async () => {
    await expect(
      refLotteries.doc('ponciusz_participants').set({
        endDate: firebaseTimestamp(3600),
        endWhenFull: true,
        maxParticipants: 10,
        name: 'loteria',
        numberOfWinners: 10,
        owner: 'ponciusz',
        participants: [],
        prize: 'banan',
        status: 'active',
      })
    ).toDeny();
  });

  test('CREATE | DENY  | create Lottery with 1 participant', async () => {
    await expect(
      refLotteries.doc('ponciusz_participants').set({
        endDate: firebaseTimestamp(3600),
        endWhenFull: true,
        maxParticipants: 1,
        name: 'loteria',
        numberOfWinners: 0,
        owner: 'ponciusz',
        participants: [],
        prize: 'banan',
        status: 'active',
      })
    ).toDeny();
  });

  test('CREATE | DENY  | create lottery with predefined participants', async () => {
    await expect(
      refLotteries.doc('ponciusz3').set({
        endDate: firebaseTimestamp(3600),
        endWhenFull: true,
        maxParticipants: 100,
        name: 'loteria',
        numberOfWinners: 1,
        owner: 'ponciusz',
        participants: ['someUser'],
        prize: 'banan',
        status: 'active',
      })
    ).toDeny();
  });

  test('CREATE | DENY  | create lottery as somebody else', async () => {
    await expect(
      refLotteries.doc('ponciusz_new2').set({
        endDate: firebaseTimestamp(3600),
        endWhenFull: true,
        maxParticipants: 100,
        name: 'loteria',
        numberOfWinners: 1,
        owner: 'kowal',
        participants: [],
        prize: 'banan',
        status: 'active',
      })
    ).toDeny();
  });

  test('UPDATE | ALLOW | join lottery', async () => {
    await expect(
      refLotteries.doc('koowal_b').update({
        participants: ['kula', 'ponciusz'],
      })
    ).toAllow();
  });

  test('UPDATE | ALLOW | leave lottery', async () => {
    await expect(
      refLotteries.doc('koowal_b').update({
        participants: ['kula'],
      })
    ).toAllow();
  });

  test('UPDATE | DENY  | join own lottery', async () => {
    await expect(
      refLotteries.doc('ponciusz_a').update({
        participants: ['koowal', 'kula', 'ponciusz'],
      })
    ).toDeny();
  });

  test('UPDATE | DENY  | join full lottery', async () => {
    await expect(
      refLotteries.doc('koowal_c').update({
        participants: ['kula', 'karni', 'ponciusz'],
      })
    ).toDeny();
  });

  test('UPDATE | DENY  | join ended lottery', async () => {
    await expect(
      refLotteries.doc('kowal_c').update({
        participants: ['kula', 'ponciusz'],
      })
    ).toDeny();
  });

  test('DELETE | ALLOW | delete own empty Lottery', async () => {
    await expect(refLotteries.doc('ponciusz_new').delete()).toAllow();
  });

  // test('Read all lotteries', async () => {
  //   console.log('------------------- AFTER -------------------');
  //   const data = await refLotteries.get();
  //   data.forEach(function (doc) {
  //     console.log(doc.id, ' => ', doc.data());
  //   });
  // });

  // test('Read Lottery', async () => {
  //   console.log('test Read Lottery');
  //   await expect(refLotteries.get()).toAllow();
  // });

  // test('Read Lotteries', async () => {
  //   const data = await refLotteries.get();
  //   console.log('------------------- BEFORE -------------------');
  //   data.forEach(function (doc) {
  //     console.log('before:', doc.id, ' => ', doc.data());
  //   });
  // });

  // test('Read Users', async () => {
  //   const data = await refUsers.get();
  //   console.log('------------------- USERS -------------------');
  //   data.forEach(function (doc) {
  //     console.log('before:', doc.id, ' => ', doc.data());
  //   });
  // });
});
