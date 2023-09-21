// Strapi settings
export const STRAPI_URL =
  process.env.NODE_ENV === "production"
    ? "https://bookbag-strapi.ew.r.appspot.com"
    : "http://localhost:1337";
// ---------------------
// Nova Poshta settings
export const NOVA_POSHTA_URL = "https://api.novaposhta.ua/v2.0/json";
export const NOVA_POSHTA_API = "032a2852ee6347054accae4bf5018d90";
