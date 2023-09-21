import { message } from 'antd';
import {
  editBuyingBook,
  getBuyingByBuyerIdAndBookId,
  getBuyingBySellerIdAndBookId,
} from 'lib/strapi/services/buyings';
import * as ga from 'lib/google/analytics';

// Functions for buyer/seller

export const updateBookStatusToProcessing = async (t, session, book, buyerID) => {
  const { jwt, profile } = session;

  const { data: buying } = await getBuyingBySellerIdAndBookId(profile.id, book.id, jwt);
  console.log(`buying`, buying);
  const response = await editBuyingBook(
    buying[0]?.id,
    { buying_status: 'processing', buyerID },
    jwt
  );
  if (response.status === 200) {
    message.success(message.success(t('components:book.update-book-status-to-processing')));
  }
};

export const updateBookStatusToAdded = async (t, session, book, isSeller = false) => {
  const { jwt, profile } = session;

  const userID = isSeller ? book.buyingID.buyerID : profile.id;
  console.log(`userID`, userID);
  const { data: buying } = await getBuyingByBuyerIdAndBookId(userID, book.id, jwt);
  console.log(`buying`, buying);
  const response = await editBuyingBook(
    buying[0]?.id,
    { buying_status: 'added', buyerID: null },
    jwt
  );
  if (response.status === 200) {
    message.success(t('components:book.update-book-status-to-added'));
  }
};

export const updateBookStatusToSold = async (t, session, book) => {
  const { jwt, profile } = session;

  const { data: buying } = await getBuyingByBuyerIdAndBookId(profile.id, book.id, jwt);
  console.log(`buying`, buying);

  const response = await editBuyingBook(buying[0]?.id, { buying_status: 'sold' }, jwt);

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
