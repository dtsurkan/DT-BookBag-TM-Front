import { useRouter } from "next/router";
// import { Layout, Menu } from "antd";
import Layout, { Header } from "antd/lib/layout/layout";
import { MailOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import { AutoComplete, Button, Input, Menu, Select } from "antd";

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

const Home = () => {
  const router = useRouter();
  const onSearch = (value) => alert(value);
  const onSelect = (value) => {
    console.log("onSelect", value);
  };
  return (
    <Layout style={{ background: "none" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          //   padding: "16px ",
          background: "none",
        }}
      >
        <Title level={2}>BookBag</Title>
        <AutoComplete
          notFoundContent="Not Found"
          style={{
            minWidth: 500,
          }}
          options={options}
          onSelect={onSelect}
          //   placeholder="Введите автора или названия книги..."
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        >
          <Input
            allowClear
            placeholder="Введите автора или названия книги..."
          />
        </AutoComplete>
        <Menu mode="horizontal">
          <Menu.Item></Menu.Item>
          <Menu.Item key="mail" icon={<MailOutlined />}>
            Книги
          </Menu.Item>
          <Menu.Item key="app">О BookBag</Menu.Item>
        </Menu>
        <Select bordered={false} defaultValue="ukr">
          <Select.Option value="ukr">Ukr</Select.Option>
          <Select.Option value="rus">Rus</Select.Option>
        </Select>
        <Button onClick={() => router.push("/login")} size="large">
          Присоединиться
        </Button>
      </Header>
      {/* <Content>131e</Content> */}
      {/* <Footer>131</Footer> */}
    </Layout>
  );
};

export default Home;
