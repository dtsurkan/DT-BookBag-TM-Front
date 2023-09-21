import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Col, Row } from 'antd';
import { isEmpty as _isEmpty } from 'lodash';
import AppLayout from 'components/AppLayout/AppLayout';
import ContentComponent from 'components/AppLayout/ContentComponent';
import BooksList from 'components/Lists/BooksList';
import CategoryList from 'components/Lists/CategoryList';
import BookFilters from 'components/Filters/BookFilters';
import { getSubcategoryBySlug } from 'lib/strapi/services/subcategories';
import { getCategoryBySlug } from 'lib/strapi/services/categories';
import { getBooksCount, getBooksWithFilters } from 'lib/strapi/services/books';
import { stringifyQueryParams } from 'lib/qs';
import { PAGE_SIZE } from 'utils/constants';

const Category = ({ category = {}, books = [], count = 0 }) => {
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
      <ContentComponent>
        <Row justify="space-around">
          <Col xs={24} lg={6}>
            <CategoryList category={category} />
          </Col>
          <Col xs={24} lg={17}>
            <BookFilters title={category.name} booksCount={count} />
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
    const books = await getBooksWithFilters(newQueryString);
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
      props: { category: subCategory.data[0], books: books.data, count: count.data },
    };
  } else {
    const newQueryString = {
      'categories.slug': categorySlug,
      ...otherQueryParams,
    };
    const category = await getCategoryBySlug(categorySlug);
    const books = await getBooksWithFilters(newQueryString);
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
      props: { category: category.data[0], books: books.data, count: count.data },
    };
  }
}
export default Category;
