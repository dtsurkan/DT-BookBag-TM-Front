import { useRouter } from "next/router";
import {
  Button,
  Col,
  PageHeader,
  Row,
  Layout,
  Form,
  Input,
  Divider,
} from "antd";
import Image from "next/image";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  GoogleOutlined,
  FacebookFilled,
} from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import Link from "antd/lib/typography/Link";

const Login = () => {
  const router = useRouter();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Row style={{ flex: "1" }}>
        <Col flex="auto">
          <PageHeader
            className="site-page-header"
            onBack={() => router.push("/")}
            title="BookBag"
          />

          <Row justify="center" align="middle" style={{ minHeight: "75%" }}>
            {/* <Col span={14}>
              <Title level={2}>Вход в аккаунт</Title>
            </Col> */}
            <Col xs={22} sm={14}>
              <Title level={2}>Вход в аккаунт</Title>
              <Form>
                <Form.Item name="username">
                  <Input size="large" placeholder="Введите ваш емейл" />
                </Form.Item>
                <div className="" style={{ textAlign: "end" }}>
                  <Form.Item name="password">
                    <Input.Password
                      size="large"
                      placeholder="Пароль"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                    />
                  </Form.Item>
                  <div className="div" style={{ margin: "5px" }}>
                    <Button type="link" style={{ padding: "0" }}>
                      Восстановить пароль?
                    </Button>
                  </div>
                </div>
                {/* <Form.Item>
                  <Button
                    danger
                    size="large"
                    type="primary"
                    htmlType="submit"
                    block
                  >
                    Войти в аккаунт
                  </Button>
                </Form.Item> */}
              </Form>

              <Divider style={{ borderColor: "black" }}>
                Или продолжить с
              </Divider>
              <div className="" style={{ display: "flex" }}>
                {/* <Space size="small"> */}
                <Button
                  type="primary"
                  icon={<FacebookFilled />}
                  style={{ height: "50px", marginRight: "5px" }}
                  block
                />
                <Button
                  icon={<GoogleOutlined />}
                  style={{ height: "50px", marginLeft: "5px" }}
                  block
                />
                {/* </Space> */}
              </div>
              <Title level={5} style={{ marginTop: "15px" }}>
                У вас еще нет аккаунта? Нажмите <Link>зарегистрироваться</Link>
              </Title>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          {/* <Image width="inherit" height="100%" src={book} /> */}
          {/* <img alt="book" src={book} height="100%" width="100%" /> */}
          <Image alt="bojllok" src="/static/book.jpg" layout="fill" />
        </Col>
      </Row>
    </Layout>
  );
};

export default Login;
