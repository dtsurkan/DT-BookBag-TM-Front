/* eslint-disable react/display-name */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTwilioClient } from 'hooks';
import format from 'date-fns/format';
import { Empty, message, Spin, Table } from 'antd';
import Title from 'antd/lib/typography/Title';
import ProfileLayout from 'components/AppLayout/ProfileLayout';
import { getSubscribedChannels } from 'lib/twilio-chat/services/client';

const MyMessages = () => {
  const router = useRouter();
  // Connect with Twilio
  const [isLoadingTwilio, client] = useTwilioClient();
  const [channels, setChannels] = useState([]);
  const [isLoadingChannels, setIsLoadingChannels] = useState(false);
  // -------

  useEffect(() => {
    const getChannels = async () => {
      setIsLoadingChannels(true);
      const channels = await getSubscribedChannels(client);

      console.log(`channels`, channels);
      setChannels(channels?.items);
      setIsLoadingChannels(false);
    };
    if (client) {
      getChannels();
    }
  }, [client]);

  const columns = [
    {
      title: 'Назва',
      dataIndex: ['channelState', 'friendlyName'],
    },
    {
      title: 'Сообщений',
      align: 'center',
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
          {record.lastMessage ? record.lastMessage.index + 1 : 0}
        </div>
      ),
    },
    {
      title: 'Дата/время',
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

  const dataSource = channels?.map((channel) => ({
    channelState: channel.channelState,
    sid: channel.sid,
  }));
  return (
    <ProfileLayout>
      <Spin spinning={isLoadingTwilio || isLoadingChannels}>
        <Table
          title={() => <Title>Мої повідомлення</Title>}
          style={{ height: '100%' }}
          locale={{
            emptyText: (
              <Empty
                image="/assets/no-data-cuate.png"
                description={<span>Немає повідомлень</span>}
              ></Empty>
            ),
          }}
          dataSource={dataSource}
          columns={columns}
          rowKey={(record) => record.channelState.uniqueName}
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
