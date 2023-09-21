export const getMessagesFromConversation = async (conversation, messageCount = 30) =>
  await conversation?.getMessages(messageCount).then(async (messages) => {
    if (messages.items.length) {
      const lastIndex = messages.items[messages.items.length - 1].index;
      console.log(`lastIndex`, lastIndex);
      await conversation.updateLastReadMessageIndex(lastIndex);
    }
    return messages;
  });

export const joinToConversation = async (conversation) => await conversation?.join();

export const addUserToConversation = async (conversation, identity) =>
  await conversation?.add(identity.toString());

export const deleteConversation = async (conversation) => await conversation?.delete();
