import Image from 'next/image';
import classNames from 'classnames';
import { Col, Layout, Row, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import classes from 'styles/scss/pages/about.module.scss';

const AboutBookBag = () => {
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
            <Title level={1}>О BookBag</Title>

            <Title>100 K +</Title>
            <Text>Отзывов от наших пользователей</Text>
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
            <Text type="secondary">
              Платформа BookBag- создавалась нашей талантливой креативной командой для людей которые
              ценят свои деньги и экологию.
            </Text>
            <Text type="secondary">
              Основана платформа в 2021 году и за этот небольшой срок мы уже получили сотни тысяч
              отзывов от наших пользователей, а так это лучшая и единственная платформа в Украине.
            </Text>
          </Space>
        </Col>
      </Row>
    </Layout>
  );
};

export default AboutBookBag;
