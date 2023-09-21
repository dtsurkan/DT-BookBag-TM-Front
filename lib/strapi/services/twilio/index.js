import { get, post } from 'lib/request';
import { STRAPI_URL } from 'lib/constants';

export const getTokenFromStrapi = (id) =>
  get(STRAPI_URL, `/token/${id}`, { authenticate: true }).then(({ data }) => data.token);

export const postTokenFromStrapi = (data) =>
  post(STRAPI_URL, `/token`, { authenticate: true, data });
