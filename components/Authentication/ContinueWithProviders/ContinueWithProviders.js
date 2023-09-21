import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';
import useTranslation from 'next-translate/useTranslation';
import { Divider } from 'antd';
import Link from 'antd/lib/typography/Link';
import Text from 'antd/lib/typography/Text';
import Paragraph from 'antd/lib/typography/Paragraph';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import GoogleIcon from 'components/Icons/GoogleIcon';
import FacebookIcon from 'components/Icons/FacebookIcon';
import * as ga from 'lib/google/analytics';

const ContinueWithProviders = ({
  additionalText = 'components:auth-providers.additional-login-text',
  linkText = 'components:buttons.register',
  linkUrl = '/auth/login',
  providers = {},
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <>
      <Divider style={{ margin: '15px 0 30px' }}>
        <Text type="secondary">{t('components:auth-providers.divider-text')}</Text>
      </Divider>
      <div style={{ display: 'flex', marginBottom: '50px' }}>
        {Object.values(providers).map((provider) => {
          switch (provider.id) {
            case 'google':
              return (
                <Fragment key={provider.name}>
                  <PrimaryButton
                    size="middle"
                    type="default"
                    onClick={(event) => {
                      event.preventDefault();
                      signIn(provider.id, { callbackUrl: '/' });
                      ga.event({
                        action: 'login',
                        params: {
                          event_category: 'access',
                          event_label: 'google-login',
                        },
                      });
                    }}
                    icon={<GoogleIcon />}
                    providerType="google"
                    btnText="components:empty.empty-string"
                  />
                </Fragment>
              );
            case 'facebook':
              return (
                <Fragment key={provider.name}>
                  <PrimaryButton
                    size="middle"
                    type="default"
                    onClick={(event) => {
                      event.preventDefault();
                      signIn(provider.id, { callbackUrl: '/' });
                      ga.event({
                        action: 'login',
                        params: {
                          event_category: 'access',
                          event_label: 'facebook-login',
                        },
                      });
                    }}
                    icon={<FacebookIcon />}
                    providerType="facebook"
                    btnText="components:empty.empty-string"
                  />
                </Fragment>
              );
            default:
              break;
          }
        })}
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
