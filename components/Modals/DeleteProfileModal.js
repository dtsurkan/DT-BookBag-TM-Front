import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Col, Form, message, Modal, Row, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import MainInput from 'components/DataEntry/MainInput';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import MainSpinner from 'components/Loading/Spinners/MainSpinner';
import { deleteCurrentUserProfile } from 'state/actions/user/profile';
import { checkErrorCode } from 'lib/strapi/shared/errors';

const DeleteProfileModal = ({
  title = 'components:others.remove-profile-title',
  btnText = 'components:buttons.remove-profile',
  visible = true,
  size = 'large',
  onOk = () => {},
  onCancel = () => {},
  width = 1000,
  zIndex = 1020,
  initialValues = {},
  formName = 'deletion',
  forceRender = true,
  footer = null,
  destroyOnClose = true,
  maskClosable = false,
  client,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isProcessingBook, setIsProcessingBook] = useState(false);

  const onFinish = async ({ deletion }) => {
    if (deletion) {
      setIsProcessingBook(true);
      const response = await dispatch(deleteCurrentUserProfile(profile.id, profile.email, client));
      console.log(`response`, response);
      if (checkErrorCode(response.status)) {
        setIsProcessingBook(false);
        onCancel();
        message.error('Error');
      } else {
        setIsProcessingBook(false);
        onCancel();
        message.success(t('components:others.success-remove-profile-title'));
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
              message={t('components:alerts.delete-profile.message')}
              type="warning"
              showIcon={true}
            />
            <Title level={4} copyable={{ text: profile.email }}>
              {t('components:others.confirm-deletion-title', {
                profileEmail: profile.email,
              })}
            </Title>
          </Space>
          <Row gutter={[0, 4]}>
            <MainInput
              lg={24}
              name="deletion"
              placeholder="components:data-entries.email-placeholder"
              hasFeedback={true}
              isTranslateRules={false}
              rules={[
                {
                  required: true,
                  message: t('components:data-entries.email-custom-placeholder', {
                    profileEmail: profile.email,
                  }),
                },
                {
                  type: 'email',
                  message: t('components:data-entries.email-error-valid'),
                },
                // checking by correct entered email
                {
                  validator(_, value) {
                    if (!value || profile.email === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(t('components:data-entries.email-error-incorrect'))
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
                      disabled={!isFieldsTouched(true) || getFieldError('deletion').length}
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

export default DeleteProfileModal;
