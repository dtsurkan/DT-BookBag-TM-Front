import { Col, Form, Input } from "antd";

const MainInput = ({
  hasFeedback = true,
  name = "",
  rules = [],
  allowClear = true,
  placeholder = "",
  xs = 24,
  lg = 12,
  ...props
}) => {
  return (
    <Col xs={xs} lg={lg}>
      <Form.Item hasFeedback={hasFeedback} name={name} rules={rules}>
        <Input allowClear={allowClear} placeholder={placeholder} />
      </Form.Item>
    </Col>
  );
};

export default MainInput;
