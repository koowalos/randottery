const firebase = require('@firebase/testing');
const fs = require('fs');

const projectId = `randottery-dev`;
// const projectId = `rules-spec-${Date.now()}`;

module.exports.setup = async (auth, data) => {
  const app = firebase.initializeTestApp({
    projectId,
    auth,
  });

  const adminApp = firebase.initializeAdminApp({
    projectId,
  });

  const adminDb = adminApp.firestore();
  const db = app.firestore();

  // Write mock documents before rules
  if (data) {
    for (const key in data) {
      const ref = adminDb.doc(key);
      await ref.set(data[key]);
    }
  }

  // Apply rules
  await firebase.loadFirestoreRules({
    projectId,
    rules: fs.readFileSync('firestore.rules', 'utf8'),
  });

  return db;
};

module.exports.teardown = async () => {
  Promise.all(
    firebase.apps().map((app) => app.delete()),
    firebase.clearFirestoreData({ projectId })
  );
};
