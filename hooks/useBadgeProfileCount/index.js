import { useEffect, useState } from 'react';
import useTwilioClient from 'hooks/useTwilioClient';
import { fetchSubscribedConversations } from 'lib/twilio-conversation/services/client';
import { getMessageCount } from 'utils/twilio';

const useBadgeProfileCount = () => {
  const { client } = useTwilioClient();
  const [messagesCount, setMessagesCount] = useState(0);
  //   const [isLoadingConversations, setIsLoadingConversations] = useState(false);

  useEffect(() => {
    const getConversations = async () => {
      //   setIsLoadingConversations(true);
      const conversations = await fetchSubscribedConversations(client);
      const { items } = conversations;
      console.log(`items`, items);
      const result = items
        .map((item) => {
          const count = getMessageCount(item.channelState);

          return count;
        })
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
      console.log(`result`, result);
      setMessagesCount(result);
      //   setIsLoadingConversations(false);
    };
    if (client) {
      getConversations();
    }
  }, [client]);
  return { messagesCount };
};

export default useBadgeProfileCount;
