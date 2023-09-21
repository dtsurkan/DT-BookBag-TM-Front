import { deleteRequest, get, put } from 'lib/request';
import { STRAPI_URL } from 'lib/constants';

export const getUserByID = (userID) => get(STRAPI_URL, `/users/${userID}`, { authenticate: true });

export const getUserByEmail = (userEmail) =>
  get(STRAPI_URL, `/users?email=${userEmail}`, { authenticate: true });

export const updateUserByID = (userID, data) =>
  put(STRAPI_URL, `/users/${userID}`, { authenticate: true, data });

export const deleteUserByID = (userID) =>
  deleteRequest(STRAPI_URL, `/users/${userID}`, { authenticate: true });
