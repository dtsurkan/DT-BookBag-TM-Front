import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Button, Collapse, Drawer, Space } from "antd";
import Text from "antd/lib/typography/Text";
import { ArrowDownOutlined, PlusOutlined } from "@ant-design/icons";
import MenuItems from "./MenuItems";
import PrimaryOutlinedButton from "components/Buttons/PrimaryOutlinedButton";
import {
  PROFILE_ASIDE_BOTTOM_LIST,
  PROFILE_ASIDE_TOP_LIST,
} from "utils/constants";
import ProfileAvatar from "components/Items/ProfileAvatar";

const { Panel } = Collapse;

const MobileDrawer = ({
  visible = false,
  placement = "left",
  closable = false,
  mask = false,
  onClose = () => {},
  showAddingBookModal = () => {},
}) => {
  const router = useRouter();
  const { profile } = useSelector((state) => state.user);

  return (
    <Drawer
      placement={placement}
      closable={closable}
      onClose={onClose}
      visible={visible}
      mask={mask}
      width={"100%"}
      style={{ height: "100%", position: "fixed" }}
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: "150px",
      }}
    >
      <div>
        {profile ? (
          <Collapse
            accordion
            style={{ background: "none", border: "none" }}
            expandIconPosition="right"
            expandIcon={({ isActive }) => (
              <ArrowDownOutlined
                style={{ color: "#01504d" }}
                rotate={isActive ? 180 : 0}
              />
            )}
          >
            <Panel
              key="1"
              extra={
                <ProfileAvatar
                  rowProps={{ flexDirection: "row-reverse" }}
                  isHasArrow={false}
                />
              }
            >
              <Space style={{ margin: "16px 0" }}>
                <Button
                  size="large"
                  type="primary"
                  shape="circle"
                  icon={<PlusOutlined />}
                  onClick={showAddingBookModal}
                />
                <Text style={{ fontSize: "16px" }} type="secondary">
                  Добавить книгу
                </Text>
              </Space>
              <MenuItems menuList={PROFILE_ASIDE_TOP_LIST} />
            </Panel>
          </Collapse>
        ) : (
          <PrimaryOutlinedButton
            isBlock
            onClick={() => router.push("/login")}
          />
        )}
        <MenuItems />
      </div>
      <MenuItems menuList={PROFILE_ASIDE_BOTTOM_LIST} />
    </Drawer>
  );
};

export default MobileDrawer;