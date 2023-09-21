import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useTwilioClient } from 'hooks';
import { Alert, Col, Form, PageHeader, Row, Spin } from 'antd';
import AppLayout from 'components/AppLayout/AppLayout';
import DesktopHeader from 'components/Navigation/components/DesktopHeader';
import AsideDescription from 'components/Chat/AsideDescription';
import SendMessageForm from 'components/Chat/SendMessageForm';
import MessagesList from 'components/Chat/MessagesList';
import { getBookBySlug } from 'lib/strapi/services/books';
import { getChannelBySid } from 'lib/twilio-chat/services/client';
import { scrollToBottom } from 'utils/functions';

const Chat = () => {
  const router = useRouter();
  const [isLoadingTwilio, client] = useTwilioClient();
  const [channel, setChannel] = useState([]);
  const [book, setBook] = useState({});
  const [messages, setMessages] = useState([]);
  const scrollToBottomRef = useRef(null);
  const [form] = Form.useForm();
  const [isLoadingMessage, setIsLoadingMessage] = useState(false);
  const [isLoadingInitialMesssages, setisLoadingInitialMesssages] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [member, setMember] = useState(null);
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1200 });

  useEffect(() => {
    // Helper functions inside useEffect
    const joinChannel = async (channel) => {
      if (channel.channelState.status !== 'joined') {
        await channel.join();
      }
      const messages = await channel.getMessages();
      console.log(`messagesqqqqq`, messages);
      setMessages(messages.items || []);
      channel.on('messageAdded', async (message) => {
        console.log(`messageAddedmessageAddedmessage`, message);
        setMessages((messages) => [...messages, message]);
      });
    };
    const updateTypingIndicator = (member, isTyping) => {
      setIsTyping(isTyping);
      setMember(member);
    };
    //--------------------------
    const getChannel = async () => {
      setisLoadingInitialMesssages(true);
      const channel = await getChannelBySid(client, router.query.sid);

      console.log(`channel`, channel);
      const book = await getBookBySlug(channel.channelState.attributes.bookSlug);
      setBook(book.data[0]);
      console.log(`book`, book);
      await joinChannel(channel);
      setChannel(channel);
      setisLoadingInitialMesssages(false);

      client.on('channelJoined', async (channel) => {
        const messages = await channel.getMessages();
        console.log(`messagestttttttt`, messages);
        setMessages(messages.items || []);
      });
      client.on('typingStarted', (member) => updateTypingIndicator(member.state.identity, true));
      client.on('typingEnded', (member) => updateTypingIndicator(member.state.identity, false));
    };
    if (client) {
      getChannel();
    }
  }, [client, router.query.sid]);

  useEffect(() => {
    scrollToBottom(scrollToBottomRef, true);
  }, [messages]);

  const onSendMessage = (values) => {
    setIsLoadingMessage(true);
    const { message } = values;
    const trimMessage = String(message).trim();
    console.log(`trimMessage`, trimMessage);
    console.log(`channel`, channel);
    if (message && trimMessage) {
      channel.sendMessage(trimMessage);
      console.log(`test`);
      form.resetFields();
      setIsLoadingMessage(false);
      // scrollToBottomFunction(true);
    } else {
      setIsLoadingMessage(false);
    }
    // form.resetFields();
  };
  console.log(`messages state`, messages);
  return (
    <Spin spinning={isLoadingTwilio || isLoadingInitialMesssages}>
      <AppLayout isHasNavigation={false} isHasFooter={false}>
        <Row justify="center">
          <AsideDescription book={book} />
          <Col
            xs={24}
            md={18}
            style={{
              minHeight: '100vh',
              background: '#F9FEFD',
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {isTabletOrMobile ? null : (
              <DesktopHeader
                hasLogo={false}
                hasProfile={false}
                headerStyles={{
                  padding: '0px 0px',
                  background: 'none',
                  position: 'relative',
                  width: '100%',
                  minHeight: 'initial',
                  display: 'flex',
                }}
              />
            )}
            <Row
              gutter={[0, 16]}
              style={{ marginTop: '25px', flexDirection: 'column', flex: '5 5 auto' }}
            >
              <Col>
                <PageHeader
                  // onBack={() => router.push(`/books/${router.query.slug}`)}
                  onBack={() => router.push(`/profile/my-messages`)}
                  title="Вернуться"
                  style={{ padding: '0' }}
                />
              </Col>
              <Col>
                <Alert
                  message="Ваш чат с автором"
                  description="Здесь вы можете договорится с автором о вашей сделке, например
            об условиях доставки и оплаты."
                  type="warning"
                  closeText="Скрыть"
                />
              </Col>
              <Col flex={5}>
                <MessagesList scrollToBottomRef={scrollToBottomRef} messages={messages} />
              </Col>
              <Col>
                <SendMessageForm
                  form={form}
                  onFinish={onSendMessage}
                  isLoadingMessage={isLoadingMessage}
                  isTyping={isTyping}
                  channel={channel}
                  member={member}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </AppLayout>
    </Spin>
  );
};

export default Chat;
