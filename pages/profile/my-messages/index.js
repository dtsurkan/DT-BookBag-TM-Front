/* eslint-disable react/display-name */
import { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import useTwilioClient from 'hooks/useTwilioClient';
import format from 'date-fns/format';
import { Badge, message, Spin, Table } from 'antd';
import Title from 'antd/lib/typography/Title';
import ProfileLayout from 'components/Layout/ProfileLayout';
import CustomEmpty from 'components/Empty/CustomEmpty';
import { fetchSubscribedConversations } from 'lib/twilio-conversation/services/client';

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const MyMessages = () => {
  const router = useRouter();
  const { t } = useTranslation();
  // Connect with Twilio
  const { client, isLoadingTwilio } = useTwilioClient();
  const [conversations, setConversations] = useState([]);
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const [conversationOptions, setConversationOptions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pager, setPager] = useState(1);
  // -------

  useEffect(() => {
    const getConversations = async () => {
      setIsLoadingConversations(true);
      const conversations = await fetchSubscribedConversations(client);
      const { items, ...conversationOptions } = conversations;
      console.log(`conversations`, conversations);
      setConversations(items);
      setConversationOptions(conversationOptions);
      setIsLoadingConversations(false);
    };
    if (client) {
      getConversations();
    }
  }, [client]);

  useEffect(() => {
    if (pager === 1 && conversations.length) {
      setPager(2);
    }
  }, [pager, conversations]);

  const columns = [
    {
      title: t('components:table.sender'),
      dataIndex: ['channelState', 'attributes', 'seller', 'userName'],
    },
    {
      title: t('components:table.name'),
      dataIndex: ['channelState', 'friendlyName'],
      render: (text) => text.toUpperCase(),
    },
    {
      title: t('components:table.messages'),
      align: 'center',
      dataIndex: ['channelState'],
      render: (record) => {
        // NOTE! Message index begins at position 0
        const lastMessageIndex = record.lastMessage ? record.lastMessage.index + 1 : 0;
        const lastReadMessageIndex = record.lastReadMessageIndex
          ? record.lastReadMessageIndex + 1
          : 0;
        const count = lastMessageIndex - lastReadMessageIndex;
        return (
          <Badge count={count}>
            <div
              style={{
                background: 'azure',
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 15,
                minWidth: '60px',
              }}
            >
              {lastMessageIndex}
            </div>
          </Badge>
        );
      },
    },
    {
      title: t('components:table.date'),
      dataIndex: ['channelState'],
      render: (record) => (
        <div
          style={{
            background: 'azure',
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 15,
            minWidth: '60px',
          }}
        >
          {record.lastMessage
            ? format(record?.lastMessage?.dateCreated, 'yyyy-MM-dd HH:mm:ss')
            : format(record.dateCreated, 'yyyy-MM-dd HH:mm:ss')}
        </div>
      ),
    },
  ];

  const dataSource = conversations?.map((conversation) => ({
    channelState: conversation.channelState,
    sid: conversation.sid,
  }));

  return (
    <ProfileLayout>
      <Spin spinning={isLoadingTwilio || isLoadingConversations}>
        <Table
          scroll={{ x: 1000 }}
          loading={isLoadingConversations}
          title={() => <Title>{t('components:lists.profile.my-messages-title')}</Title>}
          style={{ height: '100%' }}
          locale={{
            emptyText: <CustomEmpty />,
          }}
          pagination={{
            hideOnSinglePage: dataSource.length ? false : true,
            pageSize: 10,
            total: pager,
          }}
          dataSource={dataSource}
          columns={columns}
          rowKey={(record) => record.channelState.uniqueName}
          onChange={async (pagination, filters, sorter, extra) => {
            switch (extra.action) {
              case 'paginate':
                setIsLoadingConversations(true);
                if (conversationOptions.hasNextPage && pagination.current > currentPage) {
                  const nextConversations = await conversationOptions.nextPage();
                  const { items, ...nextConversationsOptions } = nextConversations;
                  console.log(`nextConversations`, nextConversations);
                  setConversations(items);
                  setConversationOptions({ ...nextConversationsOptions });
                  if (nextConversationsOptions.hasNextPage) {
                    setPager((pager) => pager + 1);
                  }
                  setIsLoadingConversations(false);
                } else {
                  message.info('All messages have been retrieved');
                }
                if (conversationOptions.hasPrevPage && pagination.current <= currentPage) {
                  const prevConversations = await conversationOptions.prevPage();
                  const { items, ...prevConversationsOptions } = prevConversations;
                  console.log(`prevConversations`, prevConversations);
                  setConversations(items);
                  setConversationOptions({ ...prevConversationsOptions });
                  setPager((pager) => pager - 1);
                  setIsLoadingConversations(false);
                } else {
                  message.info('All messages have been retrievedretrieved');
                }
                setCurrentPage(pagination.current);
                break;

              default:
                break;
            }
          }}
          onRow={(data) => ({
            style: {
              cursor: 'pointer',
            },
            onClick: () => {
              message.info(data.sid);
              router.push(`${router.asPath}/${data.sid}`);
            },
          })}
        />
      </Spin>
    </ProfileLayout>
  );
};

export default MyMessages;
