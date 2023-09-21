import { useSession } from 'next-auth/client';
import useTwilioClient from 'hooks/useTwilioClient';
import { Spin } from 'antd';

const NonAuth = ({ children }) => {
  const [session, loading] = useSession();
  // const hasUser = !!session?.user;
  console.log(`session.user`, session?.user);
  // Think about this position
  useTwilioClient(true);
  if (loading)
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

export default NonAuth;
