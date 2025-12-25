import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDWiE3irAvXzDTGH77StY6_WxaXgCW8z3c",
    authDomain: "interviews-e177f.firebaseapp.com",
    projectId: "interviews-e177f",
    storageBucket: "interviews-e177f.firebasestorage.app",
    messagingSenderId: "528485388968",
    appId: "1:528485388968:web:2f53e04ec3950db225e89d",
    measurementId: "G-ZVR2Y99GLZ"
};

const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
