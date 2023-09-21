import { useState } from 'react';
import { useRouter } from 'next/router';
import useTwilioClient from 'hooks/useTwilioClient';
import { getSession } from 'next-auth/client';
import useTranslation from 'next-translate/useTranslation';
import { Button, Col, message, PageHeader, Row, Space } from 'antd';
import { ExclamationCircleOutlined, LikeOutlined } from '@ant-design/icons';
import confirm from 'antd/lib/modal/confirm';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';
import MainContent from 'components/Layout/MainContent';
import AppLayout from 'components/Layout/AppLayout';
import AsNavForSlider from 'components/Sliders/ReactSlick/AsNavForSlider';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import BookDescriptionItem from 'components/Book/BookDescriptionItem';
import DoubleCheckIcon from 'components/Icons/DoubleCheckIcon';
import NewCollectionBooks from 'components/Sections/NewCollectionBooks';
import { getBookBySlug, getBookBySellerID } from 'lib/strapi/services/books';
import { getBookFromLikedBooks } from 'lib/strapi/services/liked-books';
import {
  handleAddBookToLikedBooks,
  handleDeleteBookFromLikedBooks,
} from 'logics/books/liked-books';

const BookItem = ({ book = {}, booksWithTheSameSeller = [], session, isLiked = false }) => {
  const { client } = useTwilioClient();
  const { t } = useTranslation();
  console.log(`bookefewfwfewfwefewfwffewfwefwefwefewfewfweff`, book);
  // console.log("booksWithTheSameSeller", booksWithTheSameSeller);
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(isLiked);
  if (router.isFallback) {
    return <div>Loading22222222...</div>;
  }
  const theSameUser = session?.profile.id === book.buyingID.sellerID;
  return (
    <AppLayout>
      <MainContent>
        <PageHeader
          className="site-page-header"
          onBack={() => router.push('/books')}
          title={t('components:buttons.books')}
          style={{ padding: '16px 0' }}
        />
        <Row justify="space-between">
          <AsNavForSlider xl={12} book={book} />
          <Col xs={24} xl={11}>
            <Title style={{ textTransform: 'uppercase', fontWeight: 500 }}>{book.book_name}</Title>
            <BookDescriptionItem
              descriptionStyle={{ color: '#01504D', textTransform: 'capitalize' }}
              description={book.author}
              isEllipsis={true}
            />
            <BookDescriptionItem
              isEllipsis={true}
              title="components:cards.description.categories"
              description={book?.categories?.map(
                (category, index) =>
                  `${(index ? ', ' : '') + t(`components:categories.${category.slug}`)}`
              )}
            />
            {book.subcategories.length ? (
              <BookDescriptionItem
                isEllipsis={true}
                title="components:cards.description.subcategories"
                description={book.subcategories.map(
                  (subcategory, index) =>
                    `${(index ? ', ' : '') + t(`components:categories.${subcategory.slug}`)}`
                )}
              />
            ) : null}
            <BookDescriptionItem
              title="components:cards.description.language"
              description={t(`components:lists.language.${book.language}`)}
            />
            <BookDescriptionItem
              title="components:cards.description.condition"
              description={t(`components:lists.condition.${book.condition}`)}
            />
            <BookDescriptionItem
              title="components:cards.description.city"
              description={book.seller_city.label}
            />
            <Row
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '50px',
              }}
            >
              <Col style={{ display: 'flex', alignItems: 'center' }}>
                {book.buyingID.buying_status === 'sold' &&
                book.buyingID.sellerID !== session?.profile.id ? (
                  <Space>
                    <DoubleCheckIcon style={{ fontSize: '32px' }} />
                    <Title level={2} style={{ color: '#6bbe9f', margin: 0, marginRight: '16px' }}>
                      {t('components:others.success-bought-book-title')}
                    </Title>
                  </Space>
                ) : book.buyingID.buying_status === 'sold' ? (
                  <Space>
                    <DoubleCheckIcon style={{ fontSize: '32px' }} />
                    <Title level={2} style={{ color: '#6bbe9f', margin: 0, marginRight: '16px' }}>
                      {t('components:others.success-sold-book-title')}
                    </Title>
                  </Space>
                ) : theSameUser ? (
                  <Title level={2} style={{ color: '#6bbe9f', margin: 0, marginRight: '16px' }}>
                    {t('components:others.your-book-title')}
                  </Title>
                ) : (
                  <PrimaryButton
                    onClick={() => {
                      if (session) {
                        confirm({
                          centered: true,
                          title: t('components:confirm.confirm-write-to-seller-title'),
                          icon: <ExclamationCircleOutlined />,
                          okText: t('components:general.yes'),
                          okType: 'primary',
                          //   because dropdown z-index === 1050
                          zIndex: 1100,
                          cancelText: t('components:general.no'),
                          async onOk() {
                            router.push({
                              pathname: `${router.asPath}/chat`,
                            });
                          },
                          onCancel() {
                            message.info('Cancel');
                          },
                        });
                      } else {
                        message.info(t('components:auth.required-auth-title'));
                      }
                    }}
                    btnText="components:buttons.write-to-seller"
                    style={{ marginRight: '16px' }}
                  />
                )}
                {session && book.buyingID.buying_status !== 'sold' && (
                  <Button
                    type={isChecked ? 'primary' : 'default'}
                    shape="circle"
                    icon={<LikeOutlined />}
                    onClick={async () => {
                      console.log(`book`, book);
                      setIsChecked(!isChecked);
                      if (!isChecked) {
                        await handleAddBookToLikedBooks(session, book, t);
                      } else {
                        await handleDeleteBookFromLikedBooks(session, book, t);
                      }
                    }}
                  />
                )}
              </Col>
              <Col>
                <Title style={{ marginBottom: 0 }}>
                  {t('components:cards.description.price', { price: book.price })}
                </Title>
              </Col>
            </Row>
            <Row>
              <Col xs={24}>
                <Title level={3}>{t('components:cards.description.comments')}</Title>
              </Col>
              <Col xs={24}>
                <Paragraph type="secondary">{book.seller_comment}</Paragraph>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* Books */}
        <NewCollectionBooks
          books={booksWithTheSameSeller}
          client={client}
          title="components:others.others-seller-books-title"
          route={`/sellers/${book.buyingID.sellerID}`}
          hasSuptitle={false}
          isAdditionalParagraph={false}
        />
      </MainContent>
    </AppLayout>
  );
};

export async function getServerSideProps({ params, req }) {
  console.log('params', params);
  const book = await getBookBySlug(params.slug);
  const session = await getSession({ req });
  const booksWithTheSameSeller = await getBookBySellerID(book?.data[0]?.buyingID.sellerID);

  let likedBook = null;
  let isLiked = false;
  if (session) {
    console.log('TESTING');
    likedBook = await getBookFromLikedBooks(book?.data[0]?.id, session?.profile.id, session?.jwt);
    isLiked = likedBook?.data[0]?.userID === session?.profile?.id;
  }

  if (!book?.data?.length) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      isLiked,
      book: book.data[0],
      booksWithTheSameSeller: booksWithTheSameSeller.data,
      session,
    },
  };
}

export default BookItem;
