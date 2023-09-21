import useTranslation from 'next-translate/useTranslation';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { Button } from 'antd';

const useStyles = createUseStyles({
  primaryBtn: {
    height: '52px',
    borderRadius: '2px',
    textTransform: 'uppercase',
    letterSpacing: '0.7px',
    fontSize: '14px',
  },
  primaryOutlinedBtn: {
    border: '1px solid #f37800',
    borderRadius: '2px',
    color: '#f37800',
    textTransform: 'uppercase',
    padding: '12.4px 24px',
    fontSize: '14px',
  },
  googleBtn: {
    width: '100%',
    height: '56px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '2px',
    background: 'white',
  },
  facebookBtn: {
    width: '100%',
    height: '56px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '2px',
    background: '#1877f2',
    marginRight: '16px',
    '&:hover': {
      background: '#438be9',
      '& svg': {
        color: 'white',
      },
    },
  },
});

const PrimaryButton = ({
  size = 'large',
  type = 'primary',
  htmlType = 'submit',
  isBlock = true,
  btnText = 'components:buttons.login',
  disabled = false,
  icon = false,
  onClick = () => {},
  extraClassNames,
  isOutlinedStyles = true,
  providerType = false,
  ...props
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Button
      icon={icon}
      disabled={disabled}
      className={classNames(
        {
          [classes.primaryBtn]: type === 'primary',
          [classes.primaryOutlinedBtn]: type === 'text' && isOutlinedStyles,
          [classes.facebookBtn]: providerType === 'facebook',
          [classes.googleBtn]: providerType === 'google',
        },
        extraClassNames
      )}
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
