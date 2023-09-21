import { Row, Col, Space } from 'antd';
import { createUseStyles } from 'react-jss';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import classNames from 'classnames';
import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import LightBulbIcon from 'components/Icons/LightBulbIcon';
import LottieComponent from 'components/Lottie';
import rotateBook from 'lotties/test-second.json';

const useStyles = createUseStyles((theme) => ({
  opportunities: {
    minHeight: '70vh',
    position: 'relative',
    alignItems: 'center',
    '&:after': {
      content: '""',
      position: 'absolute',
      background: '#f9fefd',
      width: '100%',
      height: '100%',
      left: '0',
      zIndex: -1,
    },
  },
  [theme.breakpoints.down(theme.breakpoints.lg)]: {
    opportunities: {
      flexDirection: 'column-reverse',
    },
  },
}));

const Opportunities = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Row className={classNames(classes.opportunities)}>
      <Col xs={24} lg={12} data-aos="fade-right">
        <LottieComponent animationData={rotateBook} />
      </Col>
      <Col xs={24} lg={12} data-aos="fade-left">
        <Space>
          <LightBulbIcon />
          <Text>{t('components:opportunities.suptitle')}</Text>
        </Space>
        <Title>{t('components:opportunities.title')}</Title>
        <Trans
          i18nKey="components:opportunities.first-paragraph"
          components={[
            <Paragraph key="0" type="secondary" />,
            <Text key="0" style={{ color: '#05161D' }} />,
          ]}
        />
        <Trans
          i18nKey="components:opportunities.second-paragraph"
          components={[
            <Paragraph key="0" type="secondary" />,
            <Text key="1" style={{ color: '#05161D' }} />,
          ]}
        />
      </Col>
    </Row>
  );
};

export default Opportunities;
