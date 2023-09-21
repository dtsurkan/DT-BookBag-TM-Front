import { Fragment } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Menu, message, Tabs } from 'antd';
import { MENU_LIST } from 'utils/constants';
import { signOut } from 'next-auth/client';
const { TabPane } = Tabs;

const MenuItems = ({
  mode = 'vertical',
  menuList = MENU_LIST,
  isTabs = false,
  tabsOptions = {
    tabPosition: 'top',
    type: 'card',
    tabBarGutter: 8,
  },
  hasSelectedKeys = true,
  hasCustomOnClick = false,
  customOnClick = () => {},
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const selectedKeys = hasSelectedKeys ? [router.pathname] : false;

  const generalOnClick = async ({ key }) => {
    // message.info(key);
    switch (key) {
      case 'logout':
        try {
          const data = await signOut({
            redirect: false,
            callbackUrl: `${process.env.NEXTAUTH_URL}/auth/login`,
          });
          console.log(`data`, data);
        } catch (error) {
          console.log(`error`, error);
        }
        break;
      default:
        router.push(key);
        break;
    }
  };
  const onMenuClick = hasCustomOnClick ? customOnClick : generalOnClick;
  return (
    <>
      {isTabs ? (
        <Tabs
          {...tabsOptions}
          activeKey={router.pathname}
          // because onTabClick doesn't get object, only string
          onTabClick={(key) => generalOnClick({ key })}
          style={{ maxWidth: '100vw' }}
        >
          {menuList.map((item) => (
            <Fragment key={item.id}>
              <TabPane
                tab={
                  <span>
                    {item.icon}
                    {t(item.title)}
                  </span>
                }
                key={item.key}
              />
            </Fragment>
          ))}
        </Tabs>
      ) : (
        <Menu
          mode={mode}
          selectedKeys={selectedKeys}
          onClick={onMenuClick}
          style={{ border: 'none' }}
        >
          {menuList.map((item) => (
            <Fragment key={item.id}>
              <Menu.Item key={item.key} icon={item.icon}>
                {t(item.title)}
              </Menu.Item>
            </Fragment>
          ))}
        </Menu>
      )}
    </>
  );
};

export default MenuItems;
