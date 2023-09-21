import { Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import MainSpinner from 'components/Loading/Spinners/MainSpinner';

const RegisterForm = ({ onFinish = () => {}, isLoadingAuth }) => {
  return (
    <>
      <Form onFinish={onFinish} size="large">
        <Form.Item
          hasFeedback
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input placeholder="Введите логин" />
        </Form.Item>
        <Form.Item
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
          <Input placeholder="Введите ваш емейл" />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password
            placeholder="Пароль"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item>
          <MainSpinner spinning={isLoadingAuth}>
            <PrimaryButton btnText="Зарегистрироваться" />
          </MainSpinner>
        </Form.Item>
      </Form>
    </>
  );
};

export default RegisterForm;
