import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { Form } from 'antd';
import Link from 'antd/lib/typography/Link';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import MainSpinner from 'components/Loading/Spinners/MainSpinner';
import MainInput from 'components/DataEntry/MainInput';
import MainInputPassword from 'components/DataEntry/MainInputPassword';

const LoginForm = ({ onFinish = () => {}, isLoadingAuth }) => {
  const router = useRouter();
  const { t } = useTranslation();
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
        <div>
          <MainInputPassword
            lg={24}
            name="password"
            rules={[{ required: true, message: 'components:data-entries.password-error-required' }]}
          />
          <div style={{ textAlign: 'end', margin: '5px 0' }}>
            <Link onClick={() => router.push('/forgot-password')} type="secondary">
              {t('components:buttons.forgot-password-link')}
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
