import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import useCustomSwr from 'hooks/useCustomSwr';
import useBadgeProfileCount from 'hooks/useBadgeProfileCount';
import { useSession } from 'next-auth/client';
import { createUseStyles } from 'react-jss';
import { Collapse, Drawer, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import { ArrowDownOutlined, PlusOutlined } from '@ant-design/icons';
import MenuItems from 'components/Navigation/Menu/MenuItems';
import ProfileAvatar from 'components/Profile/ProfileAvatar';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import { getUserProcessingBooksSWR } from 'lib/swr/mutate/books';
import { getProfileAsideTopList, PROFILE_ASIDE_BOTTOM_LIST } from 'utils/constants';

const { Panel } = Collapse;
const useStyles = createUseStyles((theme) => ({
  drawer: {
    height: '100%',
    position: 'fixed',
    '& .ant-drawer-body': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingTop: '100px',
    },
  },
  [theme.breakpoints.down(theme.breakpoints.sm)]: {
    drawer: {
      '& .ant-drawer-body': {
        paddingTop: '170px',
      },
    },
  },
}));
const MobileDrawer = ({
  visible = false,
  placement = 'left',
  closable = false,
  mask = false,
  onClose = () => {},
  showAddingBookModal = () => {},
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const router = useRouter();
  const [session] = useSession();
  const { response: processing_books } = useCustomSwr({
    url: getUserProcessingBooksSWR(session?.profile?.id, ''),
  });
  const { messagesCount } = useBadgeProfileCount();
  return (
    <Drawer
      placement={placement}
      closable={closable}
      onClose={onClose}
      visible={visible}
      mask={mask}
      width={'100%'}
      className={classes.drawer}
    >
      <div>
        {session ? (
          <Collapse
            accordion
            style={{ background: 'none', border: 'none' }}
            expandIconPosition="right"
            expandIcon={({ isActive }) => (
              <ArrowDownOutlined style={{ color: '#01504d' }} rotate={isActive ? 180 : 0} />
            )}
          >
            <Panel
              key="1"
              extra={
                <ProfileAvatar rowProps={{ flexDirection: 'row-reverse' }} isHasArrow={false} />
              }
            >
              <Space style={{ margin: '16px 0' }}>
                <PrimaryButton
                  shape="circle"
                  icon={<PlusOutlined />}
                  onClick={showAddingBookModal}
                  btnText="components:empty.empty-string"
                />
                <Title level={4} style={{ margin: 0 }} type="secondary">
                  {t('components:buttons.add-book')}
                </Title>
              </Space>
              <MenuItems
                menuList={getProfileAsideTopList({
                  processingBooksCount: processing_books.length,
                  messagesCount,
                })}
              />
            </Panel>
          </Collapse>
        ) : (
          <PrimaryButton
            style={{ margin: '16px 0' }}
            type="text"
            btnText="components:buttons.join"
            isBlock={true}
            onClick={() => router.push('/auth/login')}
          />
        )}
        <MenuItems />
      </div>
      {session && <MenuItems menuList={PROFILE_ASIDE_BOTTOM_LIST} />}
    </Drawer>
  );
};

export default MobileDrawer;
