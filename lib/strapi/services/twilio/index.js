import { deleteRequest, get, post } from 'lib/request';
import { STRAPI_URL } from 'lib/constants';

export const getTokenFromStrapi = (id, token) =>
  get(STRAPI_URL, `/token/${id}`, { authenticate: true, token }).then(({ data }) => data.token);

export const postTokenFromStrapi = (data, token) =>
  post(STRAPI_URL, `/token`, { authenticate: true, data, token });

export const sendEmailWithTwilioData = (data, token) =>
  post(STRAPI_URL, `/send-email`, { authenticate: true, data, token });

export const deleteTwilioClient = (sid, token) =>
  deleteRequest(STRAPI_URL, `/client/${sid}`, { authenticate: true, token });
