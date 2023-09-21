import Cookies from "js-cookie";

const TOKEN_COOKIE_NAME = "jwt";

export const setAuthenticationCookies = ({ token, expires }) => {
  Cookies.set(TOKEN_COOKIE_NAME, token, { expires });
};

export const getAuthenticationCookies = () => ({
  token: Cookies.get(TOKEN_COOKIE_NAME),
});

export const clearAuthenticationCookies = () => {
  Cookies.remove(TOKEN_COOKIE_NAME);
};

export default {
  setAuthenticationCookies,
  getAuthenticationCookies,
  clearAuthenticationCookies,
};
