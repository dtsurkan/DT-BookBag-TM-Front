import { get } from "lib/strapi/request";

export const getBooks = () => get(`/books`);

export const getBookBySlug = (slug) => get(`/books?slug=${slug}`);

export const getBooksWithFilters = (
  price = "",
  language = "",
  category = ""
) => {
  console.log("price", price);
  console.log("language", language);
  console.log("category", category);
  console.log(
    `/books` +
      `${price && `?_sort=price:` + price}` +
      `${
        language && `${price ? `&` : `?`}_where[_or][1][language]=` + language
      }` +
      `${
        category &&
        `${price || language ? `&` : `?`}categories.name=` + category
      }`
  );
  return get(
    `/books` +
      `${price && `?_sort=price:` + price}` +
      `${
        language && `${price ? `&` : `?`}_where[_or][1][language]=` + language
      }` +
      `${
        category &&
        `${price || language ? `&` : `?`}categories.name=` + category
      }`
  );
};
