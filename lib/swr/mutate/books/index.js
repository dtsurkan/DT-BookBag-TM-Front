import { STRAPI_URL } from 'lib/constants';

export const getUserAddedBooksSWR = (userID) =>
  `${STRAPI_URL}/books?seller.id=${userID}&book_status=added`;

export const getUserBoughtOrProcessingBooksSWR = (userID) =>
  `${STRAPI_URL}/books?buyer.id=${userID}&book_status_ne=added`;

export const getUserLikedBooksSWR = (userID) => `${STRAPI_URL}/users/${userID}/liked-books`;
