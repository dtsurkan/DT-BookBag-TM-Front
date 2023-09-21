import Image from 'next/image';
import { createUseStyles } from 'react-jss';
import { Col, Row, Layout } from 'antd';
import PageHeaderLogo from 'components/Layout/PageHeaderLogo';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import SignUpImg from 'public/assets/signup.png';

const useStyles = createUseStyles({
  layout: {
    minHeight: '100vh',
  },
  row: {
    flexDirection: 'column',
    minHeight: '100%',
  },
  designerLink: {
    position: 'absolute',
    bottom: '30px',
    right: '80px',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    color: 'white',
    opacity: 0.6,
  },
});

const AuthentificationContainer = ({ children, srcImage = SignUpImg, alt = 'Sign Up Image' }) => {
  const classes = useStyles();
  return (
    <Layout className={classes.layout}>
      <Row style={{ flex: 1 }}>
        <Col xs={24} xl={12} data-aos="fade-right" data-aos-duration="500">
          <Row className={classes.row}>
            <Col flex={0} xs={24} sm={6}>
              <PageHeaderLogo isBackIcon />
            </Col>
            <Col flex={5} style={{ display: 'flex' }}>
              {children}
            </Col>
          </Row>
        </Col>
        <Col xs={0} xl={12} data-aos="fade-left" data-aos-duration="500">
          <Image
            alt={alt}
            src={srcImage}
            layout="fill"
            placeholder="blur"
            priority={true}
            quality={100}
          />
          <PrimaryButton
            size="middle"
            isBlock={false}
            type="link"
            btnText="components:buttons.designer"
            extraClassNames={classes.designerLink}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default AuthentificationContainer;
