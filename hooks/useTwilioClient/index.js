import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import { notification } from 'antd';
import { postTokenFromStrapi, sendEmailWithTwilioData } from 'lib/strapi/services/twilio';
import { doShutDown, getUserByIdentity } from 'lib/twilio-conversation/services/client';
import { updateUserFriendlyName } from 'lib/twilio-conversation/services/user';
import MessageDescription from 'components/Notifications/MessageDescription';
const Conversations = require('@twilio/conversations');

const useTwilioClient = (hasNotifications = false) => {
  const router = useRouter();
  const [session] = useSession();
  const [twilio, setTwilio] = useState({ isLoadingTwilio: false, client: null });
  useEffect(() => {
    const initTwilioClient = async () => {
      setTwilio((values) => ({ ...values, isLoadingTwilio: true }));
      let token = '';
      try {
        const { data } = await postTokenFromStrapi(
          { identity: session?.profile.email },
          session.jwt
        );
        token = data.token;
        console.log(`token00`, token);
      } catch {
        throw new Error('unable to get token, please reload this page');
      }
      const client = await Conversations.Client.create(token);
      const user = await getUserByIdentity(client, session?.profile.email);
      await updateUserFriendlyName(user, session?.profile.username);
      setTwilio({ client: client, isLoadingTwilio: false });

      client.on('tokenAboutToExpire', async () => {
        const { data } = await postTokenFromStrapi(
          { identity: session?.profile.email },
          session.jwt
        );
        console.log(`token11`, data.token);
        client.updateToken(data.token);
      });

      client.on('tokenExpired', async () => {
        const { data } = await postTokenFromStrapi(
          { identity: session?.profile.email },
          session.jwt
        );
        console.log(`token22`, data.token);
        client.updateToken(data.token);
      });

      client.on('connectionStateChanged', (state) => {
        console.log(`state`, state);
        switch (state) {
          case 'connecting':
            console.log(`connecting to Twilio Account`);
            break;
          case 'connected':
            console.log(`connected to Twilio Account`);
            break;
          case 'disconnecting':
            console.log(`disconnecting to Twilio Account`);
            break;
          case 'disconnected':
            console.log(`disconnected to Twilio Account`);
            break;
          case 'denied':
            console.log(`denied to Twilio Account`);
            break;
          default:
            break;
        }
      });
      if (hasNotifications) {
        client.on('messageAdded', async (message) => {
          console.log(`message`, message);
          const key = `open${Date.now()}`;
          // NOTE!
          // TheSameAuthor = who send email (you or not) = boolean
          // isSeller = whether seller or not (you, current user)
          // recepientEmail = whom you want to send email
          // senderEmail = who send email
          const messageIndex = message.state.index;
          const theSameAuthor = session?.profile.email === message.state.author;
          const isSeller =
            session?.profile.email === message.conversation.channelState.attributes.seller.email;
          const recepientEmail = isSeller
            ? message.conversation.channelState.attributes.buyer.email
            : message.conversation.channelState.attributes.seller.email;
          const senderEmail = message.state.author;
          console.log(`recepientEmail`, recepientEmail);
          console.log(`senderEmail`, senderEmail);
          if (!theSameAuthor) {
            notification.open({
              message: `Відправник: ${message.state.author}`,
              description: <MessageDescription messageIndex={messageIndex} message={message} />,
              duration: messageIndex ? 3.5 : 7,
              style: {
                cursor: 'pointer',
              },
              onClick: () => {
                router.push(`/profile/my-messages/${message.conversation.sid}`);
                notification.close(key);
              },
            });
          }
          await sendEmailWithTwilioData(
            {
              conversation: message.conversation.channelState,
              recepientEmail,
              senderEmail,
            },
            session.jwt
          );
        });
      }
    };
    if (session && !twilio.client) {
      console.log('init twilio client ------------------------');
      initTwilioClient();
    }
  }, [session, twilio.client, router, hasNotifications]);

  useEffect(() => {
    // const shutdown = async () => {
    //   try {
    //     await doShutDown(twilio.client);
    //     console.log(`clientclientclientclientclientclientclient`, twilio.client);
    //   } catch (error) {
    //     console.log(`error`, error);
    //   }
    // };
    if (!session) {
      // shutdown();
    }
    return async () => {
      if (twilio.client) {
        console.log('unmount -------------------');
        await doShutDown(twilio.client);
      }
    };
  }, [twilio.client, session]);

  return { client: twilio.client, isLoadingTwilio: twilio.isLoadingTwilio };
};

export default useTwilioClient;
