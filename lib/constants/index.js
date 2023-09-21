// Strapi settings
export const STRAPI_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://book-bag-strapi-8yyjo.ondigitalocean.app'
    : 'https://9f220db92e78.ngrok.io';
// export const STRAPI_URL = "https://9f220db92e78.ngrok.io";
// export const STRAPI_URL = "https://book-bag-strapi-8yyjo.ondigitalocean.app";
// ---------------------
// Nova Poshta settings
export const NOVA_POSHTA_URL = 'https://api.novaposhta.ua/v2.0/json';
export const NOVA_POSHTA_API = '032a2852ee6347054accae4bf5018d90';
// ==================
// Google Books API
export const GOOGLE_BOOKS_URL = 'https://www.googleapis.com/books/v1';
// ----------------

// Errors Codes
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const METHOD_NOT_ALLOWED = 405;
export const TOO_MANY_REQUESTS = 429;
