import { Col } from "antd";
import Title from "antd/lib/typography/Title";
import { HandHeartIcon } from "components/Icons/HandHeartIcon";
import classes from "styles/scss/pages/home.module.scss";

const AdventageCard = ({
  title = "Hello",
  titleLevel = 4,
  IconComponent = HandHeartIcon,
  xs = 24,
  sm = 24,
  md,
  lg = 12,
  xxl = 8,
}) => {
  return (
    <Col
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xxl={xxl}
      className={classes.advantages__card}
    >
      <IconComponent style={{ fontSize: "50px" }} />
      <Title level={titleLevel} style={{ marginBottom: 0 }}>
        {title}
      </Title>
    </Col>
  );
};

export default AdventageCard;
