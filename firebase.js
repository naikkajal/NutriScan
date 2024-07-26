
import { initializeApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBwO4eOpmaOeh-cheg9QIILUNBN7a7fUZs",
  authDomain: "nutrition-c8f3c.firebaseapp.com",
  projectId: "nutrition-c8f3c",
  storageBucket: "nutrition-c8f3c.appspot.com",
  messagingSenderId: "109786197380",
  appId: "1:109786197380:web:f9f248657d4eb279bc01d1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };