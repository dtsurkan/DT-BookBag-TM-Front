import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';
import { isEmpty as _isEmpty } from 'lodash';
import { Col, message, PageHeader, Row, Space } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import confirm from 'antd/lib/modal/confirm';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import Paragraph from 'antd/lib/typography/Paragraph';
import ContentComponent from 'components/AppLayout/ContentComponent';
import AppLayout from 'components/AppLayout/AppLayout';
import AsNavForSlider from 'components/Sliders/Slick/AsNavForSlider';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import BooksSlider from 'components/Sliders/Slick/BooksSlider';
import BookCard from 'components/Cards/BookCard';
import DescriptionItem from 'components/Items/DescriptionItem';
import { DoubleCheckIcon } from 'components/Icons';
import { getBookBySlug, getBooks, getBookBySellerID } from 'lib/strapi/services/books';

const BookItem = ({ book = {}, booksWithTheSameSeller = [] }) => {
  const { profile } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const MAX_COUNT_BOOKS = !screens.md ? 6 : 9;
  // console.log("booksWithTheSameSeller", booksWithTheSameSeller);
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading22222222...</div>;
  }
  const theSameUser = profile.email === book.seller.email;
  return (
    <AppLayout>
      <ContentComponent>
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
            <DescriptionItem
              descriptionStyle={{ color: '#01504D', textTransform: 'capitalize' }}
              description={book.author}
              isEllipsis={true}
            />
            <DescriptionItem
              isEllipsis={true}
              title="components:cards.description.categories"
              description={book.categories.map(
                (category, index) =>
                  `${(index ? ', ' : '') + t(`components:categories.${category.slug}`)}`
              )}
            />
            <DescriptionItem
              title="components:cards.description.language"
              description={t(`components:lists.language.${book.language}`)}
            />
            <DescriptionItem
              title="components:cards.description.condition"
              description={t(`components:lists.condition.${book.condition}`)}
            />
            <DescriptionItem
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
              <Col>
                {book.book_status === 'sold' && book.seller.id !== profile.id ? (
                  <Space>
                    <DoubleCheckIcon style={{ fontSize: '32px' }} />
                    <Title level={2} style={{ color: '#6bbe9f', margin: 0 }}>
                      {
                        (t('components:others.success-sold-book-title'),
                        { buyer: book.buyer.email })
                      }
                    </Title>
                  </Space>
                ) : book.book_status === 'sold' ? (
                  <Space>
                    <DoubleCheckIcon style={{ fontSize: '32px' }} />
                    <Title level={2} style={{ color: '#6bbe9f', margin: 0 }}>
                      {t('components:others.success-sold-book-title')}
                    </Title>
                  </Space>
                ) : theSameUser ? (
                  <Title level={2} style={{ color: '#6bbe9f', margin: 0 }}>
                    {t('components:others.your-book-title')}
                  </Title>
                ) : (
                  <PrimaryButton
                    onClick={() => {
                      if (!_isEmpty(profile)) {
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
                    style={{ marginRight: '10px' }}
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
        {/* <Row> */}
        {/* Books */}
        {/* <Row> */}
        {booksWithTheSameSeller.length ? (
          <div style={{ margin: '100px 0' }}>
            <Space direction="vertical">
              <Title>{t('components:others.others-seller-books-title')}</Title>
              <Text style={{ color: '#01504D' }}>
                {t('components:others.others-seller-books-text')}
              </Text>
            </Space>
            <BooksSlider route={`/sellers/${book.seller.id}`}>
              {booksWithTheSameSeller.slice(0, MAX_COUNT_BOOKS).map((book) => (
                <div key={book.id}>
                  <BookCard book={book} />
                </div>
              ))}
            </BooksSlider>
            {/* </Row> */}
          </div>
        ) : null}
        {/* </Row> */}
      </ContentComponent>
    </AppLayout>
  );
};

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const [books] = await Promise.all([getBooks()]);

  // Get the paths we want to pre-render based on posts
  const paths = books.data.map((post) => `/books/${post.slug}`);
  console.log('paths', paths);
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // console.log("params", params);
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const book = await getBookBySlug(params.slug);

  const booksWithTheSameSeller = await getBookBySellerID(book?.data[0]?.seller.id);

  if (!book?.data?.length) {
    return {
      notFound: true,
    };
  }

  // Pass post data to the page via props
  return {
    props: {
      book: book.data[0],
      booksWithTheSameSeller: booksWithTheSameSeller.data,
    },
    revalidate: 15,
  };
}

export default BookItem;
