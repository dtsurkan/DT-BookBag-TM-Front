import { useRouter } from "next/router";
import { Col, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import AppLayout from "components/AppLayout/AppLayout";
import BooksList from "components/Lists/BooksList";
import CategoryList from "components/Lists/CategoryLIst";
import BookFilters from "components/Filters/BookFilters";
import { getCategories } from "lib/strapi/services/categories";
import { getBooksWithFilters } from "lib/strapi/services/books";

const Books = ({ categories = [], books = [] }) => {
  const router = useRouter();
  return (
    <AppLayout globalDivStyles={{ background: "#F9FEFD" }}>
      {/* <div style={{ background: "#F9FEFD" }}> */}
      <Content style={{ minHeight: "75vh", marginTop: "100px" }}>
        <Row justify="space-around">
          <Col xs={24} lg={6}>
            <div
              className=""
              style={{ background: "white", padding: "25px 20px" }}
            >
              <Title level={2} type="secondary">
                Категории книг
              </Title>
              <CategoryList categories={categories} />
            </div>
          </Col>
          <Col xs={24} lg={17}>
            <BookFilters booksCount={books.length} />
            <BooksList dataSource={books} />
          </Col>
        </Row>
      </Content>
      {/* </div> */}
    </AppLayout>
  );
};

export const getServerSideProps = async ({ params, query }) => {
  // console.log("query", query);
  // Run API calls in parallel
  try {
    const [categories, books] = await Promise.all([
      getCategories(),
      getBooksWithFilters(query),
    ]);
    // console.log("books.data", books.data);
    return {
      props: { categories: categories.data, books: books.data },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Books;
