import { Row, Col, Space } from 'antd';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import classNames from 'classnames';
import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import { LightBulbIcon } from 'components/Icons';
import LottieComponent from 'components/Lottie/LottieComponent';
import rotateBook from 'lotties/rotate-book.json';
import classes from 'styles/scss/pages/home.module.scss';

const Opportunities = () => {
  const { t } = useTranslation();
  return (
    <Row className={classNames(classes.opportunities)}>
      <Col xs={24} lg={12} data-aos="fade-right">
        <LottieComponent animationData={rotateBook} loop={3} />
      </Col>
      <Col xs={24} lg={12} data-aos="fade-left">
        <Space>
          <LightBulbIcon />
          <Text>{t('index:opportunities.suptitle')}</Text>
        </Space>
        <Title>{t('index:opportunities.title')}</Title>
        <Trans
          i18nKey="index:opportunities.first-paragraph"
          components={[
            <Paragraph key="0" type="secondary" />,
            <Text key="0" style={{ color: '#05161D' }} />,
          ]}
        />
        <Trans
          i18nKey="index:opportunities.second-paragraph"
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
