import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import classNames from "classnames";
import {
  AutoComplete,
  Avatar,
  Button,
  Collapse,
  Drawer,
  Empty,
  Input,
  Menu,
  Select,
  List,
} from "antd";
const { Panel } = Collapse;
import { Header } from "antd/lib/layout/layout";
import Text from "antd/lib/typography/Text";
import {
  ArrowDownOutlined,
  CloseOutlined,
  MailOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import PageHeaderLogo from "components/Logo/PageHeaderLogo";
import PrimaryOutlinedButton from "components/Buttons/PrimaryOutlinedButton";
import { doSignOut } from "state/actions/user";
import classes from "styles/scss/layout/containers.module.scss";
const options = [
  {
    value: "Burns Bay Road",
  },
  {
    value: "Downing Street",
  },
  {
    value: "Walerfl Street",
  },
  {
    value: "Wallerfer Street",
  },
  {
    value: "Wgergereall Street",
  },
  {
    value: "Wergergall Street",
  },
  {
    value: "Wergegrall Street",
  },
  {
    value: "Wall Strergergeet",
  },
  {
    value: "Wall Strergerget",
  },
  {
    value: "Wall Stergregergreet",
  },
  {
    value: "Wall Streregergegreet",
  },
];
const data = [
  {
    title: "Книги",
  },
  {
    title: "O BookBag",
  },
];
const NavBar = ({ books = [] }) => {
  const router = useRouter();
  const { profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const onSelect = (value, instance) => {
    router.push(`/books/${instance.slug}`);
  };

  const signOut = async () => {
    try {
      await dispatch(doSignOut());
      router.push("/");
    } catch (error) {
      console.log("error", error);
    }
  };
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1200 });
  const [visible, setVisible] = useState(false);

  const isShowDrawer = () => {
    setVisible(!visible);
  };

  const onClose = () => {
    setVisible(false);
  };

  const filterBooks = books.map((book) => {
    const { name, ...other } = book;
    return { value: name, ...other };
  });
  // console.log("filterBooks", filterBooks);
  
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
          <AutoComplete
            // notFoundContent="Not Found"
            notFoundContent={<Empty description="No options" />}
            style={{
              width: "100%",
            }}
            options={options}
            onSelect={onSelect}
            //   placeholder="Введите автора или названия книги..."
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          >
            <Input
              size="large"
              allowClear
              placeholder="Введите автора или названия книги..."
              bordered={false}
            />
          </AutoComplete>
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
          <AutoComplete
            // notFoundContent="Not Found"
            notFoundContent={<Empty description="No options" />}
            style={{
              minWidth: 500,
            }}
            options={filterBooks}
            onSelect={onSelect}
            //   placeholder="Введите автора или названия книги..."
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          >
            <Input
              size="large"
              prefix={<SearchOutlined />}
              allowClear
              placeholder="Введите автора или названия книги..."
            />
          </AutoComplete>
          <Menu mode="horizontal">
            <Menu.Item key="mail" icon={<MailOutlined />}>
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
