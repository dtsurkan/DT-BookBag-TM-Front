import { Col, Row, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import PrimaryButton from "components/Buttons/PrimaryButton";
import { BotIcon } from "components/Icons";
import LottieComponent from "components/Lottie/LottieComponent";
import booksLottie from "lotties/books.json";

const Intro = ({ showModal = () => {} }) => {
  return (
    <Row align="middle" style={{ minHeight: "90vh" }}>
      <Col xs={24} md={10} style={{ zIndex: 1, marginTop: "16px" }}>
        <Space size="middle" direction="vertical">
          <Title style={{ color: "#01504D" }} level={3}>
            Добро пожаловать!
          </Title>
          <Title style={{ fontSize: "48px" }} level={1}>
            BookBag - платформа которая экономит ваши деньги и природные ресурсы
          </Title>
          <div className="" style={{ maxWidth: "550px" }}>
            <Paragraph type="secondary">
              Регистрируйся и переходы к покупке своих любимых книг по вигодной
              цене, а если ты писатель, то спеши поделиться своим творчеством с
              людьми.
            </Paragraph>
          </div>
          <PrimaryButton
            onClick={showModal}
            btnText="Добавить книгу"
            isBlock={false}
            style={{ marginTop: "30px" }}
          />
        </Space>
      </Col>
      <Col xs={0} lg={14}>
        <div>
          <LottieComponent
            animationData={booksLottie}
            loop={false}
            styles={{ transform: "translate3d(-40px, 0px,0px)" }}
          />
        </div>
      </Col>
      <Col xs={24} style={{ alignSelf: "flex-end" }}>
        <Row align="middle" style={{ width: "100%" }}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Space>
              <BotIcon />
              <Text style={{ maxWidth: "150px" }}>
                Facebook бот - ваш надежний помощник
              </Text>
            </Space>
          </Col>
          <Col
            xs={{ span: 24 }}
            lg={{ span: 12, pull: 6 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Space direction="vertical" align="center">
              <Text>Вниз</Text>
              <DownOutlined />
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Intro;
