import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { Divider } from 'antd';
import Link from 'antd/lib/typography/Link';
import Text from 'antd/lib/typography/Text';
import Paragraph from 'antd/lib/typography/Paragraph';
import { GoogleIcon } from 'components/Icons';
import AuthProviderButton from 'components/Buttons/AuthProviderButton';
import classes from 'styles/scss/components/buttons.module.scss';
import { STRAPI_URL } from 'lib/constants';

const ContinueWithProviders = ({
  additionalText = 'components:auth-providers.additional-login-text',
  linkText = 'components:buttons.register',
  linkUrl = '/login',
}) => {
  const { t } = useTranslation();
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
        <Text type="secondary">{t('components:auth-providers.divider-text')}</Text>
      </Divider>
      <div style={{ display: 'flex', marginBottom: '50px' }}>
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
        {t(additionalText)}{' '}
        <Link
          style={{ color: '#01504D', textTransform: 'lowercase' }}
          onClick={() => router.push(`${linkUrl}`)}
        >
          {t(linkText)}
        </Link>
      </Paragraph>
    </>
  );
};

export default ContinueWithProviders;
