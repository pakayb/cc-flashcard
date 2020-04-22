import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyAyDdzt4XZ4kioeYWVPAl8oqdveDqEbvEg",
    authDomain: "cc-flashcardgame.firebaseapp.com",
    databaseURL: "https://cc-flashcardgame.firebaseio.com",
    projectId: "cc-flashcardgame",
    storageBucket: "cc-flashcardgame.appspot.com",
    messagingSenderId: "759855521744",
    appId: "1:759855521744:web:f4a89ea2eb86d8b57063d5",
    measurementId: "G-WBML6K5VT7"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const storage = firebaseApp.storage();
const db = firebaseApp.firestore();
firebase.analytics();

export {db,storage}