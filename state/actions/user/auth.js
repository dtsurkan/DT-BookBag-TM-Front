import { setAuthenticationCookies, clearAuthenticationCookies } from 'lib/cookies';
import {
  forgotPasswordAuthStrapi,
  getCallbackToFacebookAuthProvider,
  getCallbackToGoogleAuthProvider,
  loginUserToStrapi,
  registerUserToStrapi,
  resetPasswordAuthStrapi,
  // sendEmailConfirmation,
} from 'lib/strapi/services/auth';
// import { getUserByID } from 'lib/strapi/services/user';
import { getExpiryDate } from 'utils/functions';

// AUTHENTIFICATION
export const SET_CURRENT_USER_PROFILE_SUCCESS = 'SET_CURRENT_USER_PROFILE_SUCCESS';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
// ----------------------------------------------------
// AUTHENTIFICATION

export const setCurrentUserProfileSuccess = (payload) => ({
  type: SET_CURRENT_USER_PROFILE_SUCCESS,
  payload,
});

export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS,
});

export const doGoogleSignIn = (query) => async (dispatch) => {
  const response = await getCallbackToGoogleAuthProvider(query);
  console.log(`response`, response);
  if (response.status === 200) {
    const expiryDays = getExpiryDate(response.data.jwt);
    console.log(`expiryDays`, expiryDays);
    setAuthenticationCookies({ token: response.data.jwt, expires: expiryDays });
    dispatch(setCurrentUserProfileSuccess(response.data.user));
  }
  return response;
};

export const doFacebookSignIn = (query) => async (dispatch) => {
  const response = await getCallbackToFacebookAuthProvider(query);
  console.log(`response`, response);
  if (response.status === 200) {
    const expiryDays = getExpiryDate(response.data.jwt);
    console.log(`expiryDays`, expiryDays);
    setAuthenticationCookies({ token: response.data.jwt, expires: expiryDays });
    dispatch(setCurrentUserProfileSuccess(response.data.user));
  }
  return response;
};

export const doCustomSignIn = (email, password) => async (dispatch) => {
  const response = await loginUserToStrapi(email, password);
  console.log(`response`, response);
  if (response.status === 200) {
    const expiryDays = getExpiryDate(response.data.jwt);
    console.log(`expiryDays`, expiryDays);
    setAuthenticationCookies({ token: response.data.jwt, expires: expiryDays });
    dispatch(setCurrentUserProfileSuccess(response.data.user));
    // message.success(`You are signed in system, dear ${response.data.user.username}`);
  }
  return response;
};

export const doCustomSignUp = (values) => async (dispatch) => {
  const registerUserResponse = await registerUserToStrapi(values);
  // if (registerUserResponse.status === 200) {
  //   const emailConfirmResponse = await sendEmailConfirmation(
  //     registerUserResponse.data.user.email
  //   );
  //   // dispatch(setCurrentUserProfileSuccess(null));
  //   return emailConfirmResponse;
  // }
  return registerUserResponse;
};

export const doForgotPassword = (email) => async (dispatch) =>
  await forgotPasswordAuthStrapi(email);

export const doResetPassword = (values) => async (dispatch) =>
  await resetPasswordAuthStrapi(values);

export const doSignOut = () => async (dispatch) => {
  dispatch(signOutSuccess());
  clearAuthenticationCookies();
  // // local storage clear all. Be attentive here!
  // // localStorage.clear();

  // // Reset redux store with persist store.
  // dispatch(resetState());
  // message.success('You are signed out');
};
