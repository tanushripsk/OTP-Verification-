// firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyATHNxYmRm1C65bosiiwV-5c0k89eB6mXM",
  authDomain: "opt-verification-97075.firebaseapp.com",
  projectId: "opt-verification-97075",
  storageBucket: "opt-verification-97075.firebasestorage.app",
  messagingSenderId: "536159322901",
  appId: "1:536159322901:web:84841aa220a297d7845f1c",
  measurementId: "G-94Y5VSHFTJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Auth
const auth = getAuth(app);

// Export auth object
export { auth };
