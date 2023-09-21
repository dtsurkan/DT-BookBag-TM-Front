import { message } from 'antd';
import { updateBook } from 'lib/strapi/services/books';
import * as ga from 'lib/google/analytics';

export const updateBookStatus = async (t, session, book, isChecked, buyer) => {
  const { jwt } = session;

  const response = await updateBook(
    book.id,
    {
      book_status: isChecked ? 'processing' : 'added',
      buyer: isChecked ? buyer : null,
    },
    jwt
  );
  if (response.status === 200) {
    message.success(
      isChecked
        ? message.success(t('components:book.update-book-status-to-processing'))
        : message.success(t('components:book.update-book-status-to-added'))
    );
  }
};

export const updateBookStatusToSold = async (t, session, book) => {
  const { jwt } = session;

  const response = await updateBook(
    book.id,
    {
      book_status: 'sold',
    },
    jwt
  );
  if (response.status === 200) {
    message.success(t('components:book.update-book-status-to-sold'));
    ga.event({
      action: 'purchase',
      params: {
        event_category: 'bought/sold books',
        event_label: 'bought/sold books',
      },
    });
  }
};
