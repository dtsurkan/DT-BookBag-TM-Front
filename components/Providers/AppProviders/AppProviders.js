import AntdProvider from '../AntdProvider';
import NextAuthProvider from '../NextAuthProvider';
import SwrProvider from '../SwrProvider';
import ThemeProvider from '../ThemeProvider';

const AppProviders = ({ session, children }) => {
  return (
    <NextAuthProvider session={session}>
      <SwrProvider>
        <ThemeProvider>
          <AntdProvider>{children}</AntdProvider>
        </ThemeProvider>
      </SwrProvider>
    </NextAuthProvider>
  );
};

export default AppProviders;
