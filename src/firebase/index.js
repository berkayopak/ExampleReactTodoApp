import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY ? process.env.REACT_APP_FIREBASE_API_KEY : 'FIREBASE_API_KEY',
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ? process.env.REACT_APP_FIREBASE_AUTH_DOMAIN : 'FIREBASE_AUTH_DOMAIN',
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL ? process.env.REACT_APP_FIREBASE_DATABASE_URL : 'FIREBASE_DATABASE_URL',
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ? process.env.REACT_APP_FIREBASE_STORAGE_BUCKET : 'FIREBASE_STORAGE_BUCKET',
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ? process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID : 'FIREBASE_MESSAGING_SENDER_ID',
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID ? process.env.REACT_APP_FIREBASE_PROJECT_ID : 'FIREBASE_PROJECT_ID',
};

firebase.initializeApp(config);

export default firebase;
