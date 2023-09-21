import useTranslation from 'next-translate/useTranslation';
import { Button } from 'antd';
import classes from 'styles/scss/components/buttons.module.scss';

const PrimaryButton = ({
  size = 'large',
  type = 'primary',
  htmlType = 'submit',
  isBlock = true,
  btnText = 'components:buttons.login',
  disabled = false,
  icon = false,
  onClick = () => {},
  ...props
}) => {
  const { t } = useTranslation();
  return (
    <Button
      icon={icon}
      disabled={disabled}
      className={classes.primaryBtn}
      size={size}
      type={type}
      htmlType={htmlType}
      block={isBlock}
      onClick={onClick}
      {...props}
    >
      {t(btnText)}
    </Button>
  );
};

export default PrimaryButton;
