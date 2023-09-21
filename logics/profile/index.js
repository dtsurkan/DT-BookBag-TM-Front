import { deleteTwilioClient } from 'lib/strapi/services/twilio';
import { uploadImagesToStrapi } from 'lib/strapi/services/upload';
import { deleteUserByID, updateUserByID } from 'lib/strapi/services/user';
import {
  fetchSubscribedConversations,
  getUserByIdentity,
} from 'lib/twilio-conversation/services/client';
import { deleteConversation } from 'lib/twilio-conversation/services/conversation';

export const updateCurrentUserProfile = async (session, values) => {
  const { avatar, ...otherValues } = values;
  console.log(`values`, values);
  console.log(`session updateCurrentUserProfile updateCurrentUserProfile`, session);
  const { jwt, profile } = session;
  try {
    if (avatar && avatar.length) {
      if (avatar[0].provider === 'local') {
        // when don't change avatar
        otherValues.avatar = avatar[0].id;
      } else {
        // when new avatar
        const [strapiAvatarObject] = await uploadImagesToStrapi(avatar, jwt).then(
          ({ data }) => data
        );
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
    const updatedUser = await updateUserByID(profile.id, otherValues, jwt);
    console.log(`updatedUser.data`, updatedUser.data);
    return updatedUser;
  } catch (error) {
    console.log(`error`, error);
  }
};

// TESTING
// NOTE! In future wiil change
export const deleteCurrentUserProfile = async (session, client) => {
  const { jwt, profile } = session;
  const conversations = await fetchSubscribedConversations(client);
  const user = await getUserByIdentity(client, profile.email);
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
  const deletedTwilioClient = await deleteTwilioClient(userSid, jwt);
  console.log(`deletedTwilioClient`, deletedTwilioClient);
  const deletedStrapiUser = await deleteUserByID(profile.id, jwt);
  console.log(`deletedStrapiUser`, deletedStrapiUser);
  if (deletedStrapiUser.status === 200 && deletedTwilioClient.status === 200) {
    return deletedStrapiUser;
  }
};
