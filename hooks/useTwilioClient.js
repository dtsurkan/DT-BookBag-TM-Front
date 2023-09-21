import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTokenFromStrapi } from 'lib/strapi/services/twilio';
const Chat = require('twilio-chat');

export const useTwilioClient = () => {
  const {
    profile: { email },
  } = useSelector((state) => state.user);
  const [isLoadingTwilio, setIsLoadingTwilio] = useState(false);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const initTwilioClient = async () => {
      setIsLoadingTwilio(true);
      let token = '';
      try {
        token = await getTokenFromStrapi(email);
        console.log(`token00`, token);
      } catch {
        throw new Error('unable to get token, please reload this page');
      }
      const client = await Chat.Client.create(token);
      setClient(client);

      client.on('tokenAboutToExpire', async () => {
        const token = await getTokenFromStrapi(email);
        console.log(`token11`, token);
        client.updateToken(token);
      });

      client.on('tokenExpired', async () => {
        const token = await getTokenFromStrapi(email);
        console.log(`token22`, token);
        client.updateToken(token);
      });

      setIsLoadingTwilio(false);
    };
    if (email) {
      initTwilioClient();
    }
  }, [email]);

  return [isLoadingTwilio, client];
};
