import InfiniteScroll from 'react-infinite-scroller';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { Avatar, Button, Col, Comment, List, Row, Spin, Tooltip } from 'antd';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { getFirstLetter, scrollToBottom } from 'utils/functions';
import CustomEmptyComponent from 'components/Empty/CustomEmptyComponent';

const MessagesList = ({
  loadMore = () => {},
  hasMore = false,
  messages = [],
  scrollToBottomRef,
  threshold = 50,
}) => {
  const { profile } = useSelector((state) => state.user);
  return (
    <>
      <div style={{ overflow: 'auto', maxHeight: '60vh' }}>
        <InfiniteScroll
          initialLoad={false}
          isReverse={true}
          pageStart={0}
          loadMore={loadMore}
          hasMore={hasMore}
          threshold={threshold}
          useWindow={false}
          loader={
            <div key={1} className="" style={{ display: 'flex', justifyContent: 'center' }}>
              <Spin />
            </div>
          }
        >
          <List
            style={{ position: 'relative' }}
            locale={{ emptyText: <CustomEmptyComponent /> }}
            split={false}
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
                <Row
                  style={{ justifyContent: author === profile.email ? 'flex-start' : 'flex-end' }}
                >
                  <Col xs={20}>
                    <Comment
                      style={{
                        background: '#EDF8F6',
                        padding: '10px',
                      }}
                      author={author}
                      avatar={
                        <Avatar
                          style={{
                            background: author === profile.email ? '#f56a00' : '#7265e6',
                          }}
                        >
                          {getFirstLetter(author, '@')}
                        </Avatar>
                      }
                      content={<p>{body}</p>}
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
          />
          <div ref={scrollToBottomRef}></div>
        </InfiniteScroll>
      </div>
      {messages.length ? (
        <div
          style={{
            position: 'sticky',
            // textAlign: 'end',
            // visibility: visible ? 'visible' : 'hidden',
            // opacity: visible ? 1 : 0,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Tooltip title="Scroll to bottom">
            <Button
              style={{ marginRight: '10px' }}
              type="default"
              shape="circle"
              onClick={() => scrollToBottom(scrollToBottomRef, true)}
              icon={<VerticalAlignBottomOutlined />}
            />
          </Tooltip>
        </div>
      ) : null}
    </>
  );
};

export default MessagesList;
