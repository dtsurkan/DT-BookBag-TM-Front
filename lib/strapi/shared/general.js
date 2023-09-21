import { STRAPI_URL } from 'lib/constants';

export const getStrapiURL = (path = '') => {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || STRAPI_URL}${path}`;
};
