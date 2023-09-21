import { Form } from 'antd';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import MainSpinner from 'components/Loading/Spinners/MainSpinner';
import MainInputPassword from 'components/DataEntry/MainInputPassword';
import MainInput from 'components/DataEntry/MainInput';

const RegisterForm = ({ onFinish = () => {}, isLoadingAuth }) => {
  return (
    <>
      <Form onFinish={onFinish} size="large">
        <MainInput
          lg={24}
          name="username"
          rules={[
            {
              required: true,
              message: 'components:data-entries.username-error-required',
            },
          ]}
          placeholder="components:data-entries.username-placeholder"
        />
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
        <MainInputPassword
          lg={24}
          name="password"
          rules={[{ required: true, message: 'components:data-entries.password-error-required' }]}
        />
        <Form.Item>
          <MainSpinner spinning={isLoadingAuth}>
            <PrimaryButton btnText="components:buttons.register" />
          </MainSpinner>
        </Form.Item>
      </Form>
    </>
  );
};

export default RegisterForm;
