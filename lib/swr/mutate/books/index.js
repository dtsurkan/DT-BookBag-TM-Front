import { STRAPI_URL } from 'lib/constants';

export const getUserAddedBooksSWR = (userID, baseUrl = STRAPI_URL) =>
  baseUrl + `/books?buyingID.sellerID=${userID}&buyingID.buying_status=added&_sort=created_at:DESC`;

export const getUserBoughtBooksSWR = (userID, baseUrl = STRAPI_URL) =>
  baseUrl + `/books?buyingID.buyerID=${userID}&buyingID.buying_status=sold`;

export const getUserProcessingBooksSWR = (userID, baseUrl = STRAPI_URL) =>
  baseUrl +
  `/books?_where[_or][0][buyingID.buyerID]=${userID}&_where[_or][1][buyingID.sellerID]=${userID}&_where[buyingID.buying_status]=processing`;

export const getUserSoldBooksSWR = (userID, baseUrl = STRAPI_URL) =>
  baseUrl + `/books?buyingID.sellerID=${userID}&buyingID.buying_status=sold`;

export const getUserLikedBooksSWR = (userID, baseUrl = STRAPI_URL) =>
  baseUrl + `/liked-books?userID=${userID}`;

export const getUserLikedBookSWR = (userID, bookID, baseUrl = STRAPI_URL) =>
  baseUrl + `/liked-books?userID=${userID}&bookID.id=${bookID}`;

export const getSellerBooks = (id, baseUrl = STRAPI_URL) =>
  baseUrl + `/books?buyingID.sellerID=${id}&_sort=created_at:DESC&buyingID.buying_status=added`;
