import { get } from "lib/strapi/request";

export const getCategories = () => get(`/categories`);
