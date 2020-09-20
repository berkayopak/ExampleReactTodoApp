import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: process.env.FIREBASE_API_KEY ? process.env.FIREBASE_API_KEY : 'FIREBASE_API_KEY',
    authDomain: process.env.FIREBASE_AUTH_DOMAIN ? process.env.FIREBASE_AUTH_DOMAIN : 'FIREBASE_AUTH_DOMAIN',
    databaseURL: process.env.FIREBASE_DATABASE_URL ? process.env.FIREBASE_DATABASE_UR : 'FIREBASE_DATABASE_UR',
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET ? process.env.FIREBASE_STORAGE_BUCKET : 'FIREBASE_STORAGE_BUCKET',
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID ? process.env.FIREBASE_MESSAGING_SENDER_ID : 'FIREBASE_MESSAGING_SENDER_ID',
    projectId: process.env.FIREBASE_PROJECT_ID ? process.env.FIREBASE_PROJECT_ID : 'FIREBASE_PROJECT_ID',
};

console.log(config);

firebase.initializeApp(config);

export default firebase;
