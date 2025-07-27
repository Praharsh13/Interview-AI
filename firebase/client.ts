import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAspHL-NvLakapf7nfmaaQWIjUP3Do8Tl4",
    authDomain: "interviewai-b817a.firebaseapp.com",
    projectId: "interviewai-b817a",
    storageBucket: "interviewai-b817a.firebasestorage.app",
    messagingSenderId: "20826107490",
    appId: "1:20826107490:web:6557df2741797519192b3b",
    measurementId: "G-J51L5KVQR0"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
