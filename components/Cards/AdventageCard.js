import { Col } from "antd";
import Title from "antd/lib/typography/Title";
import { HandHeartIcon } from "components/Icons/HandHeartIcon";

const AdventageCard = ({
  title = "Hello",
  titleLevel = 4,
  IconComponent = HandHeartIcon,
  xs = 22,
  lg = 8,
}) => {
  return (
    <Col
      xs={xs}
      lg={lg}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 120px",
        textAlign: "center",
      }}
    >
      <IconComponent style={{ fontSize: "50px" }} />
      <Title level={titleLevel}>{title}</Title>
    </Col>
  );
};

export default AdventageCard;
