import { message } from 'antd';
import { clearAuthenticationCookies } from 'lib/cookies';
import { updateBook } from 'lib/strapi/services/books';
import { deleteTwilioClient } from 'lib/strapi/services/twilio';
import { uploadImagesToStrapi } from 'lib/strapi/services/upload';
import { deleteUserByID, getUserByID, updateUserByID } from 'lib/strapi/services/user';
import {
  fetchSubscribedConversations,
  getUserByIdentity,
} from 'lib/twilio-conversation/services/client';
import { deleteConversation } from 'lib/twilio-conversation/services/conversation';

export const GET_CURRENT_USER_PROFILE_PENDING = 'GET_CURRENT_USER_PROFILE_PENDING';
export const GET_CURRENT_USER_PROFILE_SUCCESS = 'GET_CURRENT_USER_PROFILE_SUCCESS';
export const GET_CURRENT_USER_PROFILE_ERROR = 'GET_CURRENT_USER_PROFILE_ERROR';

export const DELETE_CURRENT_USER_PROFILE_PENDING = 'DELETE_CURRENT_USER_PROFILE_PENDING';
export const DELETE_CURRENT_USER_PROFILE_SUCCESS = 'DELETE_CURRENT_USER_PROFILE_SUCCESS';
export const DELETE_CURRENT_USER_PROFILE_ERROR = 'DELETE_CURRENT_USER_PROFILE_ERROR';

export const getCurrentUserProfilePending = (payload) => ({
  type: GET_CURRENT_USER_PROFILE_PENDING,
  payload,
});
export const getCurrentUserProfileSuccess = (payload) => ({
  type: GET_CURRENT_USER_PROFILE_SUCCESS,
  payload,
});
export const getCurrentUserProfileError = (payload) => ({
  type: GET_CURRENT_USER_PROFILE_ERROR,
  payload,
});

export const deleteCurrentUserProfilePending = () => ({
  type: DELETE_CURRENT_USER_PROFILE_PENDING,
});
export const deleteCurrentUserProfileSuccess = () => ({
  type: DELETE_CURRENT_USER_PROFILE_SUCCESS,
});
export const deleteCurrentUserProfileError = () => ({
  type: DELETE_CURRENT_USER_PROFILE_ERROR,
});

export const getCurrentUserProfile = (id) => async (dispatch) => {
  dispatch(getCurrentUserProfilePending());
  const response = await getUserByID(id);
  console.log(`response`, response);
  if (response.status === 200) {
    dispatch(getCurrentUserProfileSuccess(response.data));
    return response;
  } else {
    dispatch(getCurrentUserProfileError());
    return response;
  }
};

export const updateCurrentUserProfile = (profileID, values) => async (dispatch) => {
  const { avatar, ...otherValues } = values;
  console.log(`values`, values);
  try {
    if (avatar && avatar.length) {
      if (avatar[0].provider === 'local') {
        // when don't change avatar
        otherValues.avatar = avatar[0].id;
      } else {
        // when new avatar
        const [strapiAvatarObject] = await uploadImagesToStrapi(avatar).then(({ data }) => data);
        console.log(`valuesWithoutFalsy0`, otherValues);
        otherValues.avatar = strapiAvatarObject.id;
      }
    } else {
      // when delete avatar
      otherValues.avatar = [];
    }
    if (!otherValues.fullname) {
      otherValues.fullname = null;
    }
    if (!otherValues.user_city) {
      otherValues.user_city = null;
    }
    console.log(`otherValues`, otherValues);
    const response = await updateUserByID(profileID, otherValues);
    console.log(`response.data`, response.data);
    if (response.status === 200) {
      dispatch(getCurrentUserProfile(profileID));
      message.success('Ви успішно змінили свій профіль');
    }
  } catch (error) {
    console.log(`error`, error);
  }
};

