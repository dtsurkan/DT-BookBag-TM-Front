import useTranslation from 'next-translate/useTranslation';
import { Col, Form, Input } from 'antd';

const MainInput = ({
  hasFeedback = true,
  name = '',
  rules = [],
  allowClear = true,
  placeholder = 'components:empty.empty-string',
  xs = 24,
  lg = 12,
  disabled = false,
  prefix,
  extra = 'components:empty.empty-string',
  isTranslateRules = true,
  ...props
}) => {
  const { t } = useTranslation();
  const translateRules = rules.map((rule) => ({ ...rule, message: t(rule.message) }));

  return (
    <Col xs={xs} lg={lg}>
      <Form.Item
        hasFeedback={hasFeedback}
        name={name}
        rules={isTranslateRules ? translateRules : rules}
        extra={t(extra)}
        {...props}
      >
        <Input
          prefix={prefix}
          allowClear={allowClear}
          placeholder={t(placeholder)}
          disabled={disabled}
        />
      </Form.Item>
    </Col>
  );
};

export default MainInput;
