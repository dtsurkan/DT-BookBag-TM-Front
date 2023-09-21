import { Provider as AuthProvider } from 'next-auth/client';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const NextAuthProvider = ({ session, children }) => {
  return (
    <AuthProvider options={publicRuntimeConfig.authProvider} session={session}>
      {children}
    </AuthProvider>
  );
};

export default NextAuthProvider;
