import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isEmpty as _isEmpty } from 'lodash';
import { Col, Row } from 'antd';
import AppLayout from 'components/AppLayout/AppLayout';
import ContentComponent from 'components/AppLayout/ContentComponent';
import BooksList from 'components/Lists/BooksList';
import CategoryList from 'components/Lists/CategoryList';
import BookFilters from 'components/Filters/BookFilters';
import { getCategories } from 'lib/strapi/services/categories';
import { getBooksCount, getBooksWithFilters } from 'lib/strapi/services/books';
import { stringifyQueryParams } from 'lib/qs';
import { PAGE_SIZE } from 'utils/constants';

const Books = ({ categories = [], books = [], count = 0 }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!_isEmpty(router.query)) {
      const start = router.query.start ? +router.query.start : 1;
      setCurrentPage(start);
    } else {
      setCurrentPage(1);
    }
  }, [router.query]);

  const handlePagination = (page) => {
    const allQueryParams = { ...router.query, start: page };
    setCurrentPage(page);
    router.push(`${window.location.pathname}${stringifyQueryParams(allQueryParams)}`);
  };
  return (
    <AppLayout globalDivStyles={{ background: '#F9FEFD' }}>
      <ContentComponent>
        <Row justify="space-around">
          <Col xs={24} lg={6}>
            <CategoryList categories={categories} />
          </Col>
          <Col xs={24} lg={17}>
            <BookFilters booksCount={count} />
            <BooksList
              dataSource={books}
              pagination={{
                total: count,
                pageSize: PAGE_SIZE,
                hideOnSinglePage: true,
                current: currentPage,
                onChange: handlePagination,
              }}
            />
          </Col>
        </Row>
      </ContentComponent>
    </AppLayout>
  );
};

export const getServerSideProps = async ({ query }) => {
  // console.log('query', query);
  const [categories, books, count] = await Promise.all([
    getCategories(),
    getBooksWithFilters(query),
    getBooksCount(query),
  ]);
  // console.log(`count`, count);
  // console.log('books', books);
  if (books.data.statusCode === 500 || books.data.statusCode === 400) {
    return {
      notFound: true,
    };
  }
  return {
    props: { categories: categories.data, books: books.data, count: count.data },
  };
};

export default Books;
