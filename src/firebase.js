import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBmUxjhAt9p18wiVXegsQ_iOCqANvJNRzE",
    authDomain: "slack2-dd6dc.firebaseapp.com",
    projectId: "slack2-dd6dc",
    storageBucket: "slack2-dd6dc.appspot.com",
    messagingSenderId: "806943990347",
    appId: "1:806943990347:web:db778db240b51c71ede3ce",
    measurementId: "G-ZTM4WCXB2F"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db }
