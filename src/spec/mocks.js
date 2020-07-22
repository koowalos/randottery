const now = parseInt(Date.now() / 1000);

export const mockUser = {
  uid: 'ponciusz',
  email: 'ponciusz@gmail.com',
};

export const mockData = {
  'users/ponciusz': {
    displayName: 'Kamil Albrycht',
    email: 'ponciusz@gmail.com',
  },
  'users/kowal': {
    displayName: 'Pawel Kownacki',
    email: 'koowal@gmail.com',
  },
  'users/kula': {
    displayName: 'Kula Kulson',
    email: 'kula@gmail.com',
  },
  'users/karni': {
    displayName: 'Karnol Kalrnoliusz',
    email: 'karni@gmail.com',
  },
  'lotteries/ponciusz_a': {
    endDate: {
      seconds: now + 3600,
      nanoseconds: 828000000,
    },
    endWhenFull: true,
    maxParticipants: 100,
    name: 'ponciusz_a',
    numberOfWinners: 1,
    owner: 'ponciusz',
    participants: ['koowal', 'kula'],
    prize: 'banan',
    status: 'active',
  },
  'lotteries/ponciusz_b': {
    endDate: {
      seconds: now + 3600,
      nanoseconds: 828000000,
    },
    endWhenFull: true,
    maxParticipants: 100,
    name: 'ponciusz_b',
    numberOfWinners: 1,
    owner: 'ponciusz',
    participants: [],
    prize: 'banan',
    status: 'active',
  },
  'lotteries/ponciusz_c': {
    endDate: {
      seconds: now + 3600,
      nanoseconds: 828000000,
    },
    endWhenFull: true,
    maxParticipants: 100,
    name: 'ponciusz_c',
    numberOfWinners: 1,
    owner: 'ponciusz',
    participants: ['koowal'],
    prize: 'banan',
    status: 'ended',
  },
  'lotteries/koowal_a': {
    endDate: {
      seconds: now + 3600,
      nanoseconds: 828000000,
    },
    endWhenFull: false,
    maxParticipants: 200,
    name: 'koowal_a',
    numberOfWinners: 1,
    owner: 'koowal',
    participants: ['ponciusz'],
    prize: 'super klocki',
    status: 'active',
  },
  'lotteries/koowal_b': {
    endDate: {
      seconds: now + 3600,
      nanoseconds: 828000000,
    },
    endWhenFull: false,
    maxParticipants: 200,
    name: 'koowal_b',
    numberOfWinners: 1,
    owner: 'koowal',
    participants: ['kula'],
    prize: 'super klocki',
    status: 'active',
  },
  'lotteries/koowal_c': {
    endDate: {
      seconds: now + 3600,
      nanoseconds: 828000000,
    },
    endWhenFull: false,
    maxParticipants: 2,
    name: 'koowal_c',
    numberOfWinners: 1,
    owner: 'koowal',
    participants: ['kula', 'karni'],
    prize: 'super klocki',
    status: 'active',
  },
};
