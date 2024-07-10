// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwO4eOpmaOeh-cheg9QIILUNBN7a7fUZs",
  authDomain: "nutrition-c8f3c.firebaseapp.com",
  projectId: "nutrition-c8f3c",
  storageBucket: "nutrition-c8f3c.appspot.com",
  messagingSenderId: "109786197380",
  appId: "1:109786197380:web:f9f248657d4eb279bc01d1"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  
  export { auth, firestore };