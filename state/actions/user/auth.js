import { message } from "antd";
import { getAuth, getGoogleAuthProvider } from "firebaseConfig";
import {
  getAuthLocalPersistence,
  getFacebookAuthProvider,
} from "firebaseConfig/auth";
import { YOUR_ORIGIN_URL } from "utils/constants";
// AUTHENTIFICATION
export const SET_CURRENT_USER_PROFILE_PENDING =
  "SET_CURRENT_USER_PROFILE_PENDING";
export const SET_CURRENT_USER_PROFILE_SUCCESS =
  "SET_CURRENT_USER_PROFILE_SUCCESS";
export const SET_CURRENT_USER_PROFILE_ERROR = "SET_CURRENT_USER_PROFILE_ERROR";
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
export const SET_RESET_PASSWORD_PENDING = "SET_RESET_PASSWORD_PENDING";
export const SET_RESET_PASSWORD_SUCCESS = "SET_RESET_PASSWORD_SUCCESS";
export const SET_RESET_PASSWORD_ERROR = "SET_RESET_PASSWORD_ERROR";
// ----------------------------------------------------
// AUTHENTIFICATION
// Google Sign-in
const googleProvider = getGoogleAuthProvider();
const facebookProvider = getFacebookAuthProvider();

export const setCurrentUserProfilePending = () => ({
  type: SET_CURRENT_USER_PROFILE_PENDING,
});
export const setCurrentUserProfileSuccess = (payload) => ({
  type: SET_CURRENT_USER_PROFILE_SUCCESS,
  payload,
});
export const setCurrentUserProfileError = () => ({
  type: SET_CURRENT_USER_PROFILE_ERROR,
});

export const setResetPasswordPending = () => ({
  type: SET_RESET_PASSWORD_PENDING,
});
export const setResetPasswordSuccess = () => ({
  type: SET_RESET_PASSWORD_SUCCESS,
});
export const setResetPasswordError = () => ({
  type: SET_RESET_PASSWORD_ERROR,
});

export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS,
});
export const doGoogleSignIn = () => async (dispatch) => {
  dispatch(setCurrentUserProfilePending());
  try {
    await getAuth().setPersistence(getAuthLocalPersistence());
    const response = await getAuth().signInWithPopup(googleProvider);
    // console.log("response", response);
    dispatch(setCurrentUserProfileSuccess(response));
    message.success("You are signed in");
    return response;
  } catch (error) {
    console.log("error", error);
    dispatch(setCurrentUserProfileError());
    switch (error.code) {
      default:
        message.error(error.message);
        break;
    }
    throw error;
  }
};

export const doFacebookSignIn = () => async (dispatch) => {
  dispatch(setCurrentUserProfilePending());
  try {
    await getAuth().setPersistence(getAuthLocalPersistence());
    const response = await getAuth().signInWithPopup(facebookProvider);
    dispatch(setCurrentUserProfileSuccess(response));
    message.success("You are signed in");
    return response;
  } catch (error) {
    dispatch(setCurrentUserProfileError());
    // Connect general errors
    switch (error.code) {
      case "auth/account-exists-with-different-credential":
        let pendingCredential = error.credential;
        // console.log("pendingCredential :>> ", pendingCredential);
        let email = error.email;
        const fetchSignInMethods = await getAuth().fetchSignInMethodsForEmail(
          email
        );
        // console.log("fetchSignInMethods :>> ", fetchSignInMethods);
        if (fetchSignInMethods[0] === "google.com") {
          dispatch(setCurrentUserProfilePending());
          try {
            const responseWithOtherSignIn = await getAuth().signInWithPopup(
              googleProvider
            );
            const retrieveDataFromOtherProvider = await responseWithOtherSignIn.user.linkWithCredential(
              pendingCredential
            );

            dispatch(
              setCurrentUserProfileSuccess(retrieveDataFromOtherProvider)
            );
            message.success("You are signed in");
            return retrieveDataFromOtherProvider;
          } catch (error) {
            dispatch(setCurrentUserProfileError());
            switch (error.code) {
              default:
                message.error(error.message);
                break;
            }
            // throw error;
          }
        }
        if (fetchSignInMethods[0] === "password") {
          dispatch(setCurrentUserProfilePending());
          try {
            const password = prompt("Please enter your password:", "password");
            if (password === null || password === "") {
              return;
            }
            const responseWithOtherSignIn = await getAuth().signInWithEmailAndPassword(
              email,
              password
            );
            const retrieveDataFromOtherProvider = await responseWithOtherSignIn.user.linkWithCredential(
              pendingCredential
            );
            await getAuth().currentUser.updateProfile({
              displayName:
                retrieveDataFromOtherProvider.additionalUserInfo.profile.name,
            });

            dispatch(
              setCurrentUserProfileSuccess(retrieveDataFromOtherProvider)
            );
            message.success("You are signed in");
            return retrieveDataFromOtherProvider;
          } catch (error) {
            // Connect general errors
            dispatch(setCurrentUserProfileError());
            switch (error.code) {
              default:
                message.error(error.message);
                break;
            }
            throw error;
          }
        }
        break;
      default:
        message.error(error.message);
        break;
    }
    throw error;
  }
};

