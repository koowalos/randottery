const now = parseInt(Date.now() / 1000);

export const mockUserPonciusz = {
  uid: 'ponciusz',
  email: 'ponciusz@gmail.com',
};

export const mockUserKowal = {
  uid: 'kowal',
  email: 'kowal@gmail.com',
};

export const mockUserKula = {
  uid: 'kula',
  email: 'kula@gmail.com',
};

export const mockData = {
  'users/ponciusz': {
    uid: 'ponciusz',
    displayName: 'Kamil Albrycht',
    email: 'ponciusz@gmail.com',
  },
  'users/kowal': {
    uid: 'kowal',
    displayName: 'Pawel Kownacki',
    email: 'kowal@gmail.com',
  },
  'users/kula': {
    uid: 'kula',
    displayName: 'Kula Kulson',
    email: 'kula@gmail.com',
  },
  'users/karni': {
    uid: 'karni',
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
    participants: ['kowal', 'kula'],
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
    participants: ['kowal'],
    prize: 'banan',
    status: 'ended',
  },
  'lotteries/ponciusz_d': {
    endDate: {
      seconds: now + 3600,
      nanoseconds: 828000000,
    },
    endWhenFull: true,
    maxParticipants: 2,
    name: 'ponciusz_d',
    numberOfWinners: 1,
    owner: 'ponciusz',
    participants: ['kowal'],
    prize: 'banan',
    status: 'active',
    taskName: 'dummy',
  },
  'lotteries/kowal_a': {
    endDate: {
      seconds: now + 3600,
      nanoseconds: 828000000,
    },
    endWhenFull: false,
    maxParticipants: 200,
    name: 'kowal_a',
    numberOfWinners: 1,
    owner: 'kowal',
    participants: ['ponciusz'],
    prize: 'super klocki',
    status: 'active',
  },
  'lotteries/kowal_b': {
    endDate: {
      seconds: now + 3600,
      nanoseconds: 828000000,
    },
    endWhenFull: false,
    maxParticipants: 200,
    name: 'kowal_b',
    numberOfWinners: 1,
    owner: 'kowal',
    participants: ['kula'],
    prize: 'super klocki',
    status: 'active',
  },
  'lotteries/kowal_c': {
    endDate: {
      seconds: now + 3600,
      nanoseconds: 828000000,
    },
    endWhenFull: false,
    maxParticipants: 2,
    name: 'kowal_c',
    numberOfWinners: 1,
    owner: 'kowal',
    participants: ['kula', 'karni'],
    prize: 'super klocki',
    status: 'active',
  },
};
