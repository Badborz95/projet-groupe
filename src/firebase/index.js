// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
/* 
*/

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwjBfaaOxu0q3af_aPIlvDnpvSE1z3ms0",
  authDomain: "instant-geek.firebaseapp.com",
  projectId: "instant-geek",
  storageBucket: "instant-geek.firebasestorage.app",
  messagingSenderId: "317020332794",
  appId: "1:317020332794:web:933ab287d47fafd86cdf43",
  measurementId: "G-5F717TETW2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);