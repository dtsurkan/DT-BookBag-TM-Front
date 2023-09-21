import { deleteRequest, get, post, put } from 'lib/request';
import { parseQueryParams, stringifyQueryParams } from 'lib/qs';
import { STRAPI_URL } from 'lib/constants';
import { PAGE_BOOK_LIMIT } from 'utils/constants';

export const getBooks = () =>
  get(STRAPI_URL, `/books?_sort=created_at:DESC&buyingID.buying_status=added`);

export const getBookBySlug = (slug) => get(STRAPI_URL, `/books?slug=${slug}`);

export const getBookBySellerID = (id) =>
  get(
    STRAPI_URL,
    `/books?buyingID.sellerID=${id}&_sort=created_at:DESC&buyingID.buying_status=added`
  );

export const getBooksWithFilters = ({
  price,
  created_at,
  limit = PAGE_BOOK_LIMIT,
  start = 1,
  ...otherQueryParams
}) => {
  console.log(`price`, price);
  console.log(`created_at`, created_at);
  // NOTE! Start pagination beginning at page 1, but in Strapi getting at position 0
  const startCondition = +start === 1 ? 0 : (+start - 1) * limit;
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
    _limit: limit,
    _start: startCondition,
    _where: {
      'buyingID.buying_status': 'added',
      ...otherQueryParams,
    },
  };
  return get(STRAPI_URL, `/books${stringifyQueryParams(query)}`);
};
// Without limit&start, because we need to get all records.
export const getBooksCount = ({ price, created_at, limit = 3, start = 1, ...otherQueryParams }) => {
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
  const query = {
    _sort: sortQuery,
    _where: {
      'buyingID.buying_status': 'added',
      ...otherQueryParams,
    },
  };
  return get(STRAPI_URL, `/books/count${stringifyQueryParams(query)}`);
};

export const getBooksByAuthorOrBookName = (value) => {
  // NOTE! toLowerCase, because book_name&author saving in lowerCase in order to better implementing search(because of languages)
  const query = {
    _where: {
      _or: [{ author_contains: value.toLowerCase() }, { book_name_contains: value.toLowerCase() }],
    },
  };
  return get(STRAPI_URL, `/books${stringifyQueryParams(query)}`);
};

export const uploadBook = (data, token) =>
  post(STRAPI_URL, '/books', { authenticate: true, token, data });

export const updateBook = (bookId, data, token) =>
  put(STRAPI_URL, `/books/${bookId}`, { authenticate: true, token, data });

export const deleteBook = (bookId, token) =>
  deleteRequest(STRAPI_URL, `/books/${bookId}`, { authenticate: true, token });
