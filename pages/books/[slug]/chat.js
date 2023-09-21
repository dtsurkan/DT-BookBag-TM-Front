import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useTwilioClient } from 'hooks';
import { Alert, Col, Form, message, PageHeader, Row, Spin } from 'antd';
import AppLayout from 'components/AppLayout/AppLayout';
import DesktopHeader from 'components/Navigation/components/DesktopHeader';
import AsideDescription from 'components/Chat/AsideDescription';
import SendMessageForm from 'components/Chat/SendMessageForm';
import MessagesList from 'components/Chat/MessagesList';
import { getBookBySlug } from 'lib/strapi/services/books';
import {
  addUserToConversation,
  getMessagesFromConversation,
  joinToConversation,
} from 'lib/twilio-conversation/services/conversation';
import {
  createTwilioConversation,
  fetchConversationByUniqueName,
  getUserByIdentity,
} from 'lib/twilio-conversation/services/client';
import { getLastElementInArray, scrollToBottom } from 'utils/functions';

const ChatComponent = ({ book = {} }) => {
  const {
    profile: { email, id, username },
  } = useSelector((state) => state.user);
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1200 });
  const scrollToBottomRef = useRef(null);
  const router = useRouter();
  // Connect with Twilio
  const [form] = Form.useForm();
  const { client, isLoadingTwilio } = useTwilioClient();
  const [isLoadingMessage, setIsLoadingMessage] = useState(false);
  const [isLoadingInitialMesssages, setIsLoadingInitialMesssages] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagesOptions, setMessagesOptions] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [participant, setParticipant] = useState(null);
  // NOTE! This property for special situation, when at first render scroll to top and then after setTimeout unlock threshold property
  const [threshold, setThreshold] = useState(0);
  const [onlineStatus, setOnlineStatus] = useState(false);
  // -------
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
      // scrollToBottomFunction(true);
    } else {
      setIsLoadingMessage(false);
    }
    // form.resetFields();
  };

  useEffect(() => {
    // Helper functions inside useEffect
    const joinConversation = async (conversation) => {
      console.log(`conversation`, conversation);
      if (conversation.channelState.status !== 'joined') {
        await joinToConversation(conversation);
        await addUserToConversation(conversation, book.seller.email);
      }
      const messages = await getMessagesFromConversation(conversation);
      const { items, ...messagesOptions } = messages;
      console.log(`items`, items);
      console.log(`messagesOptions`, messagesOptions);
      console.log(`messagesqqqqq`, messages);
      setMessages(items || []);
      setMessagesOptions(messagesOptions);
      scrollToBottom(scrollToBottomRef, true);
      setIsLoadingInitialMesssages(false);
      // NOTE! This property for special situation, when at first render scroll to top and then after setTimeout unlock threshold property
      setTimeout(() => {
        setThreshold(200);
      }, 2000);

      conversation.on('messageAdded', async (message) => {
        console.log(`messageAddedmessageAddedmessage`, message);
        setMessages((messages) => [...messages, message]);
        scrollToBottom(scrollToBottomRef, true);
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

    const initTwilioClient = async () => {
      setIsLoadingInitialMesssages(true);
      const slug = getLastElementInArray(router.query.slug);
      console.log(`router.query.slug`, parseInt(slug));
      console.log(`id`, id);
      console.log(`seller.id`, book.seller.id);
      const roomId = id + book.seller.id + parseInt(slug);
      console.log(`roomId`, roomId);
      const stringifyRoomId = roomId.toString();
      console.log(`stringifyRoomId`, stringifyRoomId);
      try {
        const conversation = await fetchConversationByUniqueName(client, stringifyRoomId);
        console.log(`conversation existF`, conversation);
        try {
          await joinConversation(conversation);
        } catch (error) {
          console.log(`error`, error);
        }
        setConversation(conversation);
      } catch (error) {
        console.log(`error`, error);
        try {
          const conversation = await createTwilioConversation(client, {
            uniqueName: stringifyRoomId,
            friendlyName: book.book_name,
            attributes: {
              seller: {
                email: book.seller.email,
                userName: book.seller.username,
                id: book.seller.id,
              },
              buyer: { email, userName: username, id },
              bookSlug: router.query.slug,
              book: { book_name: book.book_name, author: book.author },
            },
          });
          await joinConversation(conversation);
          setConversation(conversation);
        } catch (error) {
          console.log(`error 1`, error);
          throw new Error('unable to create conversation, please reload this page');
        }
      }
      client.on('conversationJoined', async (conversation) => {
        setIsLoadingInitialMesssages(true);
        const messages = await getMessagesFromConversation(conversation);
        const { items, ...messagesOptions } = messages;
        console.log(`messagestttttttt`, messages);
        setMessages(items || []);
        setMessagesOptions(messagesOptions);
        scrollToBottom(scrollToBottomRef, true);
        setIsLoadingInitialMesssages(false);
      });
    };
    if (client) {
      initTwilioClient();
    }
  }, [client, email, id, username, router.query.slug, book]);

  useEffect(() => {
    const getUserOnlineStatus = async () => {
      const user = await getUserByIdentity(client, book.seller.email);
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
    };
    if (client) {
      getUserOnlineStatus();
    }
  }, [client, book.seller.email]);

  useEffect(() => {
    scrollToBottom(scrollToBottomRef, true);
  }, []);

  const getMoreMessages = async () => {
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
          <AsideDescription
            onlineStatus={onlineStatus}
            book={book}
            buyer={{ email, userName: username, id }}
          />
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
                  onBack={() => router.push(`/books/${router.query.slug}`)}
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
              <Col
                flex={5}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: messages.length ? 'space-between' : 'center',
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
                  isTyping={isTyping}
                  conversation={conversation}
                  participant={participant}
                  isLoadingMessage={isLoadingMessage}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </AppLayout>
    </Spin>
  );
};

export async function getServerSideProps({ params }) {
  console.log(`params`, params);
  const book = await getBookBySlug(params.slug);
  if (!book.data.length) {
    return {
      notFound: true,
    };
  }
  // Pass post data to the page via props
  return {
    props: {
      book: book.data[0],
    },
  };
}

export default ChatComponent;
