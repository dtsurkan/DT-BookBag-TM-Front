import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useMediaQuery } from 'react-responsive';
import { useTwilioClient } from 'hooks';
import { Alert, Col, Form, message, PageHeader, Row, Spin } from 'antd';
import AppLayout from 'components/AppLayout/AppLayout';
import DesktopHeader from 'components/Navigation/components/DesktopHeader';
import AsideDescription from 'components/Chat/AsideDescription';
import SendMessageForm from 'components/Chat/SendMessageForm';
import MessagesList from 'components/Chat/MessagesList';
import { getBookBySlug } from 'lib/strapi/services/books';
import { fetchConversationBySid, getUserByIdentity } from 'lib/twilio-conversation/services/client';
import {
  getMessagesFromConversation,
  joinToConversation,
} from 'lib/twilio-conversation/services/conversation';
import { scrollToBottom } from 'utils/functions';

const Chat = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { client, isLoadingTwilio } = useTwilioClient();
  const [conversation, setConversation] = useState(null);
  const [book, setBook] = useState({});
  const [messages, setMessages] = useState([]);
  const [messagesOptions, setMessagesOptions] = useState({});
  const scrollToBottomRef = useRef(null);
  const [form] = Form.useForm();
  const [isLoadingMessage, setIsLoadingMessage] = useState(false);
  const [isLoadingInitialMesssages, setisLoadingInitialMesssages] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [participant, setParticipant] = useState(null);
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1200 });
  // NOTE! This property for special situation, when at first render scroll to top and then after setTimeout unlock threshold property
  const [threshold, setThreshold] = useState(0);
  const [onlineStatus, setOnlineStatus] = useState(false);
  const [buyer, setBuyer] = useState(null);

  useEffect(() => {
    // Helper functions inside useEffect
    const joinConversation = async (conversation) => {
      if (conversation.channelState.status !== 'joined') {
        await joinToConversation(conversation);
      }
      const messages = await getMessagesFromConversation(conversation);
      const { items, ...messagesOptions } = messages;
      console.log(`items`, items);
      console.log(`messagesOptions`, messagesOptions);
      console.log(`messagesqqqqq`, messages);
      setMessages(items || []);
      setMessagesOptions(messagesOptions);
      scrollToBottom(scrollToBottomRef, true);
      conversation.on('messageAdded', async (message) => {
        console.log(`messageAddedmessageAddedmessage`, message);
        setMessages((messages) => [...messages, message]);
        scrollToBottom(scrollToBottomRef, true);
        const getAllMessagesRead = await conversation.setAllMessagesRead();
        console.log(`getAllMessagesRead`, getAllMessagesRead);
      });
      // Only typing in separate chat item
      conversation.on('typingStarted', (participant) =>
        updateTypingIndicator(participant.state.identity, true)
      );
      conversation.on('typingEnded', (participant) =>
        updateTypingIndicator(participant.state.identity, false)
      );
    };
    const updateTypingIndicator = async (participant, isTyping) => {
      const user = await getUserByIdentity(client, participant);
      setIsTyping(isTyping);
      setParticipant(user.state.friendlyName);
    };
    //--------------------------
    const getConversation = async () => {
      setisLoadingInitialMesssages(true);
      const conversation = await fetchConversationBySid(client, router.query.sid);

      console.log(`conversation`, conversation);
      const book = await getBookBySlug(conversation.channelState.attributes.bookSlug);
      setBook(book.data[0]);
      setBuyer(conversation.channelState.attributes.buyer);
      console.log(`book`, book);
      await joinConversation(conversation);
      setConversation(conversation);
      setisLoadingInitialMesssages(false);
      // NOTE! This property for special situation, when at first render scroll to top and then after setTimeout unlock threshold property
      setTimeout(() => {
        setThreshold(200);
      }, 2000);

      const user = await getUserByIdentity(client, book.data[0].seller.email);
      console.log(`user`, user);
      const {
        state: { online },
      } = user;
      setOnlineStatus(online);
      user.on('updated', ({ user }) => {
        const {
          state: { online },
        } = user;
        setOnlineStatus(online);
      });

      client.on('conversationJoined', async (channel) => {
        const messages = await getMessagesFromConversation(channel);
        const { items, ...messagesOptions } = messages;
        console.log(`messagestttttttt`, messages);
        setMessages(items || []);
        setMessagesOptions(messagesOptions);
        scrollToBottom(scrollToBottomRef, true);
      });
    };
    if (client) {
      getConversation();
    }
  }, [client, router.query.sid]);

  useEffect(() => {
    scrollToBottom(scrollToBottomRef, true);
  }, []);

  const onSendMessage = ({ message = '' }) => {
    setIsLoadingMessage(true);
    const trimMessage = String(message).trim();
    console.log(`trimMessage`, trimMessage);
    console.log(`conversation`, conversation);
    if (message && trimMessage) {
      conversation.sendMessage(trimMessage);
      console.log(`test`);
      form.resetFields();
      setIsLoadingMessage(false);
      // scrollToBottom(scrollToBottomRef, true);
    } else {
      setIsLoadingMessage(false);
    }
    // form.resetFields();
  };

  const getMoreMessages = async () => {
    console.log(`test`);
    if (messagesOptions.hasPrevPage) {
      const prevMessages = await messagesOptions.prevPage();
      const { items, ...prevMessagesOptions } = prevMessages;
      console.log(`prevMessages`, prevMessages);
      setMessages((messages) => [...items, ...messages]);
      setMessagesOptions(prevMessagesOptions);
    } else {
      message.info('All messages have been retrieved');
    }
  };

  return (
    <Spin spinning={isLoadingTwilio || isLoadingInitialMesssages}>
      <AppLayout isHasNavigation={false} isHasFooter={false}>
        <Row justify="center">
          <AsideDescription onlineStatus={onlineStatus} book={book} buyer={buyer} />
          <Col
            xs={24}
            md={19}
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
                // hasProfile={false}
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
                  title={t('components:buttons.return')}
                  style={{ padding: '0' }}
                />
              </Col>
              <Col>
                <Alert
                  message={t('components:alerts.chat.message')}
                  description={t('components:alerts.chat.description')}
                  type="warning"
                  closeText={t('components:alerts.chat.close-text')}
                />
              </Col>
              <Col
                flex={5}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <MessagesList
                  hasMore={messagesOptions.hasPrevPage}
                  loadMore={getMoreMessages}
                  scrollToBottomRef={scrollToBottomRef}
                  messages={messages}
                  threshold={threshold}
                />
              </Col>
              <Col>
                <SendMessageForm
                  form={form}
                  onFinish={onSendMessage}
                  isLoadingMessage={isLoadingMessage}
                  isTyping={isTyping}
                  conversation={conversation}
                  participant={participant}
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
