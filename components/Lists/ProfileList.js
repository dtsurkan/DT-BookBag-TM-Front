import { Col, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import BooksList from './BooksList';

const ProfileList = ({ books = [], renderKey, hasAddingBook = true, listTitle = 'Мої книги' }) => {
  return (
    <Row style={{ marginTop: '25px' }}>
      <Col xs={24}>
        <Title level={1} type="secondary">
          {`${listTitle} (${books ? books.length : 0})`}
        </Title>
      </Col>
      <Col xs={24}>
        {/* {!books ? (
          <Skeleton active avatar paragraph={{ rows: 16 }} />
        ) : ( */}
        <BooksList
          hasAddingBook={hasAddingBook}
          dataSource={books}
          pagination={{ pageSize: 8 }}
          renderKey={renderKey}
        />
        {/* )} */}
      </Col>
    </Row>
  );
};

export default ProfileList;
