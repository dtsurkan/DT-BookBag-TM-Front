import firebase from "./firebase";

export const getAuthLocalPersistence = () =>
  firebase.auth.Auth.Persistence.LOCAL;
export const getAuthNonePersistence = () => firebase.auth.Auth.Persistence.NONE;
export const getAuthSessionPersistence = () =>
  firebase.auth.Auth.Persistence.SESSION;

export const getAuth = () => firebase.auth();

export const getGoogleAuthProvider = () =>
  new firebase.auth.GoogleAuthProvider();

export const getFacebookAuthProvider = () =>
  new firebase.auth.FacebookAuthProvider();
