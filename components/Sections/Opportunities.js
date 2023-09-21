import { Row, Col, Space } from "antd";
import classNames from "classnames";
import Paragraph from "antd/lib/typography/Paragraph";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import { LightBulbIcon } from "components/Icons";
import LottieComponent from "components/Lottie/LottieComponent";
import rotateBook from "lotties/rotate-book.json";
import classes from "styles/scss/pages/home.module.scss";

const Opportunities = () => {
  return (
    <Row className={classNames(classes.opportunities)}>
      <Col xs={24} lg={12} data-aos="fade-right">
        <LottieComponent animationData={rotateBook} loop={3} />
      </Col>
      <Col xs={24} lg={12} data-aos="fade-left">
        <Space>
          <LightBulbIcon />
          <Text>Узнай что ты можешь</Text>
        </Space>
        <Title>Ваши возможности на платформе</Title>
        <Paragraph type="secondary">
          Став участником платформы, вы можете{" "}
          <Text style={{ color: "#05161D" }}>публиковать свои книги</Text> для
          их дальнейшей продажи на данной платформе, возможно вы писатель и
          хотите поделиться своими произведениями, тогда вы в нужном месте.
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
          , ведь все мы знаем что на печать новых изданий требуются природные
          ресурсы и все что вам необходимо, это просто присоединиться к нам.
        </Paragraph>
      </Col>
    </Row>
  );
};

export default Opportunities;
