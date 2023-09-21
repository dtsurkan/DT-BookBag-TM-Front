import { deleteRequest, get, put } from 'lib/request';
import { STRAPI_URL } from 'lib/constants';

export const getUserByID = (userID, token) =>
  get(STRAPI_URL, `/users/${userID}`, { authenticate: true, token });

export const getUserByEmail = (userEmail, token) =>
  get(STRAPI_URL, `/users?email=${userEmail}`, { authenticate: true, token });

export const updateUserByID = (userID, data, token) =>
  put(STRAPI_URL, `/users/${userID}`, { authenticate: true, token, data });

export const deleteUserByID = (userID, token) =>
  deleteRequest(STRAPI_URL, `/users/${userID}`, { authenticate: true, token });
