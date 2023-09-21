import { Col, Form, Select, Spin } from 'antd';
import CustomEmptyComponent from 'components/Empty/CustomEmptyComponent';

const MainSelectSearch = ({
  isChildrenOptions = false,
  mode,
  name = '',
  rules = [],
  initialValue,
  hasFeedback = true,
  formStyles = {},
  allowClear = true,
  showArrow = true,
  showSearch = true,
  maxTagCount = 'responsive',
  size = 'large',
  placeholder = 'Категория',
  optionFilterProp = 'label',
  options = [],
  labelInValue = false,
  isFetching = false,
  disabled = false,
  bordered = true,
  extra = false,
  getPopupContainer = (trigger) => trigger.parentNode,
  filterOption = (inputValue, option) =>
    option?.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1,
  onSearch = () => {},
  onChange = () => {},
  xs = 24,
  lg = 12,
  ...props
}) => {
  const сommonSelectProps = {
    mode,
    bordered,
    allowClear,
    showArrow,
    showSearch,
    maxTagCount: mode === 'multiple' && maxTagCount,
    size,
    placeholder,
    // if options are childen you need config isChildrenOptions and optionFilterProp to"children"
    optionFilterProp,
    labelInValue,
    notFoundContent: isFetching ? (
      <Spin size="large" />
    ) : (
      <CustomEmptyComponent description="Немає результатів по даному запиту" />
    ),
    disabled,
    getPopupContainer,
    filterOption,
    onSearch,
    onChange,
    ...props,
  };
  return (
    <Col xs={xs} lg={lg}>
      <Form.Item
        name={name}
        rules={rules}
        style={formStyles}
        hasFeedback={hasFeedback}
        extra={extra}
        initialValue={initialValue}
      >
        {isChildrenOptions ? (
          <Select {...сommonSelectProps}>
            {options?.map(({ value, label, key, ...optionProps }) => (
              <Select.Option key={key} value={value} {...optionProps}>
                {label}
              </Select.Option>
            ))}
          </Select>
        ) : (
          <Select {...сommonSelectProps} options={options} />
        )}
      </Form.Item>
    </Col>
  );
};

export default MainSelectSearch;
