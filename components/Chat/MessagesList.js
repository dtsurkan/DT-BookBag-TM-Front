import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { Avatar, Col, Comment, List, Row, Tooltip } from 'antd';

const MessagesList = ({ messages = [], scrollToBottomRef }) => {
  const { profile } = useSelector((state) => state.user);
  return (
    <List
      split={false}
      style={{ overflow: 'auto', maxHeight: '60vh' }}
      itemLayout="horizontal"
      dataSource={messages}
      renderItem={({ state: { author, body, timestamp } }) => (
        <List.Item
          style={{
            margin: '10px 0',
            display: 'flex',
            justifyContent: author === profile.email ? 'flex-start' : 'flex-end',
          }}
        >
          <Row>
            <Col xs={24} md={18}>
              <Comment
                style={{ background: '#EDF8F6', padding: '10px' }}
                author={author}
                avatar={
                  <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                  />
                }
                content={body}
                datetime={
                  <Tooltip title={format(timestamp, 'yyyy-MM-dd HH:mm:ss')}>
                    <span>{format(timestamp, 'yyyy-MM-dd HH:mm:ss')}</span>
                  </Tooltip>
                }
              />
            </Col>
          </Row>
        </List.Item>
      )}
      footer={
        <div ref={scrollToBottomRef} className="">
          {/* Dumpy Box for scrollToBottomRef */}
        </div>
      }
    />
  );
};

export default MessagesList;
