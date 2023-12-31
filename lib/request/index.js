import axios from 'axios';
import { showStrapiErrors } from 'lib/strapi/shared/errors';

const getAuthHeader = (token) => {
  if (token) return `Bearer ${token}`;
};

const tryAxios = async (...args) => {
  try {
    return await axios(...args);
  } catch (error) {
    console.log('error', error.response);
    return showStrapiErrors(error);
  }
};

export const request = (
  baseUrl,
  path,
  {
    contentType = 'application/json',
    withoutHeaderAuth = false,
    authenticate = false,
    token = null,
    headers,
    ...other
  } = {}
) => {
  console.log(`process.env.NODE_ENV`, process.env.NODE_ENV);
  console.log('`${baseUrl}${path}`', `${baseUrl}${path}`);
  console.log('...other', other);
  console.log(`objeauthenticatect`, authenticate);
  const specialHeaders = withoutHeaderAuth
    ? {}
    : { authorization: authenticate ? getAuthHeader(token) : '' };

  console.log(`specialHeaders`, specialHeaders);
  return tryAxios(`${baseUrl}${path}`, {
    headers: {
      'content-type': contentType,
      // authorization: authenticate ? getAuthHeader() : "",
      ...specialHeaders,
      ...headers,
    },
    ...other,
  });
};

export const get = (baseUrl, path, opts) => request(baseUrl, path, { method: 'get', ...opts });

export const post = (baseUrl, path, opts) => request(baseUrl, path, { method: 'post', ...opts });

export const put = (baseUrl, path, opts) => request(baseUrl, path, { method: 'put', ...opts });

export const deleteRequest = (baseUrl, path, opts) =>
  request(baseUrl, path, { method: 'delete', ...opts });
