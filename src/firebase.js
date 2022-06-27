import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA4-odQSD1uztxPU0jSVSWySTzmdibEbgs",
    authDomain: "banking-b6bcb.firebaseapp.com",
    databaseURL: "https://banking-b6bcb-default-rtdb.firebaseio.com",
    projectId: "banking-b6bcb",
    storageBucket: "banking-b6bcb.appspot.com",
    messagingSenderId: "63567606585",
    appId: "1:63567606585:web:ed835716983fe5d6806ee8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

