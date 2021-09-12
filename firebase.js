import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDTM0DC6Q6w2WhLv86iCcklxEnnqgBbq8k",
  authDomain: "clone-58e04.firebaseapp.com",
  projectId: "clone-58e04",
  storageBucket: "clone-58e04.appspot.com",
  messagingSenderId: "526101603958",
  appId: "1:526101603958:web:521a5ce1cd3795e4902157",
  measurementId: "G-QQJKCG534B"
};
const app = !firebase.apps.length 
? firebase.initializeApp(firebaseConfig)
: firebase.app()
const db = app.firestore()
export default db;