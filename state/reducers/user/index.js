import {
  SET_CURRENT_USER_PROFILE_SUCCESS,
  SIGN_OUT_SUCCESS,
} from "state/actions/user/auth";

const initialState = {
  isAuthenticated: false,
  profile: null,
};

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    // User auth profile
    case SET_CURRENT_USER_PROFILE_SUCCESS:
      return { ...state, isAuthenticated: true, profile: payload };
    case SIGN_OUT_SUCCESS:
      return initialState;
    // =---------
    default:
      return state;
  }
};

export default user;
