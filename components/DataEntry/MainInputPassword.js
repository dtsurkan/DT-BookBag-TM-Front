import useTranslation from 'next-translate/useTranslation';
import { Col, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const MainInputPassword = ({
  hasFeedback = true,
  name = '',
  rules = [],
  size = 'large',
  placeholder = 'components:data-entries.password-placeholder',
  allowClear = true,
  xs = 24,
  lg = 12,
  dependancies,
  isTranslateRules = true,
  ...props
}) => {
  const { t } = useTranslation();
  const translateRules = rules.map((rule) => ({ ...rule, message: t(rule.message) }));
  return (
    <Col xs={xs} lg={lg}>
      <Form.Item
        hasFeedback={hasFeedback}
        dependencies={dependancies}
        name={name}
        rules={isTranslateRules ? translateRules : rules}
        {...props}
      >
        <Input.Password
          style={{ width: '100%' }}
          allowClear={allowClear}
          size={size}
          placeholder={t(placeholder)}
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>
    </Col>
  );
};

export default MainInputPassword;
