import { useEffect } from "react";
import { Router, useRouter } from "next/router";
import AppProviders from "components/Providers/AppProviders";
import Auth from "components/Routing/Auth";
import NProgress from "nprogress"; //nprogress module
import AOS from "aos";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "aos/dist/aos.css";
import "nprogress/nprogress.css"; //styles of nprogress
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "styles/css/globals.css";
import "styles/scss/main.scss";
//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.asPath]);
  return (
    <AppProviders>
      {/* {pageProps.error ? (
        <Error
          statusCode={pageProps.error.statusCode}
          title={pageProps.error.message}
        />
      ) : (
        <Component {...pageProps} />
      )} */}
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </AppProviders>
  );
}

export default MyApp;
