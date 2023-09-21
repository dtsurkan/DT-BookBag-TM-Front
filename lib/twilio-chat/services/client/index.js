export const getSubscribedChannels = async (client) =>
  await client?.getSubscribedChannels().then((res) => res);

export const getChannelBySid = async (client, channelSid) =>
  await client?.getChannelBySid(channelSid).then((res) => res);
