import { Col } from 'antd';
import Title from 'antd/lib/typography/Title';
import HandHeartIcon from 'components/Icons/HandHeartIcon';
import useStyles from '../styles';

const AdventageCard = ({
  title = 'Hello',
  titleLevel = 4,
  IconComponent = HandHeartIcon,
  xs = 24,
  sm = 24,
  md,
  lg = 12,
  xl = 6,
  xxl = 8,
  ...props
}) => {
  const classes = useStyles();
  return (
    <Col
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      xxl={xxl}
      className={classes.advantagesCard}
      {...props}
    >
      <IconComponent style={{ fontSize: '50px' }} />
      <Title level={titleLevel} style={{ marginBottom: 0 }}>
        {title}
      </Title>
    </Col>
  );
};

export default AdventageCard;
