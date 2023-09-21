import Head from "next/head";
import classNames from "classnames";
import Layout from "antd/lib/layout/layout";
import NavBar from "components/Navigation/NavBar";
import FooterComponent from "./Footer";
import classes from "styles/scss/layout/containers.module.scss";

const AppLayout = ({
  children,
  title = "BookBag",
  style = {},
  globalDivStyles = { background: "transparent" },
  isHasNavigation = true,
  isHasFooter = true,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Create Next App" key="title" />
        <meta
          name="description"
          content="Meta description content goes here."
        />
      </Head>
      <div style={globalDivStyles}>
        <Layout
          className={classNames(classes.container, classes.appLayout)}
          style={style}
        >
          {isHasNavigation && <NavBar />}
          {children}
          {isHasFooter && <FooterComponent />}
        </Layout>
      </div>
    </>
  );
};

export default AppLayout;
