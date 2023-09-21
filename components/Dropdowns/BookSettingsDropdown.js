import { useState } from "react";
import classNames from "classnames";
import { Dropdown, message } from "antd";
import { EllipsisOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import confirm from "antd/lib/modal/confirm";
import MenuItems from "components/Navigation/components/MenuItems";
import { BOOK_SETTINGS_LIST } from "utils/constants";
import { deleteBook } from "lib/strapi/services/books";
import classes from "styles/scss/components/buttons.module.scss";

const BookSettingsDropdown = ({
  book = {},
  menuList = BOOK_SETTINGS_LIST,
  showConfigBookModal = () => {},
  showInformModal = () => {},
}) => {
  const [isVisibleDropdown, setIsVisibleDropdown] = useState(false);
  const onClickMenuItem = async ({ key }) => {
    message.info(key);
    switch (key) {
      case "edit":
        setIsVisibleDropdown(false);
        showConfigBookModal();
        break;
      case "delete":
        confirm({
          title: "Вы действительно хотите удалить эту книгу?",
          icon: <ExclamationCircleOutlined />,
          okText: "Да",
          okType: "danger",
          //   because dropdown z-index === 1050
          zIndex: 1100,
          cancelText: "Нет",
          async onOk() {
            await deleteBook(book.id);
            showInformModal();
          },
          onCancel() {
            message.info("Cancel");
          },
        });
        break;
      default:
        setIsVisibleDropdown(false);
        break;
    }
  };
  return (
    <div
      onClick={(event) => event.stopPropagation()}
      className={classNames(classes.dropdownBtn, {
        [classes.active]: isVisibleDropdown,
      })}
    >
      <Dropdown.Button
        visible={isVisibleDropdown}
        onVisibleChange={(flag) => setIsVisibleDropdown(flag)}
        trigger={["click"]}
        type="text"
        overlay={
          <MenuItems
            menuList={menuList}
            hasSelectedKeys={false}
            hasCustomOnClick={true}
            customOnClick={onClickMenuItem}
          />
        }
        icon={
          <EllipsisOutlined
            style={{
              color: "white",
              fontSize: "32px",
              fontWeight: "700",
            }}
          />
        }
      />
    </div>
  );
};

export default BookSettingsDropdown;
