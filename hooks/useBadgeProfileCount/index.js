import { useEffect, useState } from 'react';
import useTwilioClient from 'hooks/useTwilioClient';
import { fetchSubscribedConversations } from 'lib/twilio-conversation/services/client';

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
          // NOTE! Message index begins at position 0
          const lastMessageIndex = item.channelState.lastMessage.index
            ? item.channelState.lastMessage.index + 1
            : 1;
          const lastReadMessageIndex =
            item.channelState.lastReadMessageIndex === null
              ? 0
              : item.channelState.lastReadMessageIndex
              ? item.channelState.lastReadMessageIndex + 1
              : 1;
          const count = lastMessageIndex - lastReadMessageIndex;
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
