import { deleteRequest, get, post, put } from "lib/request";
import { STRAPI_URL } from "lib/constants";
import { stringifyQueryParams } from "lib/qs";

export const getBooks = () => get(STRAPI_URL, `/books?_sort=created_at:DESC`);

export const getBookBySlug = (slug) => get(STRAPI_URL, `/books?slug=${slug}`);

export const getBookBySellerID = (id) =>
  get(STRAPI_URL, `/books?seller_id=${id}&_sort=created_at:DESC`);

export const getBooksWithFilters = ({ price, ...otherQueryParams }) => {
  const query = {
    _sort: price && price,
    _where: {
      ...otherQueryParams,
    },
  };
  return get(STRAPI_URL, `/books${stringifyQueryParams(query)}`);
};

export const getBooksByAuthorOrBookName = (value) => {
  const query = {
    _where: {
      _or: [{ author_contains: value }, { book_name_contains: value }],
    },
  };
  return get(STRAPI_URL, `/books${stringifyQueryParams(query)}`);
};

export const uploadBook = (data) =>
  post(STRAPI_URL, "/books", { authenticate: true, data });

export const updateBook = (bookId, data) =>
  put(STRAPI_URL, `/books/${bookId}`, { authenticate: true, data });

export const deleteBook = (bookId) =>
  deleteRequest(STRAPI_URL, `/books/${bookId}`, { authenticate: true });
