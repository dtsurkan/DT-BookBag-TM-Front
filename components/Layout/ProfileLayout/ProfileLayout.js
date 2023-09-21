import { useMediaQuery } from 'react-responsive';
import { Col, Row } from 'antd';
import { useTheme } from 'react-jss';
import DesktopHeader from 'components/Navigation/Desktop/DesktopHeader';
import ProfileAsideMenu from 'components/Navigation/ProfileAsideMenu';
import AppLayout from '../AppLayout';
import useStyles from './styles';

const ProfileLayout = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery({ maxWidth: theme.breakpoints.xl });
  return (
    <AppLayout isHasNavigation={false} isHasFooter={false}>
      <Row justify="center">
        <ProfileAsideMenu />
        <Col xs={24} md={20} xl={18} className={classes.profileHeaderBox}>
          {isTabletOrMobile ? null : (
            <DesktopHeader
              hasLogo={false}
              hasProfile={false}
              headerStyles={{
                padding: '0px 0px',
                background: 'none',
                position: 'relative',
                width: '100%',
                minHeight: 'initial',
              }}
            />
          )}
          <div data-aos="fade-left">{children}</div>
        </Col>
      </Row>
    </AppLayout>
  );
};

export default ProfileLayout;
