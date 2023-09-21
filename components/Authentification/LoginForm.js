import { useRouter } from 'next/router';
import { Form, Input } from 'antd';
import Link from 'antd/lib/typography/Link';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import MainSpinner from 'components/Loading/Spinners/MainSpinner';

const LoginForm = ({ onFinish = () => {}, isLoadingAuth }) => {
  const router = useRouter();

  return (
    <>
      <Form onFinish={onFinish} size="large">
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
          <Input allowClear placeholder="Введите ваш емейл" />
        </Form.Item>
        <div className="">
          <Form.Item
            hasFeedback
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              allowClear
              placeholder="Пароль"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <div style={{ textAlign: 'end', margin: '5px 0' }}>
            <Link onClick={() => router.push('/forgot-password')} type="secondary">
              Восстановить пароль?
            </Link>
          </div>
        </div>
        <Form.Item>
          <MainSpinner spinning={isLoadingAuth}>
            <PrimaryButton />
          </MainSpinner>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
