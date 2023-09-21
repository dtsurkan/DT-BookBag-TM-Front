import useTranslation from 'next-translate/useTranslation';
import { Col, Form } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import classes from 'styles/scss/components/dataEntries.module.scss';

const TextAreaInput = ({
  name = '',
  autoSize = { minRows: 1, maxRows: 5 },
  maxLength = 2000,
  showCount = true,
  placeholder = 'components:data-entries.seller-comment-placeholder',
  bordered = true,
  allowClear = false,
  xs = 24,
  lg = 12,
  styles,
  ...props
}) => {
  const { t } = useTranslation();
  return (
    <Col xs={xs} lg={lg}>
      <Form.Item name={name} style={{ margin: 0, ...styles }}>
        <TextArea
          className={classes.commentsTextArea}
          autoSize={autoSize}
          showCount={showCount}
          maxLength={maxLength}
          placeholder={t(placeholder)}
          bordered={bordered}
          allowClear={allowClear}
          {...props}
        />
      </Form.Item>
    </Col>
  );
};

export default TextAreaInput;
