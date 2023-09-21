import { Col, Form, Input } from 'antd';

const MainInput = ({
  hasFeedback = true,
  name = '',
  rules = [],
  allowClear = true,
  placeholder = '',
  xs = 24,
  lg = 12,
  disabled = false,
  extra = '',
  ...props
}) => {
  return (
    <Col xs={xs} lg={lg}>
      <Form.Item hasFeedback={hasFeedback} name={name} rules={rules} extra={extra} {...props}>
        <Input allowClear={allowClear} placeholder={placeholder} disabled={disabled} />
      </Form.Item>
    </Col>
  );
};

export default MainInput;
