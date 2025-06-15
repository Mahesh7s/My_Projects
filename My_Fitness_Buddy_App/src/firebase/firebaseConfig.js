// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFZ6wVDb17Id8WbZ39cNcyhC1GA5r65Wg",
  authDomain: "fitness-buddy-app-3e024.firebaseapp.com",
  projectId: "fitness-buddy-app-3e024",
  storageBucket: "fitness-buddy-app-3e024.firebasestorage.app",
  messagingSenderId: "159003906251",
  appId: "1:159003906251:web:56ec94c0e6ebf8f9928b4e",
  measurementId: "G-Y6N0X2SCSN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getDatabase(app);
