import { SET_CURRENT_USER_PROFILE_SUCCESS, SIGN_OUT_SUCCESS } from 'state/actions/user/auth';
import {
  DELETE_CURRENT_USER_PROFILE_ERROR,
  DELETE_CURRENT_USER_PROFILE_PENDING,
  DELETE_CURRENT_USER_PROFILE_SUCCESS,
  GET_CURRENT_USER_PROFILE_ERROR,
  GET_CURRENT_USER_PROFILE_PENDING,
  GET_CURRENT_USER_PROFILE_SUCCESS,
} from 'state/actions/user/profile';

const initialState = {
  isAuthenticated: false,
  profile: {},
  isLoadingUserProfile: false,
  isDeletingUserProfile: false,
};

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    // User auth profile
    case SET_CURRENT_USER_PROFILE_SUCCESS:
      return { ...state, isAuthenticated: true, profile: payload };
    case GET_CURRENT_USER_PROFILE_PENDING:
      return { ...state, isLoadingUserProfile: true };
    case GET_CURRENT_USER_PROFILE_SUCCESS:
      return { ...state, isLoadingUserProfile: false, profile: payload };
    case GET_CURRENT_USER_PROFILE_ERROR:
      return { ...state, isLoadingUserProfile: false };
    case DELETE_CURRENT_USER_PROFILE_PENDING:
      return { ...state, isDeletingUserProfile: true };
    case DELETE_CURRENT_USER_PROFILE_ERROR:
      return { ...state, isDeletingUserProfile: false };
    case DELETE_CURRENT_USER_PROFILE_SUCCESS:
      return initialState;
    case SIGN_OUT_SUCCESS:
      return initialState;
    // =---------
    default:
      return state;
  }
};

export default user;
