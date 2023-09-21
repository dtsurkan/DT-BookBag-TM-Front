import dynamic from 'next/dynamic';
import Head from 'next/head';
import classNames from 'classnames';
import Layout from 'antd/lib/layout/layout';
import NavBar from 'components/Navigation/NavBar';
const DynamicFooterComponent = dynamic(() => import('components/Layout/Footer'));
import useStyles from './styles';

const AppLayout = ({
  children,
  title = 'BookBag',
  style = {},
  globalDivStyles = { background: 'transparent' },
  isHasNavigation = true,
  isHasFooter = true,
}) => {
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Create Next App" key="title" />
        <meta name="description" content="Meta description content goes here." />
      </Head>
      <div style={globalDivStyles}>
        <Layout className={classNames(classes.container, classes.appLayout)} style={style}>
          {isHasNavigation && <NavBar />}
          {children}
          {isHasFooter && <DynamicFooterComponent />}
        </Layout>
      </div>
    </>
  );
};

export default AppLayout;
