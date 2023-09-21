import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import { Dropdown, List, Menu, message, Space } from "antd";
import Title from "antd/lib/typography/Title";
import {
  ArrowUpOutlined,
  CloseOutlined,
  FilterFilled,
} from "@ant-design/icons";
import LinkButton from "components/Buttons/LinkButton";

const CategoryList = ({
  allCategoriesItem = true,
  category = {},
  categories = [],
  split = false,
  itemLayout = "horizontal",
  size = "small",
  CategoryListTitle = "Категории книг",
}) => {
  const router = useRouter();
  const isTabletOrMobile = useMediaQuery({ maxWidth: 768 });
  const [isVisibleProfileDropdown, setIsVisibleProfileDropdown] = useState(
    false
  );
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
        <div className="" style={{ marginTop: "20px" }}>
          <Dropdown
            placement="bottomCenter"
            overlayStyle={{ width: "100%" }}
            overlay={
              <Menu
                onClick={onClickMenuItem}
                style={{ boxShadow: "none", margin: "0 16px" }}
              >
                {allCategoriesItem && (
                  <Menu.Item
                    key={`/books`}
                    style={{ padding: "14px", whiteSpace: "initial" }}
                    icon={<ArrowUpOutlined />}
                  >
                    Все разделы
                  </Menu.Item>
                )}
                {/* For categories route */}
                {category?.subcategories?.map((subcategory) => (
                  <Fragment key={subcategory.id}>
                    <Menu.Item
                      key={`/categories/${category.slug}/${subcategory.slug}`}
                      style={{ padding: "14px", whiteSpace: "initial" }}
                    >
                      {subcategory.name}
                    </Menu.Item>
                  </Fragment>
                ))}
                {category?.categories?.map((category) => (
                  <Fragment key={category.id}>
                    <Menu.Item
                      key={`/categories/${category.slug}`}
                      style={{ padding: "14px", whiteSpace: "initial" }}
                      icon={<ArrowUpOutlined />}
                    >
                      {category.name}
                    </Menu.Item>
                  </Fragment>
                ))}
                {/* For categories route */}

                {/* For books route */}
                {categories?.map((category) => (
                  <Fragment key={category.id}>
                    <Menu.Item
                      key={`/categories/${category.slug}`}
                      style={{ padding: "14px", whiteSpace: "initial" }}
                    >
                      {category.name}
                    </Menu.Item>
                  </Fragment>
                ))}
                {/* For books route */}
              </Menu>
            }
            trigger={["click"]}
            onVisibleChange={(flag) => setIsVisibleProfileDropdown(flag)}
          >
            <Space
              style={{
                width: "100%",
                background: isVisibleProfileDropdown ? "white" : "#01504D",
                color: "white",
                padding: "15px",
                transition: "all .2s ease",
              }}
            >
              {isVisibleProfileDropdown ? (
                <CloseOutlined size="large" style={{ color: "black" }} />
              ) : (
                <FilterFilled size="large" />
              )}
              <Title
                level={3}
                style={{
                  margin: 0,
                  color: isVisibleProfileDropdown ? "black" : "white",
                  transition: "all .2s ease",
                }}
              >
                Категории книг
              </Title>
            </Space>
          </Dropdown>
        </div>
      ) : (
        <div
          className=""
          style={{ background: "white", padding: "25px 20px", height: "100%" }}
        >
          <Title level={2} type="secondary">
            {CategoryListTitle}
          </Title>
          <List split={split} itemLayout={itemLayout} size={size}>
            {allCategoriesItem && (
              <List.Item style={{ padding: "4px 0" }}>
                <LinkButton
                  btnText="Все разделы"
                  onClick={() => router.push(`/books`)}
                  icon={<ArrowUpOutlined />}
                />
              </List.Item>
            )}
            {/* For categories route */}
            {category?.subcategories?.map((subcategory) => (
              <List.Item key={subcategory.id} style={{ padding: "4px 0" }}>
                <LinkButton
                  btnText={subcategory.name}
                  onClick={() =>
                    router.push(
                      `/categories/${category.slug}/${subcategory.slug}`
                    )
                  }
                />
              </List.Item>
            ))}
            {category?.categories?.map((category) => (
              <List.Item key={category.id} style={{ padding: "4px 0" }}>
                <LinkButton
                  btnText={category.name}
                  onClick={() => router.push(`/categories/${category.slug}`)}
                  icon={<ArrowUpOutlined />}
                />
              </List.Item>
            ))}
            {/* For categories route */}

            {/* For books route */}
            {categories?.map((category) => (
              <List.Item key={category.id} style={{ padding: "4px 0" }}>
                <LinkButton
                  btnText={category.name}
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
