import { Button } from 'antd';
import classes from 'styles/scss/components/buttons.module.scss';

const PrimaryOutlinedButton = ({
  size = 'large',
  type = 'text',
  htmlType = 'submit',
  isBlock = false,
  btnText = 'Присоедениться',
  onClick = () => {},
  ...props
}) => {
  return (
    <Button
      className={classes.primaryOutlinedBtn}
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

export default PrimaryOutlinedButton;
