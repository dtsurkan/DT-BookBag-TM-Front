import Image from "next/image";
import { Col, Row, Layout, Button } from "antd";
import PageHeaderLogo from "components/Logo/PageHeaderLogo";

const AuthentificationContainer = ({
  children,
  srcImage = "/assets/signup.png",
  alt = "Sign Up Image",
}) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Row style={{ flex: 1 }}>
        <Col xs={24} xl={12}>
          <Row style={{ flexDirection: "column", minHeight: "100%" }}>
            <Col flex={0} xs={24} sm={6}>
              <PageHeaderLogo isBackIcon />
            </Col>
            <Col flex={5} style={{ display: "flex" }}>
              {children}
            </Col>
          </Row>
        </Col>
        <Col xs={0} xl={12}>
          <Image alt={alt} src={srcImage} layout="fill" />
          <Button
            type="link"
            style={{
              position: "absolute",
              bottom: "30px",
              right: "80px",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              color: "white",
              opacity: 0.6,
            }}
          >
            Design by Aleh Klimchuk
          </Button>
        </Col>
      </Row>
    </Layout>
  );
};

export default AuthentificationContainer;
