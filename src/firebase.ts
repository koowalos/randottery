import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import history from './history';

const config = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const db = firestore;

export const generateUserDocument = async (user, additionalData = {}) => {
  if (!user) return null;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error('Error fetching user', error);
  }
};
export const signInWithEmailAndPasswordHandler = (
  { email, password },
  onSucceed,
  onFail
) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      onSucceed();
    })
    .catch((error) => {
      console.log(error);
      onFail(error);
    });
};

export const createUserWithEmailAndPasswordHandler = async (
  { email, password },
  onSucceed,
  onFail
) => {
  try {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    generateUserDocument(user, { displayName: 'My default Name' });
    await onSucceed();
  } catch (error) {
    console.log(error);
    onFail({
      code: error.code,
      message: error.message,
    });
    console.log('Error Signing up with email and password');
  }
};

export const signOut = () => {
  auth.signOut();
};

export const createLottery = (data, uid) => {
  console.log('createLottery', data);

  db.collection('lotteries')
    .add({
      ...data,
      status: 'active',
      owner: uid,
      participants: [],
      endDate: firebase.firestore.Timestamp.fromMillis(data.endDate),
    })
    .then(function (res) {
      history.push(`/lottery/${res.id}`);
      console.log('Document successfully written!');
    })
    .catch(function (error) {
      console.error('Error writing document: ', error);
    });
};

export const deleteLottery = (id) => {
  return 'deleteLottery';
};

export const joinLottery = (lotteryId, uid) => {
  console.log({ lotteryId, uid });
  var currentLottery = db.collection('lotteries').doc(lotteryId);

  currentLottery
    .update({
      participants: firebase.firestore.FieldValue.arrayUnion(uid),
    })
    .then(function () {
      console.log('Document successfully written!');
    })
    .catch(function (error) {
      console.error('Error writing document: ', error);
    });
};

export const leaveLottery = (id) => {
  return 'leaveLottery';
};
