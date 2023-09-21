import { message } from 'antd';
import {
  addBookToLikedBooks,
  deleteBookFromLikedBooks,
  getBookFromLikedBooks,
} from 'lib/strapi/services/liked-books';

// Disable loader when liked the book
export const handleAddBookToLikedBooks = async (session, book, t) => {
  const { jwt, profile } = session;
  const { data: likedBook } = await getBookFromLikedBooks(book.id, profile.id, jwt);
  console.log(`likedBook`, likedBook);
  if (likedBook.length) {
    message.success(t('components:auth.exist-book-in-liked-title'));
  } else {
    const addedBook = await addBookToLikedBooks({ bookID: book.id, userID: profile.id }, jwt);
    console.log(`addedBook`, addedBook);
    if (addedBook.status === 200) {
      message.success(t('components:auth.success-add-to-liked-books-title'));
    }
  }
};

export const handleDeleteBookFromLikedBooks = async (session, book, t) => {
  const { jwt, profile } = session;
  const { data: likedBook } = await getBookFromLikedBooks(book.id, profile.id, jwt);
  console.log(`likedBook`, likedBook);

  const deletedLikedBook = await deleteBookFromLikedBooks(likedBook[0].id, jwt);
  console.log(`deletedLikedBook`, deletedLikedBook);
  if (deletedLikedBook.status === 200) {
    message.success(t('components:auth.success-remove-from-liked-books-title'));
  }
};
