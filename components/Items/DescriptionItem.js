import useTranslation from 'next-translate/useTranslation';
import { Col, Row } from 'antd';
import Title from 'antd/lib/typography/Title';

const DescriptionItem = ({
  title = 'components:cards.description.author',
  titleLevel = 4,
  titleType = 'secondary',
  description = '',
  descriptionLevel = 4,
  descriptionStyle = { maxWidth: 500 },
  isEllipsis = false,
  wrap = false,
  rowStyle = { margin: '30px 0' },
  copyable = false,
}) => {
  const { t } = useTranslation();
  return (
    <Row justify="space-between" wrap={wrap} style={rowStyle}>
      <Col>
        <Title type={titleType} level={titleLevel} style={{ marginRight: '30px' }}>
          {t(title)}
        </Title>
      </Col>
      <Col>
        <Title
          style={descriptionStyle}
          level={descriptionLevel}
          copyable={copyable}
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
