import { Button, Col, List, Row, Select } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import AppLayout from "components/AppLayout/AppLayout";
import { FilterIcon } from "components/Icons";
import NavBar from "components/Navigation/NavBar";
import { useRouter } from "next/router";
import { useState } from "react";
import classNames from "classnames";
import classes from "styles/scss/pages/books.module.scss";
import HorizontalBookCard from "components/Cards/HorizontalBookCard";
import { getCategories } from "lib/strapi/services/categories";
import { getBooksWithFilters } from "lib/strapi/services/books";

const Books = ({ categories = [] }) => {
  const router = useRouter();
  const [category, setCategory] = useState(categories[0]);
  const [books, setBooks] = useState([...category.books]);

  const initialFilters = {
    language: "all",
    price: "",
  };
  const [filters, setFilters] = useState(initialFilters);

  const onChangeLanguage = async (language) => {
    console.log(`selected ${language}`);
    if (language === "all") {
      const books = await getBooksWithFilters(filters.price, "", category.name);
      setFilters({ ...filters, language });
      setBooks(books.data);
      return;
    }
    const books = await getBooksWithFilters(
      filters.price,
      language,
      category.name
    );
    setFilters({ ...filters, language });
    setBooks(books.data);
  };
  const onChangePrice = async (price) => {
    console.log(`selected ${price}`);
    if (filters.language === "all") {
      const books = await getBooksWithFilters(price, "", category.name);
      setFilters({ ...filters, price });
      setBooks(books.data);
      return;
    }
    const books = await getBooksWithFilters(
      price,
      filters.language,
      category.name
    );
    console.log("books price", books);
    setFilters({ ...filters, price });
    setBooks(books.data);
  };

  return (
    <AppLayout globalDivStyles={{ background: "#F9FEFD" }}>
      {/* <div style={{ background: "#F9FEFD" }}> */}
      <NavBar />
      <Row style={{ marginTop: "150px" }} justify="space-around">
        <Col xs={24} lg={6}>
          <div
            className=""
            style={{ background: "white", padding: "25px 20px" }}
          >
            <Title level={2} type="secondary">
              Категории книг
            </Title>
            <List
              split={false}
              itemLayout="horizontal"
              dataSource={categories}
              size="small"
              renderItem={(item) => (
                <List.Item style={{ padding: "4px 0" }}>
                  <Button
                    className={classNames(classes.categoryLink, {
                      [classes.active]: category.id === item.id,
                    })}
                    type="link"
                    onClick={() => {
                      if (category.id === item.id) {
                        return;
                      } else {
                        setFilters({ ...initialFilters });
                        setCategory(item);
                        setBooks(item.books);
                      }
                    }}
                  >
                    {item.name}
                  </Button>
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col xs={24} lg={17}>
          <div
            className=""
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Title level={1}>Книги</Title>
            <div className="" style={{ display: "flex", alignItems: "center" }}>
              <div
                className=""
                style={{ display: "flex", alignItems: "center" }}
              >
                <FilterIcon />
                <Text>Цена:</Text>
                <Select
                  defaultValue={filters.price}
                  bordered={false}
                  onChange={onChangePrice}
                  value={filters.price}
                >
                  <Select.Option value="">Дефолтное</Select.Option>
                  <Select.Option value="DESC">
                    От низкой к высокой
                  </Select.Option>
                  <Select.Option value="ASC">От високой к низкой</Select.Option>
                </Select>
              </div>
              <div
                className=""
                style={{ display: "flex", alignItems: "center" }}
              >
                <FilterIcon />
                <Text>Язык:</Text>
                <Select
                  onChange={onChangeLanguage}
                  defaultValue={filters.language}
                  bordered={false}
                  value={filters.language}
                >
                  <Select.Option value="all">Все</Select.Option>
                  <Select.Option value="Английский">Английский</Select.Option>
                  <Select.Option value="Русский">Русский</Select.Option>
                  <Select.Option value="Украинский">Украинский</Select.Option>
                </Select>
              </div>
            </div>
          </div>
          <List
            grid={{ gutter: 16, column: 4, xs: 1, sm: 2, md: 2, lg: 2, xl: 3 }}
            itemLayout="horizontal"
            dataSource={books}
            renderItem={(book) => {
              return (
                <List.Item key={book.slug}>
                  <HorizontalBookCard book={book} />
                </List.Item>
              );
            }}
          />
        </Col>
      </Row>

      {/* </div> */}
    </AppLayout>
  );
};

export const getStaticProps = async ({ params }) => {
  try {
    // Run API calls in parallel
    const [categories] = await Promise.all([getCategories()]);
    return { props: { categories: categories.data } };
  } catch (error) {
    console.log("error", error);
    // return { props: { error } };
  }
};

export default Books;