export const doCustomSignIn = (email, password) => async (dispatch) => {
  dispatch(setCurrentUserProfilePending());
  try {
    await getAuth().setPersistence(getAuthLocalPersistence());
    const response = await getAuth().signInWithEmailAndPassword(
      email,
      password
    );

    dispatch(setCurrentUserProfileSuccess(response));
    message.success("You are signed in");
    return response;
  } catch (error) {
    // setTimeout(() => {
    dispatch(setCurrentUserProfileError());
    // }, 1000);

    // Connect general errors
    switch (error.code) {
      default:
        message.error(error.message);
        break;
    }
    throw error;
  }
};

export const doCustomSignUp = (displayName, email, password) => async (
  dispatch
) => {
  dispatch(setCurrentUserProfilePending());
  try {
    await getAuth().setPersistence(getAuthLocalPersistence());
    const response = await getAuth().createUserWithEmailAndPassword(
      email,
      password
    );
    // console.log("response", response);
    await getAuth().currentUser.updateProfile({
      displayName,
    });
    const actionCodeSettings = {
      // url: "http://localhost:3000/login",
      url: `${YOUR_ORIGIN_URL}/login`,
      iOS: {
        bundleId: "com.example.ios",
      },
      android: {
        packageName: "com.example.android",
        installApp: true,
        minimumVersion: "12",
      },
      handleCodeInApp: true,
      // When multiple custom dynamic link domains are defined, specify which
      // one to use.
      dynamicLinkDomain: "bookbag.page.link",
    };
    await response.user.sendEmailVerification(actionCodeSettings).then(() => {
      message.success("Відправлено лінк на пошту");
    });
    dispatch(setCurrentUserProfileSuccess(null));
    message.success(
      "Вы создали аккаунт. Для верификации перейдите на почту и нажмите на ссылку и зайдите в систему."
    );
    return response;
  } catch (error) {
    console.log("error", error);
    dispatch(setCurrentUserProfileError());

    // Connect general errors
    switch (error.code) {
      default:
        message.error(error.message);
        break;
    }
    throw error;
  }
};

export const doResetPassword = (email) => async (dispatch) => {
  console.log("email33", email);
  dispatch(setResetPasswordPending());
  try {
    const actionCodeSettings = {
      // url: "http://localhost:3000/login",
      url: `${YOUR_ORIGIN_URL}/login`,
      iOS: {
        bundleId: "com.example.ios",
      },
      android: {
        packageName: "com.example.android",
        installApp: true,
        minimumVersion: "12",
      },
      handleCodeInApp: true,
      // When multiple custom dynamic link domains are defined, specify which
      // one to use.
      dynamicLinkDomain: "bookbag.page.link",
    };
    const response = await getAuth().sendPasswordResetEmail(
      email,
      actionCodeSettings
    );
    dispatch(setResetPasswordSuccess());
    message.success(
      "Вам отправлено на почту ссылку для восстановления пароля. Пожалуйста, проверьте емейл"
    );
    return response;
  } catch (error) {
    // Connect general errors
    dispatch(setResetPasswordError());
    switch (error.code) {
      default:
        message.error(error.message);
        break;
    }
    throw error;
  }
};

export const doSignOut = () => async (dispatch) => {
  try {
    const response = await getAuth().signOut();
    dispatch(signOutSuccess());
    // // local storage clear all. Be attentive here!
    // // localStorage.clear();

    // // Reset redux store with persist store.
    // dispatch(resetState());
    message.success("You are signed out");
    return response;
  } catch (error) {
    // Connect general errors
    switch (error.code) {
      default:
        message.error(error.message);
        break;
    }
    throw error;
  }
};
