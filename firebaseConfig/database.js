import firebase from "./firebase";

export const getFirestore = () => firebase.firestore();
export const getRealTimeDatabase = () => firebase.database();
