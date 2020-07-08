import { mockData, mockUser } from './mocks';
const { setup, teardown } = require('./helpers');

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

  test('DENY when reading/writing an unauthorized collection', async () => {
    await expect(ref.get()).toDeny();
  });

  test('DENY when read users collection', async () => {
    await expect(refUsers.get()).toDeny();
  });

  test('ALLOW when read current user', async () => {
    await expect(refUsers.doc('ponciusz')).toAllow();
  });

  test('DENY when read other user profile', async () => {
    await expect(refUsers.doc('kowal').get()).toDeny();
  });

  test('ALLOW CREATE Lottery', async () => {
    await expect(
      refLotteries.doc('ponciusz_new').set({
        endDate: '2020-07-11 23:15:41',
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

  test('ALLOW DELETE own empty Lottery', async () => {
    await expect(refLotteries.doc('ponciusz_new').delete()).toAllow();
  });

  test('DENY CREATE lottery with predefined participants', async () => {
    await expect(
      refLotteries.doc('ponciusz3').set({
        endDate: '2020-07-11 23:15:41',
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

  test('DENY CREATE lottery as somebody else', async () => {
    await expect(
      refLotteries.doc('ponciusz_new2').set({
        endDate: '2020-07-11 23:15:41',
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

  test('DENY JOIN own lottery', async () => {
    await expect(
      refLotteries.doc('ponciusz_a').update({
        participants: ['koowal', 'kula', 'ponciusz'],
      })
    ).toDeny();
  });

  test('ALLOW JOIN lottery', async () => {
    await expect(
      refLotteries.doc('koowal_b').update({
        participants: ['kula', 'ponciusz'],
      })
    ).toAllow();
  });

  test('DENY JOIN full lottery', async () => {
    await expect(
      refLotteries.doc('koowal_c').update({
        participants: ['kula', 'karni', 'ponciusz'],
      })
    ).toDeny();
  });

  test('ALLOW LEAVE lottery', async () => {
    await expect(
      refLotteries.doc('koowal_b').update({
        participants: ['kula'],
      })
    ).toAllow();
  });

  test('DENY JOIN ended lottery', async () => {
    await expect(
      refLotteries.doc('kowal_c').update({
        participants: ['kula', 'ponciusz'],
      })
    ).toDeny();
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
