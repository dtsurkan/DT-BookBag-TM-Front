import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import { AutoComplete, Avatar, Input, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import CustomEmptyComponent from 'components/Empty/CustomEmptyComponent';
import { getStrapiMedia } from 'lib/strapi/shared/media';
import classes from 'styles/scss/components/dataEntries.module.scss';

const MainAutoComplete = ({
  isCustomizedOptions = true,
  allowClear = true,
  size = 'large',
  placeholder = 'components:data-entries.author-bookname-search-placeholder',
  options = [],
  isFetching = false,
  disabled = false,
  bordered = true,
  filterOption = false,
  onSearch = () => {},
  onChange = () => {},
  onSelect = () => {},
  ...props
}) => {
  const { t } = useTranslation();
  const customizedOptions = options.map((option) => ({
    key: option.slug,
    value: option.slug,
    label: (
      <div key={option.slug}>
        <Avatar
          style={{ marginRight: '5px' }}
          src={getStrapiMedia(option?.photos[0]?.url)}
          alt={option.photos[0].name}
        />
        <Text
          style={{ textTransform: 'uppercase', fontWeight: 500 }}
        >{`${option.book_name} - ${option.author}`}</Text>
      </div>
    ),
    ...option,
  }));
  return (
    <AutoComplete
      className={classNames(classes.autoComplete)}
      disabled={disabled}
      notFoundContent={
        isFetching ? (
          <Spin size="large" />
        ) : (
          <CustomEmptyComponent description="components:empty.no-results" />
        )
      }
      options={isCustomizedOptions ? customizedOptions : options}
      onSelect={onSelect}
      onSearch={onSearch}
      filterOption={filterOption}
      bordered={bordered}
      {...props}
    >
      <Input
        allowClear={allowClear}
        size={size}
        prefix={<SearchOutlined />}
        placeholder={t(placeholder)}
        bordered={bordered}
      />
    </AutoComplete>
  );
};

export default MainAutoComplete;
