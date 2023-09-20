import { MailOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row } from "antd";
import Title from "antd/lib/typography/Title";
import PrimaryButton from "components/Buttons/PrimaryButton";
import MainSpinner from "components/Loading/Spinners/MainSpinner";
import classes from "styles/scss/components/sections.module.scss";

const SubscribeCard = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "600px", background: "#F9FEFD" }}
    >
      <Col
        xs={24}
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className={classes.subscribeSectionWrapper}>
          <Title level={4} style={{ color: "#01504D" }}>
            Подписка на уведомления
          </Title>
          <Title className={classes.subscribeSectionTitle}>
            Подписывайся и получай первым уведомления о публикации новых книг
          </Title>
          {/* <Space> */}
          <Form size="large" className={classes.subscribeSectionForm}>
            {/* <Space> */}
            <Form.Item
              className={classes.subscribeSectionFormInput}
              hasFeedback
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input
                prefix={
                  <MailOutlined
                    type="secondary"
                    style={{ marginRight: "5px", color: "#8D9DA4" }}
                  />
                }
                allowClear
                placeholder="Адрес электронной почты..."
              />
            </Form.Item>
            <Form.Item className={classes.subscribeSectionFormBtn}>
              <MainSpinner>
                <PrimaryButton btnText="Подписаться" />
              </MainSpinner>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default SubscribeCard;
