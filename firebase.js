// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBwO4eOpmaOeh-cheg9QIILUNBN7a7fUZs",
  authDomain: "nutrition-c8f3c.firebaseapp.com",
  projectId: "nutrition-c8f3c",
  storageBucket: "nutrition-c8f3c.appspot.com",
  messagingSenderId: "109786197380",
  appId: "1:109786197380:web:f9f248657d4eb279bc01d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const firestore = getFirestore(app);

export { auth, firestore };
