import { useState } from 'react';
import { Col, Form, message, Row } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import { MailOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import MainSpinner from 'components/Loading/Spinners/MainSpinner';
import MainInput from 'components/DataEntries/Main/MainInput';
import { createSubscriptionOnNewBooks } from 'lib/strapi/services/subscriptions';
import { checkErrorCode } from 'lib/strapi/shared/errors';
import useStyles from './styles';

const Subscribe = () => {
  const classes = useStyles();
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [IsLoadingSubscribing, setIsLoadingSubscribing] = useState(false);
  const onFinish = async (values) => {
    setIsLoadingSubscribing(true);
    const response = await createSubscriptionOnNewBooks(values);
    // console.log(`response`, response);
    if (checkErrorCode(response.status)) {
      message.error(t('components:subscribe.error-subscribing'));
    } else {
      message.success(t('components:subscribe.success-subscribing'));
      form.resetFields();
    }
    setIsLoadingSubscribing(false);
  };

  return (
    <Row className={classes.subscribe}>
      <Col xs={24} sm={20} lg={24} className={classes.subscribeCol}>
        <div className={classes.subscribeWrapper}>
          <Title level={4} style={{ color: '#01504D' }} data-aos="zoom-in">
            {t('components:subscribe.suptitle')}
          </Title>
          <Title className={classes.subscribeWrapperTitle} data-aos="zoom-in">
            {t('components:subscribe.title')}
          </Title>
          <Form
            form={form}
            onFinish={onFinish}
            size="large"
            className={classes.subscribeForm}
            data-aos="zoom-in"
          >
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

            <Form.Item className={classes.subscribeFormBtn}>
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
