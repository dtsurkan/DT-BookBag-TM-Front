import { message } from 'antd';
import { updateBook } from 'lib/strapi/services/books';

// Disable loader when liked the book
export const toggleBookToLikedBooks = async (isChecked, session, book, t) => {
  const { jwt, profile } = session;
  if (isChecked) {
    const users = book.liked_by_users.map((user) => user.id);
    const newLikedUsers = [...users, profile.id];
    const response = await updateBook(
      book.id,
      {
        liked_by_users: newLikedUsers,
      },
      jwt
    );
    if (response.status === 200) {
      message.success(t('components:auth.success-add-to-liked-books-title'));
    }
  } else {
    const filteredLikedUsers = book.liked_by_users
      .map((user) => user.id)
      .filter((userId) => userId !== profile.id);
    const response = await updateBook(
      book.id,
      {
        liked_by_users: filteredLikedUsers,
      },
      jwt
    );
    if (response.status === 200) {
      message.success(t('components:auth.success-remove-from-liked-books-title'));
    }
  }
};

// Disable loader when liked the book
export const addBookToLikedBooks = async (session, book, t) => {
  const { jwt, profile } = session;
  const users = book.liked_by_users.map((user) => user.id);
  if (users.includes(profile.id)) {
    message.success(t('components:auth.exist-book-in-liked-title'));
  } else {
    const newLikedUsers = [...users, profile.id];
    const response = await updateBook(
      book.id,
      {
        liked_by_users: newLikedUsers,
      },
      jwt
    );
    if (response.status === 200) {
      message.success(t('components:auth.success-add-to-liked-books-title'));
    }
  }
};

// Disable loader when liked the book
export const deleteBookFromLikedBooks = async (session, book, t) => {
  const { jwt, profile } = session;

  const filteredUsers = book.liked_by_users
    .map((user) => user.id)
    .filter((userId) => userId !== profile.id);

  const response = await updateBook(
    book.id,
    {
      liked_by_users: filteredUsers,
    },
    jwt
  );
  if (response.status === 200) {
    message.success(t('components:auth.success-remove-from-liked-books-title'));
  }
};
