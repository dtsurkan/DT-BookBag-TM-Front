import { Col, Row } from "antd";
import Title from "antd/lib/typography/Title";

const DescriptionItem = ({
  title = "Автор",
  titleLevel = 4,
  titleType = "secondary",
  description = "",
  descriptionLevel = 4,
  descriptionStyle = { maxWidth: 500 },
  isEllipsis = false,
}) => {
  return (
    <Row justify="space-between" style={{ margin: "30px 0" }}>
      <Col>
        <Title type={titleType} level={titleLevel}>
          {title}
        </Title>
      </Col>
      <Col>
        <Title
          style={descriptionStyle}
          level={descriptionLevel}
          ellipsis={
            isEllipsis && {
              rows: 1,
              tooltip: description,
            }
          }
        >
          {description}
        </Title>
      </Col>
    </Row>
  );
};

export default DescriptionItem;
