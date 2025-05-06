// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC7Ti6XtDZ-LCOwl3UAF6uE9JjdGboPxDs",
    authDomain: "multiliingual-text-extractor.firebaseapp.com",
    projectId: "multiliingual-text-extractor",
    storageBucket: "multiliingual-text-extractor.firebasestorage.app",
    messagingSenderId: "922096509309",
    appId: "1:922096509309:web:d702a9feb318d685bf6c14",
    measurementId: "G-J7R0W4395J"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db, collection, addDoc };



