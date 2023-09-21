import useTranslation from 'next-translate/useTranslation';
import { Col, Form, InputNumber } from 'antd';

const MainInputNumber = ({
  hasFeedback = true,
  name = '',
  rules = [],
  size = 'large',
  min = 0,
  max = 10000,
  placeholder = 'components:data-entries.price-placeholder',
  step = 1,
  precision = 2,
  xs = 24,
  lg = 12,
  ...props
}) => {
  const { t } = useTranslation();
  const translateRules = rules.map((rule) => ({ ...rule, message: t(rule.message) }));
  return (
    <Col xs={xs} lg={lg}>
      <Form.Item hasFeedback={hasFeedback} name={name} rules={translateRules}>
        <InputNumber
          style={{ width: '100%' }}
          size={size}
          min={min}
          max={max}
          placeholder={t(placeholder)}
          step={step}
          precision={precision}
        />
      </Form.Item>
    </Col>
  );
};

export default MainInputNumber;
