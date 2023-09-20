import AppProviders from "../components/Providers/AppProviders";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppProviders>
      <Component {...pageProps} />
    </AppProviders>
  );
}

export default MyApp;
