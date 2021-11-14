// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore/lite';
const firebaseConfig = require('../secrets/firebaseConfig');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getFirestore(firebaseApp);

export {
    firebaseApp,
    database
}