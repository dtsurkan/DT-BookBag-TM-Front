import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import useCustomSwr from 'hooks/useCustomSwr';
import { Row, Col } from 'antd';
import Title from 'antd/lib/typography/Title';
import AppLayout from 'components/Layout/AppLayout';
import MainContent from 'components/Layout/MainContent';
import BooksList from 'components/Lists/BooksList';

const SellerPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { response: books, isLoading: isLoadingUserProfile } = useCustomSwr({
    url: `/books?seller.id=${router?.query?.id}&_sort=created_at:DESC&book_status=added`,
  });

  return (
    <AppLayout>
      <MainContent>
        <Row gutter={[0, 30]} justify="center">
          <Col xs={24}>
            <Title level={3}>{t('components:others.seller-all-books-title')}</Title>
          </Col>
          <Col xs={24} lg={20}>
            <BooksList
              dataSource={books}
              customLoadingParams={{
                size: 'large',
                spinning: isLoadingUserProfile,
                tip: t('components:loading.tip'),
              }}
              pagination={false}
            />
          </Col>
        </Row>
      </MainContent>
    </AppLayout>
  );
};

export default SellerPage;
