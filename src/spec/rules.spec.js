const { setup, teardown } = require('./helpers');
const { assertFails, assertSucceeds } = require('@firebase/testing');

const mockUser = {
  uid: 'ponciusz',
  email: 'ponciusz@gmail.com',
};

const mockData = {
  'users/ponciusz': {
    displayName: 'My Name',
    email: 'ponciusz@gmail.com',
    photoURL: null,
  },
  'lotteries/ponciusz1': {
    endDate: '2020-07-11 23:15:41',
    endWhenFull: true,
    maxParticipants: 100,
    name: 'loteria',
    numberOfWinners: 1,
    owner: 'ponciusz',
    participants: ['ponciusz'],
    prize: 'banan',
    status: 'active',
  },
};

describe('Database rules', () => {
  let db;
  let ref;
  let refLotteries;
  console.log('describe');
  // Applies only to tests in this describe block
  beforeAll(async () => {
    db = await setup();
    // All paths are secure by default
    ref = db.collection('some-nonexistent-collection');
    refLotteries = db.collection('lotteries');
  });

  afterAll(async () => {
    console.log('afterAll');
    await teardown();
  });

  // test('fail when reading/writing an unauthorized collection', async () => {
  //   console.log({ refLotteries });
  //   // Custom Matchers
  //   await expect(ref.get()).toAllow();
  // });

  // test('Read Lottery', async () => {
  //   console.log('test Read Lottery');
  //   await expect(refLotteries.get()).toAllow();
  // });

  test('Add Lottery', async () => {
    await expect(
      refLotteries.doc('xxx').set({
        endDate: '2020-07-11 23:15:41',
        endWhenFull: true,
        maxParticipants: 100,
        name: 'loteria',
        numberOfWinners: 1,
        owner: 'ponciusz',
        participants: ['ponciusz'],
        prize: 'banan',
        status: 'active',
      })
    ).toAllow();
  });

  // test('Add Lottery', async () => {
  //   const data = await refLotteries.doc('xxx').get();
  //   console.log(data.data());
  // });

  test('Add Lottery', async () => {
    const data = await refLotteries.get();
    data.forEach(function (doc) {
      console.log(doc.id, ' => ', doc.data());
    });
  });
});
