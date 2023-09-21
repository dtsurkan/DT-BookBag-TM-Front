import { useMediaQuery } from 'react-responsive';
import { Col, Row } from 'antd';
import DesktopHeader from 'components/Navigation/components/DesktopHeader';
import ProfileAsideMenu from 'components/Navigation/ProfileAsideMenu';
import AppLayout from './AppLayout';

const ProfileLayout = ({ children }) => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1200 });

  return (
    <AppLayout isHasNavigation={false} isHasFooter={false}>
      <Row justify="center">
        <ProfileAsideMenu />
        <Col
          xs={24}
          lg={18}
          style={{
            minHeight: '100vh',
            background: '#F9FEFD',
            padding: '30px',
          }}
        >
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
          {children}
        </Col>
      </Row>
    </AppLayout>
  );
};

export default ProfileLayout;
