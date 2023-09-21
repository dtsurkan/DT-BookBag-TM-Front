import classNames from "classnames";
import { AutoComplete, Avatar, Empty, Input, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import { getStrapiMedia } from "lib/strapi/shared/media";
import classes from "styles/scss/components/dataEntries.module.scss";

const MainAutoComplete = ({
  isCustomizedOptions = true,
  allowClear = true,
  size = "large",
  placeholder = "Введите автора или названия книги...",
  options = [],
  labelInValue = false,
  isFetching = false,
  disabled = false,
  bordered = true,
  onSearch = () => {},
  onChange = () => {},
  onSelect = () => {},
  ...props
}) => {
  const customizedOptions = options.map((option) => ({
    value: option.value,
    label: (
      <div key={option.slug}>
        <Avatar
          style={{ marginRight: "5px" }}
          src={getStrapiMedia(option.photos[0].url)}
          alt={option.photos[0].name}
        />
        <Text>{option.value}</Text>
      </div>
    ),
    ...option,
  }));

  return (
    <AutoComplete
      className={classNames(classes.autoComplete)}
      disabled={disabled}
      labelInValue={labelInValue}
      notFoundContent={isFetching ? <Spin size="large" /> : <Empty />}
      options={isCustomizedOptions ? customizedOptions : options}
      onSelect={onSelect}
      onSearch={onSearch}
      filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
      {...props}
    >
      <Input
        allowClear={allowClear}
        size={size}
        prefix={<SearchOutlined />}
        placeholder={placeholder}
        bordered={bordered}
      />
    </AutoComplete>
  );
};

export default MainAutoComplete;
