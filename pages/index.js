import { Col, Row, Space } from "antd";
import classNames from "classnames";
import { Content } from "antd/lib/layout/layout";
import { DownOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";
import Text from "antd/lib/typography/Text";
import Link from "antd/lib/typography/Link";
import AppLayout from "components/AppLayout/AppLayout";
import AdventageCard from "components/Cards/AdventageCard";
import LottieComponent from "components/Lottie/LottieComponent";
import NavBar from "components/Navigation/NavBar";
import PrimaryButton from "components/Buttons/PrimaryButton";
import {
  BotIcon,
  LeavesIcon,
  DefenceIcon,
  LightBulbIcon,
} from "components/Icons";
import SubscribeCard from "components/Cards/SubscribeCard";
import FooterComponent from "components/AppLayout/Footer";
import BooksSlider from "components/Sliders/Slick/BooksSlider";
import BookCard from "components/Cards/BookCard";
import { getCategories } from "lib/strapi/services/categories";
import { getBooks } from "lib/strapi/services/books";
import booksLottie from "lotties/books.json";
import rotateBook from "lotties/rotate-book.json";
import classes from "styles/scss/pages/home.module.scss";

const Home = ({ books = [], categories = [] }) => {
  console.log("categories", categories);
  console.log("books", books);
  return (
    <AppLayout>
      <NavBar books={books} />
      <Content style={{ minHeight: "100vh" }}>
        <Row style={{ minHeight: "inherit" }}>
          <Row align="middle" style={{ margin: "25px 0", minHeight: "75vh" }}>
            <Col xs={24} md={10} style={{ zIndex: 1 }}>
              <Space size="middle" direction="vertical">
                <Title style={{ color: "#01504D" }} level={3}>
                  Добро пожаловать!
                </Title>
                <Title style={{ fontSize: "48px" }} level={1}>
                  BookBag - платформа которая экономит ваши деньги и природные
                  ресурсы
                </Title>
                <div className="" style={{ maxWidth: "550px" }}>
                  <Paragraph type="secondary">
                    Регистрируйся и переходы к покупке своих любимых книг по
                    вигодной цене, а если ты писатель, то спеши поделиться своим
                    творчеством с людьми.
                  </Paragraph>
                </div>
                <PrimaryButton
                  btnText="Добавить книгу"
                  isBlock={false}
                  style={{ marginTop: "30px" }}
                />
              </Space>
            </Col>
            <Col xs={24} md={14}>
              <div>
                <LottieComponent
                  animationData={booksLottie}
                  loop={false}
                  isHasClassName={true}
                  styles={{ transform: "translate3d(-40px, 0px,0px)" }}
                />
              </div>
            </Col>
          </Row>
          <Row align="middle" style={{ width: "100%" }}>
            <Col xs={24} md={12}>
              <Space>
                <BotIcon />
                <Text style={{ maxWidth: "150px" }}>
                  Facebook бот - ваш надежний помощник
                </Text>
              </Space>
            </Col>
            <Col xs={24} md={12}>
              <Space direction="vertical" align="center">
                <Text>Вниз</Text>
                <DownOutlined />
              </Space>
            </Col>
          </Row>
        </Row>
        {/* ADVENTAGES */}
        <Row className={classNames(classes.advantages)}>
          <Col xs={22} style={{ textAlign: "center", marginBottom: "50px" }}>
            <Title level={3} type="secondary" style={{ color: "#01504D" }}>
              Преимущества
            </Title>
            <Title
              style={{ maxWidth: "600px", fontSize: "48px", margin: "0 auto" }}
            >
              Почему стоит использовать нашу платформу
            </Title>
          </Col>
          <Row>
            <AdventageCard title="Гараздо дешевле чем в интернет-магазинах" />
            <AdventageCard
              IconComponent={LeavesIcon}
              title="Економие природных ресурсов на печать нових изданий"
            />
            <AdventageCard
              IconComponent={DefenceIcon}
              title="Удобное и безопасное использование платформи"
            />
          </Row>
        </Row>
        {/* ADVENTAGES */}

        {/* Rotate book / Your opportunities */}

        <Row
          align="middle"
          style={{ background: "#F9FEFD" }}
          className={classNames(classes.background)}
        >
          <Col xs={24} lg={12} data-aos="fade-right">
            <LottieComponent animationData={rotateBook} loop={2} />
          </Col>
          <Col xs={24} lg={12} data-aos="fade-left">
            <Space>
              <LightBulbIcon />
              <Text>Узнай что ты можешь</Text>
            </Space>
            <Title>Ваши возможности на платформе</Title>
            <Paragraph type="secondary">
              Став участником платформы, вы можете{" "}
              <Text style={{ color: "#05161D" }}>публиковать свои книги</Text>{" "}
              для их дальнейшей продажи на данной платформе, возможно вы
              писатель и хотите поделиться своими произведениями, тогда вы в
              нужном месте.
            </Paragraph>
            <Paragraph type="secondary">
              Так же эта платформа дает вам возможность покупать книги
              <Text style={{ color: "#05161D" }}>
                дешевле чем в каком-либо интернет-магазине
              </Text>{" "}
              , а покупая их здесь, вы так же{" "}
              <Text style={{ color: "#05161D" }}>
                участвуете в сбережении природных ресурсов
              </Text>
              , ведь все мы знаем что на печать новых изданий требуются
              природные ресурсы и все что вам необходимо, это просто
              присоединиться к нам.
            </Paragraph>
          </Col>
        </Row>
        {/* Rotate book / Your opportunities */}

        {/* Books */}
        {/* <Row> */}
        <div style={{ margin: "100px 0" }}>
          <Space direction="vertical">
            <Text style={{ color: "#01504D" }}>Новинки</Text>

            <Title>Новые пополнения книг</Title>
          </Space>

          <BooksSlider>
            {books.map((book) => (
              <div key={book.id}>
                <BookCard book={book} />
              </div>
            ))}
          </BooksSlider>

          <div className="" style={{ textAlign: "center", margin: " 60px 0" }}>
            <Text type="secondary" style={{ fontSize: "16px" }}>
              Хотите чтобы ваша книга тоже была здесь? Тогда нажмите{" "}
              <Link style={{ color: "#01504D" }}>добавить свою книгу</Link>
            </Text>
          </div>
          {/* </Row> */}
        </div>
        {/* Books */}

        {/* Subscribe */}
        <SubscribeCard />
        {/* Subscribe */}
      </Content>
      {/* Footer */}
      <FooterComponent />
      {/* Footer */}
    </AppLayout>
  );
};

export const getStaticProps = async ({ params }) => {
  console.log("params", params);
  try {
    // // Run API calls in parallel
    const [books, categories] = await Promise.all([
      getBooks(),
      getCategories(),
    ]);
    console.log("books", books.data);
    return { props: { books: books.data, categories: categories.data } };
  } catch (error) {
    console.log("error", error);
    return { props: { error } };
  }
};

export default Home;
