import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "login-749ff.firebaseapp.com",
    projectId: "login-749ff",
    storageBucket: "login-749ff.appspot.com",
    messagingSenderId: "181661479917",
    appId: "1:181661479917:web:3c95fec71fdc17819e6de4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);