import { get, post } from 'lib/request';
import { STRAPI_URL } from 'lib/constants';

export const registerUserToStrapi = (data) => post(STRAPI_URL, '/auth/local/register', { data });

export const sendEmailConfirmation = (email) =>
  post(STRAPI_URL, '/auth/send-email-confirmation', { data: { email } });

export const loginUserToStrapi = ({ email, password }) =>
  post(STRAPI_URL, '/auth/local', { data: { identifier: email, password } });

export const forgotPasswordAuthStrapi = (email) =>
  post(STRAPI_URL, '/auth/forgot-password', { data: { email } });

export const resetPasswordAuthStrapi = (data) => post(STRAPI_URL, '/auth/reset-password', { data });

export const getAuthCallbackProviderStrapi = (provider, accessToken) =>
  get(STRAPI_URL, `/auth/${provider}/callback?access_token=${accessToken}`);
