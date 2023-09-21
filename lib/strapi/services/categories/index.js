import { get } from 'lib/request';
import { STRAPI_URL } from 'lib/constants';

export const getCategories = () => get(STRAPI_URL, `/categories`);

export const getCategoryBySlug = (slug) => get(STRAPI_URL, `/categories?slug=${slug}`);
