import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import Title from 'antd/lib/typography/Title';
import AppLayout from 'components/AppLayout/AppLayout';
import ContentComponent from 'components/AppLayout/ContentComponent';
import BooksList from 'components/Lists/BooksList';
import { getBookBySellerID } from 'lib/strapi/services/books';

const SellerPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { isLoadingUserProfile } = useSelector((state) => state.user);
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async (value) => {
      setIsLoadingBooks(true);
      try {
        const response = await getBookBySellerID(value);
        console.log(`response`, response);
        setBooks(response.data);
        setIsLoadingBooks(false);
      } catch (error) {
        console.log(`error`, error);
        setIsLoadingBooks(false);
      }
    };
    if (router.query.id) {
      getBooks(router.query.id);
    }
  }, [router.query.id]);
  return (
    <AppLayout>
      <ContentComponent>
        <Row gutter={[0, 30]} justify="center">
          <Col xs={24}>
            <Title level={3}>{t('components:others.seller-all-books-title')}</Title>
          </Col>
          <Col xs={24} lg={20}>
            <BooksList
              dataSource={books}
              customLoadingParams={{
                size: 'large',
                spinning: isLoadingBooks || isLoadingUserProfile,
                tip: t('components:loading.tip'),
              }}
              pagination={false}
            />
          </Col>
        </Row>
      </ContentComponent>
    </AppLayout>
  );
};

export default SellerPage;
