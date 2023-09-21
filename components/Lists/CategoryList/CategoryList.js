import { Fragment, useState } from 'react';
import { createUseStyles } from 'react-jss';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import { Dropdown, List, Menu, message, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import { ArrowUpOutlined, CloseOutlined, FilterFilled } from '@ant-design/icons';

const useStyles = createUseStyles(() => ({
  listSection: { background: 'white', padding: '25px 20px', height: '100%' },
  listItem: { padding: '4px 0' },
  listItemBtn: {
    whiteSpace: 'normal',
    height: 'auto',
    textAlign: 'left',
  },
  mobileMenuSection: {
    marginTop: '20px',
  },
  mobileMenu: { boxShadow: 'none', margin: '0 16px' },
  mobileMenuItem: { padding: '14px', whiteSpace: 'initial' },
}));

const CategoryList = ({
  allCategoriesItem = true,
  category = {},
  categories = [],
  split = false,
  itemLayout = 'horizontal',
  size = 'small',
  categoryListTitle = 'components:others.categories-title',
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const router = useRouter();
  const isTabletOrMobile = useMediaQuery({ maxWidth: 768 });
  const [isVisibleProfileDropdown, setIsVisibleProfileDropdown] = useState(false);
  const onClickMenuItem = async ({ key }) => {
    console.log(`key`, key);
    message.info(key);
    switch (key) {
      default:
        router.push(key);
        setIsVisibleProfileDropdown(false);
        break;
    }
  };
  return (
    <>
      {isTabletOrMobile ? (
        <div className={classes.mobileMenuSection} data-aos="fade-right">
          <Dropdown
            placement="bottomCenter"
            overlayStyle={{ width: '100%' }}
            overlay={
              <Menu onClick={onClickMenuItem} className={classes.mobileMenu}>
                {allCategoriesItem && (
                  <Menu.Item
                    key={`/books`}
                    className={classes.mobileMenuItem}
                    icon={<ArrowUpOutlined />}
                  >
                    {t('components:buttons.all-categories')}
                  </Menu.Item>
                )}
                {/* For categories route */}
                {category?.subcategories?.map((subcategory) => (
                  <Fragment key={subcategory.id}>
                    <Menu.Item
                      key={`/categories/${category.slug}/${subcategory.slug}`}
                      className={classes.mobileMenuItem}
                    >
                      {t(`components:categories.${subcategory.slug}`)}
                    </Menu.Item>
                  </Fragment>
                ))}
                {category?.categories?.map((category) => (
                  <Fragment key={category.id}>
                    <Menu.Item
                      key={`/categories/${category.slug}`}
                      className={classes.mobileMenuItem}
                      icon={<ArrowUpOutlined />}
                    >
                      {t(`components:categories.${category.slug}`)}
                    </Menu.Item>
                  </Fragment>
                ))}
                {/* For categories route */}

                {/* For books route */}
                {categories?.map((category) => (
                  <Fragment key={category.id}>
                    <Menu.Item
                      key={`/categories/${category.slug}`}
                      className={classes.mobileMenuItem}
                    >
                      {t(`components:categories.${category.slug}`)}
                    </Menu.Item>
                  </Fragment>
                ))}
                {/* For books route */}
              </Menu>
            }
            trigger={['click']}
            onVisibleChange={(flag) => setIsVisibleProfileDropdown(flag)}
          >
            <Space
              style={{
                width: '100%',
                background: isVisibleProfileDropdown ? 'white' : '#01504D',
                color: 'white',
                padding: '15px',
                transition: 'all .2s ease',
              }}
            >
              {isVisibleProfileDropdown ? (
                <CloseOutlined size="large" style={{ color: 'black' }} />
              ) : (
                <FilterFilled size="large" />
              )}
              <Title
                level={3}
                style={{
                  margin: 0,
                  color: isVisibleProfileDropdown ? 'black' : 'white',
                  transition: 'all .2s ease',
                }}
              >
                {t(categoryListTitle)}
              </Title>
            </Space>
          </Dropdown>
        </div>
      ) : (
        <div className={classes.listSection} data-aos="fade-right">
          <Title level={2} type="secondary">
            {t(categoryListTitle)}
          </Title>
          <List split={split} itemLayout={itemLayout} size={size}>
            {allCategoriesItem && (
              <List.Item className={classes.listItem}>
                <PrimaryButton
                  size="middle"
                  extraClassNames={classes.listItemBtn}
                  type="link"
                  btnText={'components:buttons.all-categories'}
                  onClick={() => router.push(`/books`)}
                  icon={<ArrowUpOutlined />}
                />
              </List.Item>
            )}
            {/* For categories route */}
            {category?.subcategories?.map((subcategory) => (
              <List.Item key={subcategory.id} className={classes.listItem}>
                <PrimaryButton
                  size="middle"
                  extraClassNames={classes.listItemBtn}
                  type="link"
                  btnText={`components:categories.${subcategory.slug}`}
                  onClick={() => router.push(`/categories/${category.slug}/${subcategory.slug}`)}
                />
              </List.Item>
            ))}
            {category?.categories?.map((category) => (
              <List.Item key={category.id} className={classes.listItem}>
                <PrimaryButton
                  size="middle"
                  extraClassNames={classes.listItemBtn}
                  type="link"
                  btnText={`components:categories.${category.slug}`}
                  onClick={() => router.push(`/categories/${category.slug}`)}
                  icon={<ArrowUpOutlined />}
                />
              </List.Item>
            ))}
            {/* For categories route */}

            {/* For books route */}
            {categories?.map((category) => (
              <List.Item key={category.id} className={classes.listItem}>
                <PrimaryButton
                  size="middle"
                  extraClassNames={classes.listItemBtn}
                  type="link"
                  btnText={`components:categories.${category.slug}`}
                  onClick={() => router.push(`/categories/${category.slug}`)}
                />
              </List.Item>
            ))}
            {/* For books route */}
          </List>
        </div>
      )}
    </>
  );
};

export default CategoryList;
