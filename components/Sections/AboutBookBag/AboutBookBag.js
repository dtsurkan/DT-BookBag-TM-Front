import Image from 'next/image';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import { Col, Layout, Row, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import AboutImg from 'public/assets/about.png';

const useStyles = createUseStyles((theme) => ({
  about: {
    background: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aboutDescription: {
    margin: '25px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paddings: {
    padding: '0 40px',
  },
  [theme.breakpoints.down(theme.breakpoints.md)]: {
    paddings: {
      padding: '0px',
    },
  },
}));

const AboutBookBag = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Layout className={classes.about}>
      <Row>
        <Col xs={24} lg={8} className={classes.aboutDescription} data-aos="fade-right">
          <Space direction="vertical">
            <Title level={5}>
              Hi!{' '}
              <span role="img" aria-label="cheerful">
                😉
              </span>
            </Title>
            <Title level={1}>{t('components:about.title')}</Title>
            <Title>{t('components:about.feedback-numbers')}</Title>
            <Text>{t('components:about.feedback-text')}</Text>
          </Space>
        </Col>
        <Col xs={24} lg={8} style={{ margin: '30px 0' }} data-aos="zoom-in">
          <Image
            src={AboutImg}
            layout="responsive"
            quality={100}
            placeholder="blur"
            priority={true}
          />
        </Col>
        <Col
          xs={24}
          lg={8}
          className={classNames(classes.aboutDescription, classes.paddings)}
          data-aos="fade-left"
        >
          <Space direction="vertical">
            <Text type="secondary">{t('components:about.first-paragraph')}</Text>
            <Text type="secondary">{t('components:about.second-paragraph')}</Text>
          </Space>
        </Col>
      </Row>
    </Layout>
  );
};

export default AboutBookBag;
