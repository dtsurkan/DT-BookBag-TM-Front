export const getMessageCount = (record) => {
  // First creation between two users: lastReadMessageIndex = null, lastMessage = absolute absence
  if (!record?.lastMessage) {
    console.log(`case 1 ${record.friendlyName}`);
    return 0;
  }
  // When first message is sent and unread: lastReadMessageIndex = null, lastMessage = {index: 0}
  if (record?.lastMessage && record.lastReadMessageIndex === null) {
    console.log(`case 2 ${record.friendlyName}`);
    return record.lastMessage.index + 1;
  }
  // When first message is sent and read: lastReadMessageIndex = 0, lastMessage = {index: 0}
  if (record?.lastMessage && record?.lastReadMessageIndex === 0) {
    console.log(`case 3 ${record.friendlyName}`);
    return record.lastMessage.index - record?.lastReadMessageIndex;
  }
  // When next messages are sent: lastReadMessageIndex = n, lastMessage = {index: n}
  if (record?.lastMessage && record?.lastReadMessageIndex) {
    console.log(`case 4 ${record.friendlyName}`);
    return record.lastMessage.index - record?.lastReadMessageIndex;
  }
};
