import { Col, Form, Input, Row } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import MainSpinner from 'components/Loading/Spinners/MainSpinner';
import classes from 'styles/scss/pages/home.module.scss';

const Subscribe = () => {
  return (
    <Row className={classes.subscribe}>
      <Col xs={24} sm={20} lg={24} className={classes.subscribe__col}>
        <div className={classes.subscribe__wrapper}>
          <Title level={4} style={{ color: '#01504D' }}>
            Подписка на уведомления
          </Title>
          <Title className={classes.subscribe__wrapper__title}>
            Подписывайся и получай первым уведомления о публикации новых книг
          </Title>
          <Form size="large" className={classes.subscribe__form}>
            <Form.Item
              className={classes.subscribe__form__input}
              hasFeedback
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input
                prefix={
                  <MailOutlined type="secondary" style={{ marginRight: '5px', color: '#8D9DA4' }} />
                }
                allowClear
                placeholder="Адрес электронной почты..."
              />
            </Form.Item>
            <Form.Item className={classes.subscribe__form__btn}>
              <MainSpinner>
                <PrimaryButton btnText="Подписаться" />
              </MainSpinner>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Subscribe;
