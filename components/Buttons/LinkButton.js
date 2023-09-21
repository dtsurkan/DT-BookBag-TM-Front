import { Button } from 'antd';
import classes from 'styles/scss/components/buttons.module.scss';

const LinkButton = ({
  size = 'default',
  type = 'link',
  btnText = '',
  icon = null,
  onClick = () => {},
  ...props
}) => {
  return (
    <Button
      icon={icon}
      className={classes.linkBtn}
      size={size}
      type={type}
      onClick={onClick}
      {...props}
    >
      {btnText}
    </Button>
  );
};

export default LinkButton;
