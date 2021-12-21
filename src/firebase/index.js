import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVnZ4yCeWq0mfExT92MKlGFdP6g-4lIWE",
  authDomain: "todo1-pagalo.firebaseapp.com",
  projectId: "todo1-pagalo",
  storageBucket: "todo1-pagalo.appspot.com",
  messagingSenderId: "107899186103",
  appId: "1:107899186103:web:6d9811d06d333d80129632",
  measurementId: "G-DZHGNGRH5Z"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);