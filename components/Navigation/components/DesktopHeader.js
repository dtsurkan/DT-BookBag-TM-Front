import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { Select } from "antd";
import { Header } from "antd/lib/layout/layout";
import PrimaryOutlinedButton from "components/Buttons/PrimaryOutlinedButton";
import DebounceSelectSearch from "components/DataEntry/DebounceSelectSearch";
import MainAutoComplete from "components/DataEntry/MainAutoComplete";
import PageHeaderLogo from "components/Logo/PageHeaderLogo";
import ProfileDropdown from "./ProfileDropdown";
import MenuItems from "./MenuItems";
import classes from "styles/scss/layout/containers.module.scss";

const DesktopHeader = ({
  onSelectBook = () => {},
  onSearchBooks = () => {},
}) => {
  const router = useRouter();
  const { profile } = useSelector((state) => state.user);

  return (
    <Header className={classNames(classes.header, classes.container)}>
      <PageHeaderLogo
        style={{ padding: 0, cursor: "pointer" }}
        isClickable={true}
      />
      <DebounceSelectSearch
        fetchOptions={onSearchBooks}
        onSelect={onSelectBook}
        dataEntryComponent={MainAutoComplete}
      />
      <MenuItems mode="horizontal" />
      <Select bordered={false} defaultValue="ukr">
        <Select.Option value="ukr">Ukr</Select.Option>
        <Select.Option value="rus">Rus</Select.Option>
      </Select>
      {profile ? (
        <ProfileDropdown />
      ) : (
        <PrimaryOutlinedButton onClick={() => router.push("/login")} />
      )}
    </Header>
  );
};

export default DesktopHeader;
