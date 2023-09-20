import { Button } from "antd";
import classes from "styles/scss/components/buttons.module.scss";

const PrimaryButton = ({
  size = "large",
  type = "primary",
  htmlType = "submit",
  isBlock = true,
  btnText = "Войти в аккаунт",
  onClick = () => {},
  ...props
}) => {
  return (
    <Button
      className={classes.primaryBtn}
      size={size}
      type={type}
      htmlType={htmlType}
      block={isBlock}
      onClick={onClick}
      {...props}
    >
      {btnText}
    </Button>
  );
};

export default PrimaryButton;