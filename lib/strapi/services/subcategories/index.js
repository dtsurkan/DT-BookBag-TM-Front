import { get } from 'lib/request';
import { STRAPI_URL } from 'lib/constants';

export const getSubcategoryBySlug = (slug) => get(STRAPI_URL, `/subcategories?slug=${slug}`);
