import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import classNames from "classnames";
import { Avatar, Button, Collapse, Drawer, Menu, Select, List } from "antd";
const { Panel } = Collapse;
import { Header } from "antd/lib/layout/layout";
import Text from "antd/lib/typography/Text";
import {
  ArrowDownOutlined,
  BookOutlined,
  CloseOutlined,
  MailOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import PageHeaderLogo from "components/Logo/PageHeaderLogo";
import PrimaryOutlinedButton from "components/Buttons/PrimaryOutlinedButton";
import { doSignOut } from "state/actions/user";
import classes from "styles/scss/layout/containers.module.scss";
import { getBooksByAuthorOrBookName } from "lib/strapi/services/books";
import DebounceSelectSearch from "components/DataEntry/DebounceSelectSearch";
import MainAutoComplete from "components/DataEntry/MainAutocomplete";

const data = [
  {
    title: "Книги",
  },
  {
    title: "O BookBag",
  },
];
const NavBar = () => {
  const router = useRouter();
  const { profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1200 });
  const [visible, setVisible] = useState(false);

  const signOut = async () => {
    try {
      await dispatch(doSignOut());
      router.push("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  const isShowDrawer = () => {
    setVisible(!visible);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSearchBooks = async (value) => {
    console.log("value", value);
    if (!value) {
      return [];
    }
    const response = await getBooksByAuthorOrBookName(value);
    return response.data.map((book) => {
      const { book_name, ...other } = book;
      return { value: book_name, ...other };
    });
  };
  const onSelectBook = (value, instance) => {
    router.push(`/books/${instance.slug}`);
  };

  return (
    <>
      {isTabletOrMobile ? (
        <Header
          className={classNames(classes.container)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            padding: "0px 16px",
            background: "none",
            minHeight: "100px",
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {visible ? (
              <CloseOutlined
                style={{
                  fontSize: "25px",
                  cursor: "pointer",
                  color: "#01504d",
                  marginRight: "16px",
                }}
                onClick={() => {
                  console.log("hello");
                  isShowDrawer();
                }}
              />
            ) : (
              <MenuOutlined
                style={{
                  fontSize: "25px",
                  cursor: "pointer",
                  color: "#01504d",
                  marginRight: "16px",
                }}
                onClick={() => {
                  console.log("hello");
                  isShowDrawer();
                }}
              />
            )}
            <PageHeaderLogo
              style={{ padding: 0, cursor: "pointer" }}
              isClickable={true}
            />
          </div>
          <div className="">
            <Select bordered={false} defaultValue="ukr">
              <Select.Option value="ukr">Ukr</Select.Option>
              <Select.Option value="rus">Rus</Select.Option>
            </Select>
          </div>
          <DebounceSelectSearch
            fetchOptions={onSearchBooks}
            onSelect={onSelectBook}
            dataEntryComponent={MainAutoComplete}
          />
        </Header>
      ) : (
        <Header
          className={classNames(classes.container)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            padding: "0px 0px",
            background: "none",
            minHeight: "100px",
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            width: "100%",
            // padding: "0px 80px",
          }}
        >
          <PageHeaderLogo
            style={{ padding: 0, cursor: "pointer" }}
            isClickable={true}
          />
          <DebounceSelectSearch
            fetchOptions={onSearchBooks}
            onSelect={onSelectBook}
            dataEntryComponent={MainAutoComplete}
          />
          <Menu mode="horizontal">
            <Menu.Item key="category" icon={<MailOutlined />}>
              <Link href="/categories">Категории</Link>
            </Menu.Item>
            <Menu.Item key="mail" icon={<BookOutlined />}>
              <Link href="/books">Книги</Link>
            </Menu.Item>
            <Menu.Item key="app">О BookBag</Menu.Item>
          </Menu>
          <Select bordered={false} defaultValue="ukr">
            <Select.Option value="ukr">Ukr</Select.Option>
            <Select.Option value="rus">Rus</Select.Option>
          </Select>
          {profile ? (
            <Button onClick={signOut} size="large">
              Logout
            </Button>
          ) : (
            <PrimaryOutlinedButton onClick={() => router.push("/login")} />
          )}
        </Header>
      )}
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        mask={false}
        width={"100%"}
        style={{ top: "10%", height: "90%", position: "absolute" }}
        bodyStyle={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div className="">
          {profile ? (
            <Collapse
              accordion
              // ghost
              style={{ background: "none", border: "none" }}
              expandIconPosition="right"
              //   expandIcon={<ArrowDownOutlined />}
              expandIcon={({ isActive }) => (
                <ArrowDownOutlined
                  style={{ color: "#01504d" }}
                  rotate={isActive ? 180 : 0}
                />
              )}
            >
              <Panel
                // showArrow={false}
                key="1"
                extra={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div className="">
                      <Avatar size="large" src="/assets/avatar.png" />
                      <Text style={{ marginLeft: "10px" }}>Leo B.</Text>
                    </div>
                    {/* <ArrowDownOutlined /> */}
                  </div>
                }
              >
                <List
                  size="large"
                  //   header={<div>Header</div>}
                  //   footer={<div>Footer</div>}
                  //   bordered

                  dataSource={data}
                  renderItem={({ title }) => (
                    <List.Item style={{ border: "none", padding: "16px 0" }}>
                      <Text type="secondary">{title}</Text>
                    </List.Item>
                  )}
                />
              </Panel>
            </Collapse>
          ) : (
            <Link href="/login">
              <Button block size="large">
                Присоединиться
              </Button>
            </Link>
          )}
          <div className="">
            <List
              size="large"
              //   header={<div>Header</div>}
              //   footer={<div>Footer</div>}
              //   bordered

              dataSource={data}
              renderItem={({ title }) => (
                <List.Item style={{ border: "none", padding: "16px 0" }}>
                  <Text type="secondary">{title}</Text>
                </List.Item>
              )}
            />
          </div>
        </div>
        <div className="">
          <List
            size="large"
            //   header={<div>Header</div>}
            //   footer={<div>Footer</div>}
            //   bordered

            dataSource={[{ title: "Настройки" }, { title: "Выйти" }]}
            renderItem={({ title }) => (
              <List.Item style={{ border: "none", padding: "16px 0" }}>
                <Text type="secondary">{title}</Text>
              </List.Item>
            )}
          />
        </div>
      </Drawer>
    </>
  );
};

export default NavBar;
