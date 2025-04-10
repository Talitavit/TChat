import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjvet1kAQOyF8ZwGEl34PJdcjLDYPfjtA",
  authDomain: "chat-online-aa7ad.firebaseapp.com",
  projectId: "chat-online-aa7ad",
  storageBucket: "chat-online-aa7ad.firebasestorage.app",
  messagingSenderId: "463747986686",
  appId: "1:463747986686:web:3572fa423b96ad1ce821af",
  measurementId: "G-99HW6LGQGK",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
