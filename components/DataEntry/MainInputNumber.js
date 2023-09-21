import { Col, Form, InputNumber } from "antd";

const MainInputNumber = ({
  hasFeedback = true,
  name = "",
  rules = [],
  size = "large",
  min = 0,
  max = 10000,
  allowClear = true,
  placeholder = "Цена: 0.00 грн.",
  step = 1,
  precision = 2,
  xs = 24,
  lg = 12,
  ...props
}) => {
  return (
    <Col xs={xs} lg={lg}>
      <Form.Item hasFeedback={hasFeedback} name={name} rules={rules}>
        <InputNumber
          style={{ width: "100%" }}
          size={size}
          min={min}
          max={max}
          allowClear={allowClear}
          placeholder={placeholder}
          step={step}
          precision={precision}
        />
      </Form.Item>
    </Col>
  );
};

export default MainInputNumber;
