import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Col, Form, message, Modal, Row, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import MainInput from 'components/DataEntry/MainInput';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import MainSpinner from 'components/Loading/Spinners/MainSpinner';
import { updateBookStatus } from 'state/actions/user/profile';
import { checkErrorCode } from 'lib/strapi/shared/errors';
import { getUserByEmail } from 'lib/strapi/services/user';

const CheckUserModal = ({
  book = {},
  title = 'components:others.sell-book-title',
  btnText = 'components:buttons.sell',
  visible = true,
  size = 'large',
  onOk = () => {},
  onCancel = () => {},
  width = 1000,
  zIndex = 1020,
  initialValues = {},
  formName = 'email',
  forceRender = true,
  footer = null,
  destroyOnClose = true,
  maskClosable = false,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isProcessingBook, setIsProcessingBook] = useState(false);

  const onFinish = async ({ email }) => {
    if (email) {
      setIsProcessingBook(true);
      const response = await getUserByEmail(email);
      console.log(`response`, response);
      if (checkErrorCode(response.status)) {
        setIsProcessingBook(false);
        onCancel();
        message.error('Error');
      } else {
        if (!response.data.length) {
          message.info(t('components:messages.non-exist-email'));
        } else {
          await dispatch(updateBookStatus(t, profile.id, book, true, response.data[0].id));
          onCancel();
          // message.success(
          //   `Ви успішно продали книгу ${book.book_name.toUpperCase()} - користувачеві ${
          //     response.data[0].email
          //   }`
          // );
        }
        setIsProcessingBook(false);
        // onCancel();
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Modal
      width={width}
      zIndex={zIndex}
      title={t(title)}
      centered
      visible={visible}
      onOk={onOk}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={footer}
      destroyOnClose={destroyOnClose}
      maskClosable={maskClosable}
      // Warning: Instance created by useForm is not connect to any Form element. Forget to pass form prop?
      // Before Modal opens, children elements do not exist in the view. You can set forceRender on Modal to pre-render its children.
      forceRender={forceRender}
    >
      <MainSpinner spinning={isProcessingBook}>
        <Form
          initialValues={initialValues}
          form={form}
          size={size}
          name={formName}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Space direction="vertical" size="large">
            <Alert
              message={t('components:alerts.check-user.message')}
              type="warning"
              showIcon={true}
            />
            <Title level={4}>{t('components:others.check-user-modal-title')}</Title>
          </Space>
          <Row gutter={[0, 4]}>
            <MainInput
              lg={24}
              isTranslateRules={false}
              name="email"
              placeholder={profile.email}
              hasFeedback={true}
              rules={[
                {
                  required: true,
                  message: t('components:data-entries.email-buyer-error-required'),
                },
                {
                  type: 'email',
                  message: t('components:data-entries.email-error-valid'),
                },
                // checking by correct entered email
                // NOTE! Don't know how to merge validator and translation mixture.
                {
                  validator(_, value) {
                    if (!value || profile.email !== value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(t('components:data-entries.email-error-not-sell-yourself'))
                    );
                  },
                },
              ]}
            />
            <Col xs={24}>
              <Form.Item shouldUpdate style={{ margin: 0 }}>
                {({ isFieldsTouched, getFieldError }) => (
                  <Form.Item>
                    <PrimaryButton
                      btnText={btnText}
                      disabled={!isFieldsTouched(true) || getFieldError('email').length}
                    />
                  </Form.Item>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </MainSpinner>
    </Modal>
  );
};

export default CheckUserModal;
