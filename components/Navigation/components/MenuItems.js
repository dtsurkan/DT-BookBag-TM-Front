import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { Menu, message, Tabs } from 'antd';
import { MENU_LIST } from 'utils/constants';
import { useDispatch } from 'react-redux';
import { doSignOut } from 'state/actions/user';

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
  const dispatch = useDispatch();

  const selectedKeys = hasSelectedKeys ? [router.pathname] : false;

  const generalOnClick = async ({ key }) => {
    message.info(key);
    switch (key) {
      case 'logout':
        await dispatch(doSignOut());
        router.push('/');
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
                    {item.title}
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
                {item.title}
              </Menu.Item>
            </Fragment>
          ))}
        </Menu>
      )}
    </>
  );
};

export default MenuItems;
