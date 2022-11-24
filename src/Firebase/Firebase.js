// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1kQz5ej_9nGb8WIwyoZ-HSiesed0VN1M",
  authDomain: "apis-end-base-app.firebaseapp.com",
  projectId: "apis-end-base-app",
  storageBucket: "apis-end-base-app.appspot.com",
  messagingSenderId: "202278386382",
  appId: "1:202278386382:web:2ffd62093e46a7d246ee9f",
  measurementId: "G-P5DZDMPD7H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
