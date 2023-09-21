import { forwardRef } from 'react';
import { Form } from 'antd';
import Search from 'antd/lib/input/Search';

const MainInputSearch = (
  {
    hasFeedback = true,
    name = '',
    rules = [],
    enterButton = 'Пошук',
    placeholder = 'Введіть емейл продавця...',
    disabled = false,
    size = 'large',
    loading = false,
    onSearch = () => {},
    ...props
  },
  ref
) => {
  return (
    <Form.Item name={name} hasFeedback={hasFeedback} rules={rules} {...props}>
      <Search
        ref={ref}
        onSearch={onSearch}
        placeholder={placeholder}
        enterButton={enterButton}
        size={size}
        loading={loading}
        disabled={disabled}
      />
    </Form.Item>
  );
};

export default forwardRef(MainInputSearch);
