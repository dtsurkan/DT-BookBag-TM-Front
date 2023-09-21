import { getStrapiURL } from './general';

export const getStrapiMedia = (url) => {
  const imageUrl = url?.startsWith('/') ? getStrapiURL(url) : url;
  return imageUrl;
};
