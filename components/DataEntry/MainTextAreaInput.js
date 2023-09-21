import { Col, Form } from "antd";
import TextArea from "antd/lib/input/TextArea";
import classes from "styles/scss/components/dataEntries.module.scss";

const TextAreaInput = ({
  name = "",
  minRows = 1,
  maxRows = 5,
  maxLength = 2000,
  showCount = true,
  placeholder = "Комментарий к товару...",
  xs = 24,
  lg = 12,
  ...props
}) => {
  return (
    <Col xs={xs} lg={lg}>
      <Form.Item name={name}>
        <TextArea
          className={classes.commentsTextArea}
          autoSize={{ minRows, maxRows }}
          showCount={showCount}
          maxLength={maxLength}
          placeholder={placeholder}
        />
      </Form.Item>
    </Col>
  );
};

export default TextAreaInput;
