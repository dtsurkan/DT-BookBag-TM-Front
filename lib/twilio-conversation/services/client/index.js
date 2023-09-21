export const fetchSubscribedConversations = async (client, limit = 10) =>
  await client?.getSubscribedConversations({ limit });

export const fetchConversationBySid = async (client, conversationSid) =>
  await client?.getConversationBySid(conversationSid);

export const fetchConversationByUniqueName = async (client, uniqueName) =>
  await client?.getConversationByUniqueName(uniqueName);

export const getUserByIdentity = async (client, identity) =>
  await client?.getUser(identity?.toString());

export const createTwilioConversation = async (client, options) =>
  await client?.createConversation(options);

export const doShutDown = async (client) => await client?.shutdown();
