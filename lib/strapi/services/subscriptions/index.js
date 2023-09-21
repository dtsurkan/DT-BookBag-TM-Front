import { get, post, put } from 'lib/request';
import { STRAPI_URL } from 'lib/constants';

export const getSubscriptionByToken = (token) =>
  get(STRAPI_URL, `/subscriptions?subscribeToken=${token}`);

export const createSubscriptionOnNewBooks = (data) => post(STRAPI_URL, '/subscriptions', { data });

export const updateSubscriptionOnNewBooks = (id, data, token) =>
  put(STRAPI_URL, `/subscriptions/${id}`, { data, authenticate: true, token });

export const toggleSubscribeByTokenOnNewBooks = (token, hasNewBooks) =>
  put(STRAPI_URL, `/subscriptions/unsubscribe/${token}`, { data: { hasNewBooks } });
