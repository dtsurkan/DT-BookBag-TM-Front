import { get } from 'lib/request';
import { GOOGLE_BOOKS_URL } from 'lib/constants';

export const getBooksFromGoogleBooks = (
  name = '',
  fields = 'items(id, volumeInfo(title, authors))',
  maxResults = 10
) => get(GOOGLE_BOOKS_URL, `/volumes?q=${name}&fields=${fields}&maxResults=${maxResults}`);
