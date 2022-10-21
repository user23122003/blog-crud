// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDx6M2ejSzKZY3fE6oGCTy_7mGHfRWVGbg",
  authDomain: "blog-ccbb5.firebaseapp.com",
  projectId: "blog-ccbb5",
  storageBucket: "blog-ccbb5.appspot.com",
  messagingSenderId: "762191325720",
  appId: "1:762191325720:web:26e955c4ad63502616f16d",
  measurementId: "G-RNQT1P4PWQ",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
