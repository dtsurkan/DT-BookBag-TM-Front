import { Button, Col, List, Row } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { Footer } from "antd/lib/layout/layout";
import Text from "antd/lib/typography/Text";
import PageHeaderLogo from "components/Logo/PageHeaderLogo";

const FooterComponent = () => {
  const getYear = () => new Date().getFullYear();
  const screens = useBreakpoint();

  return (
    <Footer style={{ background: "transparent", padding: "100px 0" }}>
      <Row align="middle">
        <Col xs={24} lg={16}>
          <PageHeaderLogo style={{ padding: "16px 0" }} />
          {screens.lg && <Text>BookBag &copy; {getYear()}</Text>}
        </Col>
        <Col
          xs={24}
          lg={8}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <List
            split={false}
            size="large"
            dataSource={[
              { title: "Книги" },
              { title: "O BookBag" },
              { title: "Оплата / Доставка" },
            ]}
            renderItem={({ title }) => (
              <List.Item style={{ padding: "8px 0" }}>
                <Button type="link" style={{ padding: 0 }}>
                  {title}
                </Button>
              </List.Item>
            )}
          />
          <List
            split={false}
            size="large"
            dataSource={[
              { title: "+ 111 22 333 44 55" },
              { title: "BookBag@support.com" },
              { title: "Служба поддержки" },
            ]}
            renderItem={({ title }) => (
              <List.Item style={{ padding: "8px 0" }}>
                <Button type="link" style={{ padding: 0 }}>
                  {title}
                </Button>
              </List.Item>
            )}
          />
          {!screens.lg && (
            <Text style={{ width: "100%", marginTop: "16px" }}>
              BookBag &copy; {getYear()}
            </Text>
          )}
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterComponent;
