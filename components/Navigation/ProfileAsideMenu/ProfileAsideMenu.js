import useShowConfigModal from 'hooks/useShowConfigModal';
import useTranslation from 'next-translate/useTranslation';
import { useSession } from 'next-auth/client';
import useCustomSwr from 'hooks/useCustomSwr';
import useBadgeProfileCount from 'hooks/useBadgeProfileCount';
import { useTheme, createUseStyles } from 'react-jss';
import { useMediaQuery } from 'react-responsive';
import { Col, Row, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import { PlusOutlined } from '@ant-design/icons';
import PageHeaderLogo from 'components/Layout/PageHeaderLogo';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import ConfigBookModal from 'components/Modals/ConfigBook';
import MobileHeader from 'components/Navigation/Mobile/MobileHeader';
import MenuItems from 'components/Navigation/Menu/MenuItems';
import ProfileAvatar from 'components/Profile/ProfileAvatar';
import {
  getProfileAsideTopList,
  getProfileDropdownList,
  PROFILE_ASIDE_BOTTOM_LIST,
} from 'utils/constants';
import { getUserProcessingBooksSWR } from 'lib/swr/mutate/books';

const useStyles = createUseStyles(() => ({
  mobileProfileAsideWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '200px',
  },
  desktopProfileAsideWrapper: {
    minHeight: '100vh',
    background: 'white',
    padding: '30px 16px 30px 0px',
  },
  desktopProfileAsideWrapperRow: {
    height: '90vh',
    flexDirection: 'column',
  },
  desktopProfileMenusBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));

const ProfileAsideMenu = () => {
  const {
    isConfigBookModal,
    showConfigBookModal,
    handleCancelConfigBookModal,
  } = useShowConfigModal();
  const { t } = useTranslation();
  const [session] = useSession();
  const theme = useTheme();
  const classes = useStyles();
  const isTabletOrMobile = useMediaQuery({ maxWidth: theme.breakpoints.xl });
  const { response: processing_books } = useCustomSwr({
    url: getUserProcessingBooksSWR(session?.profile?.id, ''),
  });
  const { messagesCount } = useBadgeProfileCount();
  return (
    <>
      {isTabletOrMobile ? (
        <div>
          <MobileHeader />
          <Row gutter={[0, 8]} className={classes.mobileProfileAsideWrapper}>
            <Col flex={0.5}>
              <ProfileAvatar
                rowProps={{ flexDirection: 'column-reverse' }}
                avatarProps={{ size: 64 }}
                isHasArrow={false}
              />
            </Col>

            <Col xs={24}>
              <MenuItems
                menuList={getProfileDropdownList({
                  processingBooksCount: processing_books.length,
                  messagesCount,
                })}
                isTabs={true}
              />
            </Col>
          </Row>
        </div>
      ) : (
        <Col xs={24} md={6} className={classes.desktopProfileAsideWrapper} data-aos="fade-right">
          <Row gutter={[0, 8]} className={classes.desktopProfileAsideWrapperRow}>
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
                <PrimaryButton
                  shape="circle"
                  icon={<PlusOutlined />}
                  onClick={showConfigBookModal}
                  btnText="components:empty.empty-string"
                />
                <Title level={4} style={{ margin: 0 }} type="secondary">
                  {t('components:buttons.add-book')}
                </Title>
              </Space>
            </Col>
            <Col flex={4} className={classes.desktopProfileMenusBox}>
              <MenuItems
                menuList={getProfileAsideTopList({
                  processingBooksCount: processing_books.length,
                  messagesCount,
                })}
              />
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
