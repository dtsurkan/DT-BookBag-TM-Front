import { Form } from 'antd';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import MainInput from 'components/DataEntry/MainInput';
import MainSpinner from 'components/Loading/Spinners/MainSpinner';

const ForgotPasswordForm = ({ btnText = '', isLoadingAuth, onFinish = () => {} }) => {
  return (
    <>
      <Form onFinish={onFinish} size="large">
        <MainInput
          lg={24}
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
          placeholder="components:data-entries.email-placeholder"
        />
        <Form.Item>
          <MainSpinner spinning={isLoadingAuth}>
            <PrimaryButton btnText={btnText} />
          </MainSpinner>
        </Form.Item>
      </Form>
    </>
  );
};

export default ForgotPasswordForm;
