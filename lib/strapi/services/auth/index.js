import { get, post } from 'lib/request';
import { STRAPI_URL } from 'lib/constants';
import { stringifyQueryParams } from 'lib/qs';

export const registerUserToStrapi = (data) => post(STRAPI_URL, '/auth/local/register', { data });

export const sendEmailConfirmation = (email) =>
  post(STRAPI_URL, '/auth/send-email-confirmation', { data: { email } });

export const loginUserToStrapi = (email, password) =>
  post(STRAPI_URL, '/auth/local', { data: { identifier: email, password } });

export const getCallbackToGoogleAuthProvider = (query) =>
  get(STRAPI_URL, `/auth/google/callback${stringifyQueryParams(query)}`);

export const getCallbackToFacebookAuthProvider = (query) =>
  get(STRAPI_URL, `/auth/facebook/callback${stringifyQueryParams(query)}`);

export const forgotPasswordAuthStrapi = (email) =>
  post(STRAPI_URL, '/auth/forgot-password', { data: { email } });

export const resetPasswordAuthStrapi = (data) => post(STRAPI_URL, '/auth/reset-password', { data });