export const toggleBookToLikedBooks = (isChecked, profileID, book) => async (dispatch) => {
  dispatch(getCurrentUserProfilePending());
  try {
    if (isChecked) {
      const users = book.liked_by_users.map((user) => user.id);
      const newLikedUsers = [...users, profileID];
      const response = await updateBook(book.id, {
        liked_by_users: newLikedUsers,
      });
      if (response.status === 200) {
        const user = await getUserByID(profileID);
        console.log(`user.data`, user.data);
        dispatch(getCurrentUserProfileSuccess(user.data));
        message.success('Ви успішно додали книгу до переліку вподобаних');
      }
    } else {
      const filteredLikedUsers = book.liked_by_users
        .map((user) => user.id)
        .filter((userId) => userId !== profileID);
      const response = await updateBook(book.id, {
        liked_by_users: filteredLikedUsers,
      });
      if (response.status === 200) {
        const user = await getUserByID(profileID);
        console.log(`user.data`, user.data);
        dispatch(getCurrentUserProfileSuccess(user.data));
        message.success('Ви успішно видалили книгу із переліку вподобаних');
      }
    }
  } catch (error) {
    dispatch(getCurrentUserProfileError());
  }
};

export const addBookToLikedBooks = (profileID, book) => async (dispatch) => {
  dispatch(getCurrentUserProfilePending());
  try {
    const users = book.liked_by_users.map((user) => user.id);
    if (users.includes(profileID)) {
      dispatch(getCurrentUserProfileError());
      message.info('You have already liked and added this book to favorites');
      // return;
    } else {
      const newLikedUsers = [...users, profileID];
      const response = await updateBook(book.id, {
        liked_by_users: newLikedUsers,
      });
      if (response.status === 200) {
        const user = await getUserByID(profileID);
        console.log(`user.data`, user.data);
        dispatch(getCurrentUserProfileSuccess(user.data));
        message.success('Ви успішно додали книгу до переліку вподобаних');
      }
    }
  } catch (error) {
    dispatch(getCurrentUserProfileError());
  }
};

export const deleteBookFromLikedBooks = (profileID, book) => async (dispatch) => {
  dispatch(getCurrentUserProfilePending());
  try {
    const filteredUsers = book.liked_by_users
      .map((user) => user.id)
      .filter((userId) => userId !== profileID);

    const response = await updateBook(book.id, {
      liked_by_users: filteredUsers,
    });
    if (response.status === 200) {
      const user = await getUserByID(profileID);
      console.log(`user.data`, user.data);
      dispatch(getCurrentUserProfileSuccess(user.data));
      message.success('Ви успішно видалили книгу із переліку вподобаних');
    }
  } catch (error) {
    dispatch(getCurrentUserProfileError());
  }
};

export const updateBookStatusToSold = (profileID, book, isChecked, buyer) => async (dispatch) => {
  dispatch(getCurrentUserProfilePending());
  try {
    const response = await updateBook(book.id, {
      book_status: isChecked ? 'sold' : 'added',
      buyer: isChecked ? buyer : null,
    });
    if (response.status === 200) {
      const user = await getUserByID(profileID);
      console.log(`user.data`, user.data);
      dispatch(getCurrentUserProfileSuccess(user.data));
      message.success(
        isChecked ? 'Ви успішно продали книгу' : 'Ви успішно повернули книгу для продажі'
      );
    }
  } catch (error) {
    dispatch(getCurrentUserProfileError());
  }
};
// TESTING
// NOTE! In future wiil change
export const deleteCurrentUserProfile = (profileID, profileEmail, client) => async (dispatch) => {
  dispatch(deleteCurrentUserProfilePending());
  try {
    const conversations = await fetchSubscribedConversations(client);
    const user = await getUserByIdentity(client, profileEmail);
    console.log(`conversations`, conversations);
    console.log(`user`, user);
    const [userSid] = user.state.entityName.split('.');
    console.log(`userSid`, userSid);
    if (conversations.items.length) {
      conversations.items.forEach(async (conversation) => {
        const deletedConversation = await deleteConversation(conversation);
        console.log(`deletedConversation`, deletedConversation);
      });
    }
    const deletedTwilioClient = await deleteTwilioClient(userSid);
    console.log(`deletedTwilioClient`, deletedTwilioClient);
    const deletedStrapiUser = await deleteUserByID(profileID);
    console.log(`deletedStrapiUser`, deletedStrapiUser);
    if (deletedStrapiUser.status === 200 && deletedTwilioClient.status === 200) {
      dispatch(deleteCurrentUserProfileSuccess());
      clearAuthenticationCookies();
      return deletedStrapiUser;
    }
  } catch (error) {
    dispatch(deleteCurrentUserProfileError());
    return error;
  }
};
