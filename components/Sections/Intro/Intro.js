import useTranslation from 'next-translate/useTranslation';
import { createUseStyles } from 'react-jss';
import { Col, Row, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Paragraph from 'antd/lib/typography/Paragraph';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import BotIcon from 'components/Icons/BotIcon';
import LottieComponent from 'components/Lottie';
import booksLottie from 'lotties/exchange-books.json';

const useStyles = createUseStyles((theme) => ({
  introSection: {
    minHeight: '90vh',
    background: theme.primaryColor,
  },
  addBookBtn: {},
  [theme.breakpoints.down(theme.breakpoints.xl)]: {
    introSection: {
      minHeight: '75vh',
    },
  },
  [theme.breakpoints.down(theme.breakpoints.sm)]: {
    addBookBtn: {
      width: '100%',
      margin: '36px 0',
    },
  },
}));

const Intro = ({ showModal = () => {} }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Row align="middle" className={classes.introSection}>
      <Col xs={24} lg={10} style={{ zIndex: 1, marginTop: '16px' }} data-aos="fade-right">
        <Space size="middle" direction="vertical">
          <Title style={{ color: '#01504D' }} level={3}>
            {t('components:intro.suptitle')}
          </Title>
          <Title level={2}>{t('components:intro.title')}</Title>
          <div style={{ maxWidth: '550px' }}>
            <Paragraph type="secondary">{t('components:intro.subtitle')}</Paragraph>
          </div>
          <PrimaryButton
            onClick={showModal}
            btnText="components:buttons.add-book"
            isBlock={false}
            className={classes.addBookBtn}
          />
        </Space>
      </Col>
      <Col xs={0} md={24} lg={14} data-aos="fade-left">
        <div>
          <LottieComponent animationData={booksLottie} />
        </div>
      </Col>
      <Col xs={24} style={{ alignSelf: 'flex-end' }} data-aos="fade-up">
        <Row align="middle" style={{ width: '100%' }}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Space>
              <BotIcon />
              <Text style={{ maxWidth: '150px' }}>{t('components:intro.facebook')}</Text>
            </Space>
          </Col>
          <Col
            xs={{ span: 24 }}
            lg={{ span: 12, pull: 6 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Space direction="vertical" align="center">
              <Text>{t('components:intro.arrow-text')}</Text>
              <DownOutlined />
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Intro;
