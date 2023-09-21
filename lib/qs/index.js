import qs from 'qs';

export const stringifyQueryParams = (queryParams, additionalOptions = {}) =>
  qs.stringify({ ...queryParams }, { addQueryPrefix: true, skipNulls: true, ...additionalOptions });

export const parseQueryParams = (queryParams, additionalOptions = {}) =>
  qs.parse(queryParams, { ignoreQueryPrefix: true, ...additionalOptions });
