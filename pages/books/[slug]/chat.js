import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useTwilioClient } from 'hooks';
import { Alert, Col, Form, PageHeader, Row, Spin } from 'antd';
import AppLayout from 'components/AppLayout/AppLayout';
import DesktopHeader from 'components/Navigation/components/DesktopHeader';
import AsideDescription from 'components/Chat/AsideDescription';
import SendMessageForm from 'components/Chat/SendMessageForm';
import MessagesList from 'components/Chat/MessagesList';
import { getBookBySlug } from 'lib/strapi/services/books';
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
  const [isLoadingTwilio, client] = useTwilioClient();
  const [isLoadingMessage, setIsLoadingMessage] = useState(false);
  const [channel, setChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [member, setMember] = useState(null);
  // -------
  const onSendMessage = ({ message = '' }) => {
    setIsLoadingMessage(true);
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

    const initTwilioClient = async () => {
      const slug = getLastElementInArray(router.query.slug);
      console.log(`router.query.slug`, parseInt(slug));
      console.log(`id`, id);
      console.log(`seller.id`, book.seller.id);
      const roomId = id + book.seller.id + parseInt(slug);
      console.log(`roomId`, roomId);
      const stringifyRoomId = roomId.toString();
      console.log(`stringifyRoomId`, stringifyRoomId);
      try {
        const channel = await client.getChannelByUniqueName(stringifyRoomId);
        console.log(`channel existF`, channel);
        await joinChannel(channel);
        setChannel(channel);
      } catch (error) {
        console.log(`error`, error);
        try {
          const channel = await client.createChannel({
            uniqueName: stringifyRoomId,
            friendlyName: book.book_name,
            attributes: {
              seller: { email: book.seller.email, userName: book.seller.username },
              buyer: { email: email, userName: username },
              bookSlug: router.query.slug,
            },
          });
          await joinChannel(channel);
          setChannel(channel);
        } catch (error) {
          console.log(`error 1`, error);
          throw new Error('unable to create channel, please reload this page');
        }
      }
      client.on('channelJoined', async (channel) => {
        const messages = await channel.getMessages();
        console.log(`messagestttttttt`, messages);
        setMessages(messages.items || []);
      });
      client.on('typingStarted', (member) => updateTypingIndicator(member.state.identity, true));
      client.on('typingEnded', (member) => updateTypingIndicator(member.state.identity, false));
    };
    if (client) {
      initTwilioClient();
    }
  }, [client, email, id, username, router.query.slug, book]);

  useEffect(() => {
    scrollToBottom(scrollToBottomRef, true);
  }, [messages]);

  return (
    <Spin spinning={isLoadingTwilio}>
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
              <Col flex={5}>
                <MessagesList scrollToBottomRef={scrollToBottomRef} messages={messages} />
              </Col>
              <Col>
                <SendMessageForm
                  form={form}
                  onFinish={onSendMessage}
                  isTyping={isTyping}
                  channel={channel}
                  member={member}
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
