import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyBmUxjhAt9p18wiVXegsQ_iOCqANvJNRzE",
    authDomain: "slack2-dd6dc.firebaseapp.com",
    projectId: "slack2-dd6dc",
    storageBucket: "slack2-dd6dc.appspot.com",
    messagingSenderId: "806943990347",
    appId: "1:806943990347:web:db778db240b51c71ede3ce",
    measurementId: "G-ZTM4WCXB2F"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
