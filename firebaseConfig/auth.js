import firebase from "./firebase";

export const getAuth = () => firebase.auth();

export const getGoogleAuthProvider = () =>
  new firebase.auth.GoogleAuthProvider();

export const getFacebookAuthProvider = () =>
  new firebase.auth.FacebookAuthProvider();
