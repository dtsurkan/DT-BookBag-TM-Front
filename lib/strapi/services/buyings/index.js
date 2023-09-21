import { put, get } from 'lib/request';
import { STRAPI_URL } from 'lib/constants';

export const getBuyingByBuyerIdAndBookId = (buyerId, bookId, token) =>
  get(STRAPI_URL, `/buyings?buyerID=${buyerId}&bookID=${bookId}`, { authenticate: true, token });

export const getBuyingBySellerIdAndBookId = (sellerId, bookId, token) =>
  get(STRAPI_URL, `/buyings?sellerID=${sellerId}&bookID=${bookId}`, { authenticate: true, token });

export const editBuyingBook = (id, data, token) =>
  put(STRAPI_URL, `/buyings/${id}`, { authenticate: true, data, token });
