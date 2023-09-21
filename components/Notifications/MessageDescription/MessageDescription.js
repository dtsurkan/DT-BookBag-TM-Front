const MessageDescription = ({ messageIndex, message }) => {
  return messageIndex ? (
    <div>
      <p
        style={{ fontWeight: 700 }}
      >{`По книзі: ${message.conversation.friendlyName.toUpperCase()}`}</p>
      <p
        style={{ fontWeight: 700 }}
      >{`Автор: ${message.conversation.channelState.attributes.book.author.toUpperCase()}`}</p>
      <p>{`Повідомлення: ${message.state.body}`}</p>
    </div>
  ) : (
    <div>
      {`Користувач ${
        message.conversation.channelState.createdBy
      } створив чат для обговорення деталей по книзі ${message.conversation.friendlyName.toUpperCase()}, автора(ів) ${message.conversation.channelState.attributes.book.author.toUpperCase()} та відправив декілька повідомлень. Перейдіть будь ласка в мої повідомлення в своєму профілі або натисніть на це повідомлення.`}
    </div>
  );
};

export default MessageDescription;
