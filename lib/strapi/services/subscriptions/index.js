import { post } from 'lib/request';
import { STRAPI_URL } from 'lib/constants';

export const subscribeOnNewBooks = (data) => post(STRAPI_URL, '/subscriptions', { data });
