import { useRouter } from 'next/router';
import { Divider } from 'antd';
import Link from 'antd/lib/typography/Link';
import Text from 'antd/lib/typography/Text';
import Paragraph from 'antd/lib/typography/Paragraph';
import { GoogleIcon } from 'components/Icons';
import AuthProviderButton from 'components/Buttons/AuthProviderButton';
import classes from 'styles/scss/components/buttons.module.scss';
import { STRAPI_URL } from 'lib/constants';

const ContinueWithProviders = ({
  additionalText = ' У вас еще нет аккаунта? Нажмите ',
  linkText = 'зарегистрироваться',
  linkUrl = '/login',
}) => {
  const router = useRouter();
  const signInWithGoogle = () => {
    window.location.href = `${STRAPI_URL}/connect/google`;
  };
  const signInWithFacebook = () => {
    window.location.href = `${STRAPI_URL}/connect/facebook`;
  };
  return (
    <>
      <Divider style={{ margin: '15px 0 30px' }}>
        <Text type="secondary">Или продолжить</Text>
      </Divider>
      <div className="" style={{ display: 'flex', marginBottom: '50px' }}>
        <AuthProviderButton onClick={() => signInWithFacebook()} styles={classes.facebookBtn} />
        <AuthProviderButton icon={<GoogleIcon />} onClick={() => signInWithGoogle()} />
      </div>
      <Paragraph
        type="secondary"
        style={{
          fontWeight: 'normal',
          textAlign: 'center',
          fontSize: '16px',
        }}
      >
        {additionalText}{' '}
        <Link style={{ color: '#01504D' }} onClick={() => router.push(`${linkUrl}`)}>
          {linkText}
        </Link>
      </Paragraph>
    </>
  );
};

export default ContinueWithProviders;
