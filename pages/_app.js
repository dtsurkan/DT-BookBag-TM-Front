import { useEffect } from 'react';
import { Router } from 'next/router';
// import { BackTop } from 'antd';
import * as ga from 'lib/google/analytics';
import AppProviders from 'components/Providers/AppProviders';
import AuthWrapper from 'components/Routing/AuthWrapper';
import NonAuthWrapper from 'components/Routing/NonAuthWrapper';
import { RESTRICTED_PATHS } from 'utils/constants';
import NProgress from 'nprogress'; //nprogress module
import AOS from 'aos';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import 'aos/dist/aos.css';
import 'nprogress/nprogress.css'; //styles of nprogress
import 'styles/css/slick.css';
import 'styles/css/slick-theme.css';

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    AOS.init({
      easing: 'ease-out-cubic',
      once: false,
      offset: 50,
      mirror: true,
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.asPath]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const style = document.getElementById('server-side-styles');
    if (style) {
      style.parentNode.removeChild(style);
    }
  }, []);
  const protectedPath = RESTRICTED_PATHS.find((path) => path.route === router.pathname);

  return (
    <AppProviders session={pageProps.session}>
      {protectedPath ? (
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      ) : (
        <NonAuthWrapper>
          <Component {...pageProps} />
        </NonAuthWrapper>
      )}
    </AppProviders>
  );
}

export default MyApp;
