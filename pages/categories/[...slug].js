import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Col, Row } from 'antd';
import _isEmpty from 'lodash/isEmpty';
import AppLayout from 'components/Layout/AppLayout';
import MainContent from 'components/Layout/MainContent';
import BooksList from 'components/Lists/BooksList';
import CategoryList from 'components/Lists/CategoryList';
import BookFilters from 'components/Book/BookFilters';
import { getSubcategoryBySlug } from 'lib/strapi/services/subcategories';
import { getCategoryBySlug } from 'lib/strapi/services/categories';
import { getBooksCount, getBooksWithFilters } from 'lib/strapi/services/books';
import { stringifyQueryParams } from 'lib/qs';
import { PAGE_SIZE } from 'utils/constants';

const Category = ({ category = {}, books = [], count = 0 }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  console.log(`category`, category);
  console.log(`books`, books);
  useEffect(() => {
    if (!_isEmpty(router.query)) {
      const start = router.query.start ? +router.query.start : 1;
      setCurrentPage(start);
    } else {
      setCurrentPage(1);
    }
  }, [router.query]);

  const handlePagination = (page) => {
    const { slug, ...otherQueryParams } = router.query;
    const allQueryParams = { ...otherQueryParams, start: page };
    setCurrentPage(page);
    router.push(`${window.location.pathname}${stringifyQueryParams(allQueryParams)}`);
  };
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <AppLayout globalDivStyles={{ background: '#F9FEFD' }}>
      <MainContent>
        <Row justify="space-around">
          <Col xs={24} lg={6}>
            <CategoryList category={category} />
          </Col>
          <Col xs={24} lg={17}>
            <BookFilters title={`components:categories.${category.slug}`} booksCount={count} />
            <BooksList
              dataSource={books}
              pagination={{
                total: count,
                pageSize: PAGE_SIZE,
                hideOnSinglePage: true,
                showSizeChanger: false,
                current: currentPage,
                onChange: handlePagination,
              }}
            />
          </Col>
        </Row>
      </MainContent>
    </AppLayout>
  );
};

export async function getServerSideProps({ query }) {
  const { slug, ...otherQueryParams } = query;
  console.log('otherQueryParams', otherQueryParams);
  console.log('query.slug[0]', slug[0]);
  console.log('query.slug[1]', slug[1]);
  const categorySlug = slug[0];
  const subcategorySlug = slug[1];

  if (subcategorySlug) {
    const newQueryString = {
      'subcategories.slug': subcategorySlug,
      ...otherQueryParams,
    };
    const subCategory = await getSubcategoryBySlug(subcategorySlug);
    console.log(`subCategory`, subCategory);
    const books = await getBooksWithFilters(newQueryString);
    console.log(`books`, books);
    const count = await getBooksCount(newQueryString);
    if (!subCategory.data.length) {
      return {
        notFound: true,
      };
    }
    if (!books) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        category: subCategory.data[0],
        books: books.data,
        count: count.data,
      },
    };
  } else {
    const newQueryString = {
      'categories.slug': categorySlug,
      ...otherQueryParams,
    };
    const category = await getCategoryBySlug(categorySlug);
    console.log(`category`, category);
    const books = await getBooksWithFilters(newQueryString);
    console.log(`books`, books);
    const count = await getBooksCount(newQueryString);
    if (!category.data.length) {
      return {
        notFound: true,
      };
    }
    if (!books) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        category: category.data[0],
        books: books.data,
        count: count.data,
      },
    };
  }
}
export default Category;
