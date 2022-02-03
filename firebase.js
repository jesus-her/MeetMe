// Import the functions you need from the SDKs you need
import * as firebase from "firebase";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIQLvSgBEuRiE5Ks0GHcHgsryDjo62z28",
  authDomain: "quizapp-1f071.firebaseapp.com",
  projectId: "quizapp-1f071",
  storageBucket: "quizapp-1f071.appspot.com",
  messagingSenderId: "919027424221",
  appId: "1:919027424221:web:1ec94bb82bbc62cdebf434",
  measurementId: "G-71MP9181LS",
};
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const firebase_db = firebase;
export { auth, firestore, storage, firebase_db };
