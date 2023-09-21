import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
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
          title="Книги"
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
              title="Категория"
              description={book.categories.map(
                (category, index) => `${(index ? ', ' : '') + category.name}`
              )}
            />
            <DescriptionItem title="Языки" description={book.language} />
            <DescriptionItem title="Состояние" description={book.condition} />
            <DescriptionItem title="Город" description={book.seller_city.label} />
            <DescriptionItem
              title="Продавец"
              descriptionStyle={{ color: '#01504D' }}
              description={book.seller.email}
              copyable={true}
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
                      {`Успішно куплено ${book.buyer.email}`}
                    </Title>
                  </Space>
                ) : book.book_status === 'sold' ? (
                  <Space>
                    <DoubleCheckIcon style={{ fontSize: '32px' }} />
                    <Title level={2} style={{ color: '#6bbe9f', margin: 0 }}>
                      Успешно продано
                    </Title>
                  </Space>
                ) : theSameUser ? (
                  <Title level={2} style={{ color: '#6bbe9f', margin: 0 }}>
                    Це ваша книга!
                  </Title>
                ) : (
                  <PrimaryButton
                    onClick={() => {
                      if (!_isEmpty(profile)) {
                        confirm({
                          centered: true,
                          title: 'Ви хочете написати цьому продавцеві?',
                          icon: <ExclamationCircleOutlined />,
                          okText: 'Да',
                          okType: 'primary',
                          //   because dropdown z-index === 1050
                          zIndex: 1100,
                          cancelText: 'Ні',
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
                        message.info('You need to auth!');
                      }
                    }}
                    btnText="Написати продавцю"
                    style={{ marginRight: '10px' }}
                  />
                )}
              </Col>
              <Col>
                <Title style={{ marginBottom: 0 }}>{book.price} грн</Title>
              </Col>
            </Row>
            <Row>
              <Col xs={24}>
                <Title level={3}>Комментарий продавца:</Title>
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
              <Title>Другие книги продавца</Title>
              <Text style={{ color: '#01504D' }}>
                Если вам понравилось творчество данного автора, не забывайте, что вы можете следить
                за выходом его новых книг нажав подписаться на автора.
              </Text>
            </Space>
            <BooksSlider>
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

  if (!book.data.length) {
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
