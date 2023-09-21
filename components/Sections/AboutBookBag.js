import Image from 'next/image';
import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import { Col, Layout, Row, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import classes from 'styles/scss/pages/about.module.scss';

const AboutBookBag = () => {
  const { t } = useTranslation();
  return (
    <Layout className={classes.about}>
      <Row>
        <Col xs={24} lg={8} className={classes.about__description}>
          <Space direction="vertical">
            <Title level={5}>
              Hi!{' '}
              <span role="img" aria-label="cheerful">
                😉
              </span>
            </Title>
            <Title level={1}>{t('about:title')}</Title>
            <Title>{t('about:feedback-numbers')}</Title>
            <Text>{t('about:feedback-text')}</Text>
          </Space>
        </Col>
        <Col xs={24} lg={8} style={{ margin: '30px 0' }}>
          <Image
            src="/assets/about.png"
            width={500}
            height={500}
            layout="responsive"
            quality={100}
          />
        </Col>
        <Col xs={24} lg={8} className={classNames(classes.about__description, classes._paddings)}>
          <Space direction="vertical">
            <Text type="secondary">{t('about:first-paragraph')}</Text>
            <Text type="secondary">{t('about:second-paragraph')}</Text>
          </Space>
        </Col>
      </Row>
    </Layout>
  );
};

export default AboutBookBag;
