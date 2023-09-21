import { useRouter } from "next/router";
import { Col, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import AppLayout from "components/AppLayout/AppLayout";
import BooksList from "components/Lists/BooksList";
import CategoryList from "components/Lists/CategoryLIst";
import BookFilters from "components/Filters/BookFilters";
import { getSubcategoryBySlug } from "lib/strapi/services/subcategories";
import { getCategoryBySlug } from "lib/strapi/services/categories";
import { getBooksWithFilters } from "lib/strapi/services/books";

const Category = ({ category = {}, books = [] }) => {
  const router = useRouter();
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <AppLayout globalDivStyles={{ background: "#F9FEFD" }}>
      <Content style={{ minHeight: "75vh", marginTop: "100px" }}>
        <Row justify="space-around">
          <Col xs={24} lg={6}>
            <div
              className=""
              style={{
                background: "white",
                padding: "25px 20px",
                height: "100%",
              }}
            >
              <Title level={2} type="secondary">
                Категории книг
              </Title>
              <CategoryList category={category} />
            </div>
          </Col>
          <Col xs={24} lg={17}>
            <BookFilters title={category.name} booksCount={books.length} />
            <BooksList dataSource={books} />
          </Col>
        </Row>
      </Content>
    </AppLayout>
  );
};

export async function getServerSideProps({ params, query }) {
  const { slug, ...otherQueryParams } = query;
  console.log("otherQueryParams", otherQueryParams);
  console.log("query.slug[0]", slug[0]);
  console.log("query.slug[1]", slug[1]);
  const categorySlug = slug[0];
  const subcategorySlug = slug[1];

  if (subcategorySlug) {
    const newQueryString = {
      "subcategories.slug": subcategorySlug,
      ...otherQueryParams,
    };
    const subCategory = await getSubcategoryBySlug(subcategorySlug);
    const books = await getBooksWithFilters(newQueryString);
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
      props: { category: subCategory.data[0], books: books.data },
    };
  } else {
    const newQueryString = {
      "categories.slug": categorySlug,
      ...otherQueryParams,
    };
    const category = await getCategoryBySlug(categorySlug);
    const books = await getBooksWithFilters(newQueryString);
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
      props: { category: category.data[0], books: books.data },
    };
  }
}
export default Category;
