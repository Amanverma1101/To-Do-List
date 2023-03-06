const firebase = require("firebase-admin");
const credentials = require("../key.json");
const firebaseConfig = {
  apiKey: "AIzaSyDs0Y1x828BlG6ojCA_EnKdsisshNJ3XZ8",
  authDomain: "todolist-df8cf.firebaseapp.com",
  projectId: "todolist-df8cf",
  storageBucket: "todolist-df8cf.appspot.com",
  messagingSenderId: "254652610941",
  appId: "1:254652610941:web:98fc2bea1eecf964bab414",
};
// firebase.initializeApp(firebaseConfig);
firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
});
const db = firebase.firestore();
// const Task = db.collection("Tasks");
// const Credential = db.collection("Cresentials");
module.exports = db;
