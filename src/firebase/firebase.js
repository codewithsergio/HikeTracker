import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBb6dlMYLOX8IHy71i7QiUynHpto8m-ASU",
  authDomain: "my-hikes-d702e.firebaseapp.com",
  projectId: "my-hikes-d702e",
  storageBucket: "my-hikes-d702e.appspot.com",
  messagingSenderId: "239288202056",
  appId: "1:239288202056:web:69028efe4fcc810d0cb97d",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
