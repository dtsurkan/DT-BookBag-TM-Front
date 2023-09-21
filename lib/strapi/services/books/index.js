import { deleteRequest, get, post, put } from 'lib/request';
import { parseQueryParams, stringifyQueryParams } from 'lib/qs';
import { STRAPI_URL } from 'lib/constants';

export const getBooks = () => get(STRAPI_URL, `/books?_sort=created_at:DESC`);

export const getBookBySlug = (slug) => get(STRAPI_URL, `/books?slug=${slug}`);

export const getBookBySellerID = (id) =>
  get(STRAPI_URL, `/books?seller.id=${id}&_sort=created_at:DESC`);

export const getBooksWithFilters = ({ price, created_at, ...otherQueryParams }) => {
  console.log(`price`, price);
  console.log(`created_at`, created_at);
  let sortQuery = parseQueryParams(
    stringifyQueryParams(
      { _sort: [created_at, price] },
      {
        encode: false,
        addQueryPrefix: false,
      }
    )
  );
  if (sortQuery._sort) {
    sortQuery = sortQuery._sort.join(',');
  }
  console.log(`sortQuery`, sortQuery);
  const query = {
    _sort: sortQuery,
    _where: {
      book_status: 'added',
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

export const uploadBook = (data) => post(STRAPI_URL, '/books', { authenticate: true, data });

export const updateBook = (bookId, data) =>
  put(STRAPI_URL, `/books/${bookId}`, { authenticate: true, data });

export const deleteBook = (bookId) =>
  deleteRequest(STRAPI_URL, `/books/${bookId}`, { authenticate: true });

// Helpers
export const getSellerEmail = async (slug) => {
  return await getBookBySlug(slug).then(({ data }) => data[0].seller);
};
