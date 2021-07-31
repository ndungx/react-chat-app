import firebase from "firebase";
import 'firebase/analytics';
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyAqdbxgrmUrJ82yiryZmARv3PX1xZM4kp4",
    authDomain: "react-chat-app-dc540.firebaseapp.com",
    projectId: "react-chat-app-dc540",
    storageBucket: "react-chat-app-dc540.appspot.com",
    messagingSenderId: "480905889397",
    appId: "1:480905889397:web:7538ee4bea45cad676da3c",
    measurementId: "G-TNT77KDKZJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator('http://localhost:9099');
if (window.location.hostname === 'localhost') {
    db.useEmulator('localhost', '8080');
}

export { db, auth }
export default firebase;