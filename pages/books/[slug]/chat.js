import { useEffect, useRef, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { createUseStyles } from 'react-jss';
import { useMediaQuery } from 'react-responsive';
import useTwilioClient from 'hooks/useTwilioClient';
import useShowSimpleModal from 'hooks/useShowSimpleModal';
import { Alert, Col, Form, message, PageHeader, Row, Spin, Space, Modal } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import AppLayout from 'components/Layout/AppLayout';
import DesktopHeader from 'components/Navigation/Desktop/DesktopHeader';
import AsideBookDescription from 'components/Chat/AsideBookDescription';
import SendMessageForm from 'components/Chat/Forms/SendMessage';
import MessagesList from 'components/Chat/Lists/MessagesList';
import MobileHeader from 'components/Navigation/Mobile/MobileHeader';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import { getBookBySlug } from 'lib/strapi/services/books';
import { getUserByID } from 'lib/strapi/services/user';
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

const useStyles = createUseStyles((theme) => ({
  chat: {
    minHeight: '100vh',
    background: '#F9FEFD',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
  },
  chatWrapper: { marginTop: '25px', flexDirection: 'column', flex: '5 5 auto' },
  [theme.breakpoints.down(theme.breakpoints.xl)]: {
    chat: {
      padding: 0,
    },
    chatWrapper: {
      marginTop: '100px',
    },
  },
  [theme.breakpoints.down(theme.breakpoints.sm)]: {
    chatWrapper: {
      marginTop: '170px',
    },
  },
}));

const ChatComponent = ({ book = {}, session, seller = {} }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1200 });
  const scrollToBottomRef = useRef(null);
  const router = useRouter();
  // Connect with Twilio
  const [form] = Form.useForm();
  const { client, isLoadingTwilio } = useTwilioClient();
  const { isModalVisible, showModal, cancelModal } = useShowSimpleModal();
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
        await addUserToConversation(conversation, seller.email);
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
        const getAllMessagesRead = await conversation.setAllMessagesRead();
        console.log(`getAllMessagesReadqqqqqqqqqqqqq`, getAllMessagesRead);
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
      console.log(`session?.profile?.id,`, session?.profile?.id);
      console.log(`seller.id`, seller.id);
      const roomId = session?.profile?.id + seller.id + parseInt(slug);
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
                email: seller.email,
                userName: seller.username,
                id: seller.id,
              },
              buyer: {
                email: session?.profile?.email,
                userName: session?.profile?.username,
                id: session?.profile?.id,
              },
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
  }, [client, session, router.query.slug, book, seller]);

  useEffect(() => {
    const getUserOnlineStatus = async () => {
      const user = await getUserByIdentity(client, seller.email);
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
  }, [client, seller.email]);

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
          {isTabletOrMobile ? null : (
            <AsideBookDescription
              onlineStatus={onlineStatus}
              book={book}
              seller={seller}
              buyer={{
                email: session?.profile?.email,
                userName: session?.profile?.username,
                id: session?.profile?.id,
              }}
            />
          )}
          <Col xs={24} xl={19} className={classes.chat}>
            {isTabletOrMobile ? (
              <MobileHeader />
            ) : (
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
            <Row gutter={[0, 16]} className={classes.chatWrapper}>
              <Col>
                <Space
                  direction="horizontal"
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <PageHeader
                    onBack={() => router.push(`/books/${router.query.slug}`)}
                    title={t('components:buttons.return')}
                    style={{ padding: '0' }}
                  />
                  {isTabletOrMobile && (
                    <PrimaryButton
                      isOutlinedStyles={false}
                      type="text"
                      icon={<InfoCircleOutlined />}
                      onClick={showModal}
                      btnText="components:others.about-good-item"
                    />
                  )}
                </Space>
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
      <Modal
        title={t('components:others.about-good-item')}
        centered
        visible={isModalVisible}
        footer={null}
        onCancel={cancelModal}
        zIndex={1100}
      >
        <AsideBookDescription
          hasHeaderLogo={false}
          onlineStatus={onlineStatus}
          book={book}
          seller={seller}
          buyer={{
            email: session?.profile?.email,
            userName: session?.profile?.username,
            id: session?.profile?.id,
          }}
        />
      </Modal>
    </Spin>
  );
};
// Think about removing server-side in this position in order to avoid indexing with chat
export async function getServerSideProps({ params, req }) {
  console.log(`params`, params);
  const book = await getBookBySlug(params.slug);
  const session = await getSession({ req });
  const seller = await getUserByID(book.data[0].buyingID.sellerID, session.jwt);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  if (!book?.data?.length) {
    return {
      notFound: true,
    };
  }
  // Pass post data to the page via props
  return {
    props: {
      book: book.data[0],
      session,
      seller: seller.data,
    },
  };
}

export default ChatComponent;
