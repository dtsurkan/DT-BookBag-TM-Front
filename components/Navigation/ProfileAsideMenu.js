import { useShowConfigModal } from 'hooks';
import { useMediaQuery } from 'react-responsive';
import { Button, Col, Row, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import PageHeaderLogo from 'components/Logo/PageHeaderLogo';
import ConfigBookModal from 'components/Modals/ConfigBookModal';
import MobileHeader from './components/MobileHeader';
import MenuItems from './components/MenuItems';
import ProfileAvatar from 'components/Items/ProfileAvatar';
import {
  PROFILE_ASIDE_BOTTOM_LIST,
  PROFILE_ASIDE_TOP_LIST,
  PROFILE_DROPDOWN_LIST,
} from 'utils/constants';

const ProfileAsideMenu = () => {
  const [
    isConfigBookModal,
    showConfigBookModal,
    handleCancelConfigBookModal,
  ] = useShowConfigModal();

  const isTabletOrMobile = useMediaQuery({ maxWidth: 1200 });
  return (
    <>
      {isTabletOrMobile ? (
        <>
          <MobileHeader />
          <Row
            gutter={[0, 8]}
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '150px',
            }}
          >
            <Col flex={0.5}>
              <ProfileAvatar
                rowProps={{ flexDirection: 'column-reverse' }}
                avatarProps={{ size: 64 }}
                isHasArrow={false}
              />
            </Col>

            <Col xs={24}>
              <MenuItems menuList={PROFILE_DROPDOWN_LIST} isTabs={true} />
            </Col>
          </Row>
        </>
      ) : (
        <Col
          xs={24}
          md={6}
          style={{
            minHeight: '100vh',
            background: 'white',
            padding: '30px 16px 30px 0px',
          }}
        >
          <Row gutter={[0, 8]} style={{ height: '90vh', flexDirection: 'column' }}>
            <Col flex={0.5}>
              <PageHeaderLogo isBackIcon={true} style={{ padding: 0 }} />
            </Col>
            <Col flex={0.5}>
              <ProfileAvatar
                rowProps={{ flexDirection: 'row-reverse' }}
                avatarProps={{ size: 64 }}
                isHasArrow={false}
              />
            </Col>
            <Col flex={0.5}>
              <Space>
                <Button
                  size="large"
                  type="primary"
                  shape="circle"
                  icon={<PlusOutlined />}
                  onClick={showConfigBookModal}
                />
                <Text style={{ fontSize: '16px' }} type="secondary">
                  Добавить книгу
                </Text>
              </Space>
            </Col>
            <Col
              flex={4}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <MenuItems menuList={PROFILE_ASIDE_TOP_LIST} />
              <MenuItems menuList={PROFILE_ASIDE_BOTTOM_LIST} />
            </Col>
          </Row>
        </Col>
      )}
      {isConfigBookModal && (
        <ConfigBookModal visible={isConfigBookModal} onCancel={handleCancelConfigBookModal} />
      )}
    </>
  );
};

export default ProfileAsideMenu;
