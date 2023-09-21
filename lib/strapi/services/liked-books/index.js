import { STRAPI_URL } from 'lib/constants';
import { deleteRequest, get, post } from 'lib/request';

export const addBookToLikedBooks = (data, token) =>
  post(STRAPI_URL, '/liked-books', { authenticate: true, token, data });

export const getBookFromLikedBooks = (bookID, userID, token) =>
  get(STRAPI_URL, `/liked-books?bookID.id=${bookID}&userID=${userID}`, {
    authenticate: true,
    token,
  });

export const deleteBookFromLikedBooks = (bookID, token) =>
  deleteRequest(STRAPI_URL, `/liked-books/${bookID}`, { authenticate: true, token });
