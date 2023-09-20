import {
  SET_CURRENT_USER_PROFILE_ERROR,
  SET_CURRENT_USER_PROFILE_PENDING,
  SET_CURRENT_USER_PROFILE_SUCCESS,
  SET_RESET_PASSWORD_ERROR,
  SET_RESET_PASSWORD_PENDING,
  SET_RESET_PASSWORD_SUCCESS,
  SIGN_OUT_SUCCESS,
} from "state/actions/user/auth";

const initialState = {
  profile: null,
  isLoadingAuth: false,
  isLoadingResetPassword: false,
};

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_USER_PROFILE_PENDING:
      return { ...state, isLoadingAuth: true };
    case SET_CURRENT_USER_PROFILE_SUCCESS:
      return { ...state, isLoadingAuth: false, profile: payload };
    case SET_CURRENT_USER_PROFILE_ERROR:
      return { ...state, isLoadingAuth: false };
    case SET_RESET_PASSWORD_PENDING:
      return { ...state, isLoadingResetPassword: true };
    case SET_RESET_PASSWORD_SUCCESS:
      return { ...state, isLoadingResetPassword: false };
    case SET_RESET_PASSWORD_ERROR:
      return { ...state, isLoadingResetPassword: false };
    case SIGN_OUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default user;
