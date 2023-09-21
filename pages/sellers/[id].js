import useTranslation from 'next-translate/useTranslation';
import { Row, Col } from 'antd';
import Title from 'antd/lib/typography/Title';
import AppLayout from 'components/Layout/AppLayout';
import MainContent from 'components/Layout/MainContent';
import BooksList from 'components/Lists/BooksList';
import { getBookBySellerID } from 'lib/strapi/services/books';

export const getServerSideProps = async ({ params }) => {
  console.log(`params`, params);
  const booksWithTheSameSeller = await getBookBySellerID(params.id);
  return {
    props: { books: booksWithTheSameSeller.data },
  };
};

const SellerPage = ({ books }) => {
  console.log(`books`, books);
  const { t } = useTranslation();

  return (
    <AppLayout>
      <MainContent>
        <Row gutter={[0, 30]} justify="center">
          <Col xs={24}>
            <Title level={3}>{t('components:others.seller-all-books-title')}</Title>
          </Col>
          <Col xs={24} lg={20}>
            <BooksList dataSource={books} hasLoading={false} pagination={false} />
          </Col>
        </Row>
      </MainContent>
    </AppLayout>
  );
};

export default SellerPage;
