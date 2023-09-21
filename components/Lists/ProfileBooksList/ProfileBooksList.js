import useTranslation from 'next-translate/useTranslation';
import { Col, Row } from 'antd';
import Title from 'antd/lib/typography/Title';
import BooksList from '../BooksList';

const ProfileList = ({
  books = [],
  isLoading = false,
  renderKey,
  hasAddingBook = true,
  listTitle = 'components:lists.profile.my-books-title',
}) => {
  const { t } = useTranslation();
  return (
    <Row style={{ marginTop: '25px' }}>
      <Col xs={24}>
        <Title level={1} type="secondary">
          {t(listTitle, { count: books ? books.length : 0 })}
        </Title>
      </Col>
      <Col xs={24}>
        <BooksList
          hasAddingBook={hasAddingBook}
          dataSource={books}
          pagination={{ pageSize: 15, showSizeChanger: false }}
          renderKey={renderKey}
          hasLoading={true}
          customLoadingParams={{ size: 'large', spinning: isLoading }}
        />
      </Col>
    </Row>
  );
};

export default ProfileList;
