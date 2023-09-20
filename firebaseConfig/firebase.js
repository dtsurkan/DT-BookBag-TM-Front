import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxTA9bezgyihR-RtIIVBgswQelAQJsfmU",
  authDomain: "bookbag-4c9a1.firebaseapp.com",
  projectId: "bookbag-4c9a1",
  storageBucket: "bookbag-4c9a1.appspot.com",
  messagingSenderId: "283136433519",
  appId: "1:283136433519:web:ace6725081bb342d62dc9a",
  measurementId: "G-R8KVLDNDP1",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default firebase;
