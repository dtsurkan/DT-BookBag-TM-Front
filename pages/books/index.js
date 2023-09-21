import { Col, Row } from 'antd';
import AppLayout from 'components/AppLayout/AppLayout';
import ContentComponent from 'components/AppLayout/ContentComponent';
import BooksList from 'components/Lists/BooksList';
import CategoryList from 'components/Lists/CategoryList';
import BookFilters from 'components/Filters/BookFilters';
import { getCategories } from 'lib/strapi/services/categories';
import { getBooksWithFilters } from 'lib/strapi/services/books';

const Books = ({ categories = [], books = [] }) => {
  return (
    <AppLayout globalDivStyles={{ background: '#F9FEFD' }}>
      <ContentComponent>
        <Row justify="space-around">
          <Col xs={24} lg={6}>
            <CategoryList categories={categories} />
          </Col>
          <Col xs={24} lg={17}>
            <BookFilters booksCount={books.length} />
            <BooksList dataSource={books} />
          </Col>
        </Row>
      </ContentComponent>
    </AppLayout>
  );
};

export const getServerSideProps = async ({ query }) => {
  // console.log("query", query);
  const [categories, books] = await Promise.all([getCategories(), getBooksWithFilters(query)]);
  // console.log("books", books);
  if (books.data.statusCode === 500 || books.data.statusCode === 400) {
    return {
      notFound: true,
    };
  }
  return {
    props: { categories: categories.data, books: books.data },
  };
};

export default Books;
