// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "argon-triode-401408.firebaseapp.com",
  projectId: "argon-triode-401408",
  storageBucket: "argon-triode-401408.appspot.com",
  messagingSenderId: "861531131638",
  appId: "1:861531131638:web:8d98d9717e248541fea6d7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);