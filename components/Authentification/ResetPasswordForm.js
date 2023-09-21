import { Form, Input } from 'antd';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import MainSpinner from 'components/Loading/Spinners/MainSpinner';

const ResetPasswordForm = ({ btnText = '', isLoadingAuth, onFinish = () => {} }) => {
  return (
    <>
      <Form onFinish={onFinish} size="large">
        <Form.Item
          hasFeedback
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password allowClear placeholder="Введите ваш пароль" />
        </Form.Item>
        <Form.Item
          name="passwordConfirmation"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password allowClear placeholder="Повторите ваш пароль" />
        </Form.Item>
        <Form.Item>
          <MainSpinner spinning={isLoadingAuth}>
            <PrimaryButton btnText={btnText} />
          </MainSpinner>
        </Form.Item>
      </Form>
    </>
  );
};

export default ResetPasswordForm;
