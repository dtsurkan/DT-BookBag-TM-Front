// Strapi settings
export const STRAPI_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://book-bag-strapi-8yyjo.ondigitalocean.app'
    : 'https://96d841393b2f.ngrok.io';
// export const STRAPI_URL = 'https://96d841393b2f.ngrok.io';
// export const STRAPI_URL = 'http://localhost:1337';
// export const STRAPI_URL = "https://book-bag-strapi-8yyjo.ondigitalocean.app";
// ---------------------
// Nova Poshta settings
export const NOVA_POSHTA_URL = 'https://api.novaposhta.ua/v2.0/json';
export const NOVA_POSHTA_API = '032a2852ee6347054accae4bf5018d90';
// ==================
// Google Books API
export const GOOGLE_BOOKS_URL = 'https://www.googleapis.com/books/v1';
// ----------------
// Facebook Customer Chat/Business(Facebook Business Suite)
export const FACEBOOK_CUSTOMER_PAGE_ID = '110243644615427';
export const FACEBOOK_APP_ID = '258972828987849';
// -----------------

// Errors Codes
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const METHOD_NOT_ALLOWED = 405;
export const TOO_MANY_REQUESTS = 429;
export const INTERNAL_SERVER_ERROR = 500;
