import { useState } from 'react';
import { Col, Form, message, Row } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import { MailOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import MainSpinner from 'components/Loading/Spinners/MainSpinner';
import MainInput from 'components/DataEntry/MainInput';
import { subscribeOnNewBooks } from 'lib/strapi/services/subscriptions';
import { checkErrorCode } from 'lib/strapi/shared/errors';
import classes from 'styles/scss/pages/home.module.scss';

const Subscribe = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [IsLoadingSubscribing, setIsLoadingSubscribing] = useState(false);
  const onFinish = async (values) => {
    setIsLoadingSubscribing(true);
    const response = await subscribeOnNewBooks(values);
    // console.log(`response`, response);
    if (checkErrorCode(response.status)) {
      message.error(t('index:subscribe.error-subscribing'));
    } else {
      message.success(t('index:subscribe.success-subscribing'));
      form.resetFields();
    }
    setIsLoadingSubscribing(false);
  };

  return (
    <Row className={classes.subscribe}>
      <Col xs={24} sm={20} lg={24} className={classes.subscribe__col}>
        <div className={classes.subscribe__wrapper}>
          <Title level={4} style={{ color: '#01504D' }}>
            {t('index:subscribe.suptitle')}
          </Title>
          <Title className={classes.subscribe__wrapper__title}>{t('index:subscribe.title')}</Title>
          <Form form={form} onFinish={onFinish} size="large" className={classes.subscribe__form}>
            <MainInput
              hasFeedback={true}
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'components:data-entries.email-error-valid',
                },
                {
                  required: true,
                  message: 'components:data-entries.email-error-required',
                },
              ]}
              prefix={
                <MailOutlined type="secondary" style={{ marginRight: '5px', color: '#8D9DA4' }} />
              }
              allowClear
              placeholder="components:data-entries.email-placeholder"
            />

            <Form.Item style={{ marginLeft: '15px' }} className={classes.subscribe__form__btn}>
              <MainSpinner spinning={IsLoadingSubscribing}>
                <PrimaryButton btnText="components:buttons.subscribe" />
              </MainSpinner>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Subscribe;
