import useTranslation from 'next-translate/useTranslation';
import { Button } from 'antd';
import classes from 'styles/scss/components/buttons.module.scss';

const PrimaryOutlinedButton = ({
  size = 'large',
  type = 'text',
  htmlType = 'submit',
  isBlock = false,
  btnText = 'components:buttons.join',
  onClick = () => {},
  ...props
}) => {
  const { t } = useTranslation();
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
      {t(btnText)}
    </Button>
  );
};

export default PrimaryOutlinedButton;
