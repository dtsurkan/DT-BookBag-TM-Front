import { useEffect } from 'react';
import useTwilioClient from 'hooks/useTwilioClient';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { message, Spin } from 'antd';
import useTranslation from 'next-translate/useTranslation';

const AuthWrapper = ({ children }) => {
  const [session, loading] = useSession();
  const { t } = useTranslation();
  const router = useRouter();
  const hasUser = !!session?.user;
  console.log(`session.user`, session?.user);
  useTwilioClient(true);
  useEffect(() => {
    // if (loading) return; // Do nothing while loading
    if (!loading && !hasUser) {
      message.info(t('components:auth.required-auth-title'));
      router.push('/auth/login');
    } // If not authenticated, force log in
  }, [hasUser, loading, router, t]);

  if (loading || !hasUser)
    return (
      <div
        style={{
          minWidth: '100vw',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spin size="large" tip="Loading" />
      </div>
    );

  return children;
};

export default AuthWrapper;
