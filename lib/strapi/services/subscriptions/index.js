import { get, post, put } from 'lib/request';
import { STRAPI_URL } from 'lib/constants';

export const getSubscriptionByEmail = (email) => get(STRAPI_URL, `/subscriptions?email=${email}`);

export const createSubscriptionOnNewBooks = (data) => post(STRAPI_URL, '/subscriptions', { data });

export const updateSubscriptionOnNewBooks = (id, data, token) =>
  put(STRAPI_URL, `/subscriptions/${id}`, { data, authenticate: true, token });
