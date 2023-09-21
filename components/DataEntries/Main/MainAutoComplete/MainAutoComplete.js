import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import useTranslation from 'next-translate/useTranslation';
import { AutoComplete, Avatar, Input, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import CustomEmpty from 'components/Empty/CustomEmpty';
import { getStrapiMedia } from 'lib/strapi/shared/media';

const useStyles = createUseStyles((theme) => ({
  autoComplete: {
    minWidth: '250px',
  },
  [theme.breakpoints.up(theme.breakpoints.xxl)]: {
    autoComplete: {
      minWidth: '500px',
    },
  },
  [theme.breakpoints.down(theme.breakpoints.xl)]: {
    autoComplete: {
      minWidth: '500px',
    },
  },
  [theme.breakpoints.down(theme.breakpoints.md)]: {
    autoComplete: {
      minWidth: 'initial',
      width: '100%',
    },
  },
}));

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
  const classes = useStyles();
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
          <CustomEmpty description="components:empty.no-results" />
        )
      }
      options={isCustomizedOptions ? customizedOptions : options}
      onSelect={onSelect}
      onSearch={onSearch}
      onChange={onChange}
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
