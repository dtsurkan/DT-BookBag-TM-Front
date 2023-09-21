import slug from 'slug';

// export const getSlugifyValue = (value) => `${slug(value)}-${Date.now()}`;
export const getSlugifyValue = (value) => slug(value);
