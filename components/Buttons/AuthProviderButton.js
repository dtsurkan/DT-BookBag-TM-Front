import { Button } from 'antd';
import classNames from 'classnames';
import { FacebookIcon } from 'components/Icons';
import classes from 'styles/scss/components/buttons.module.scss';

const AuthProviderButton = ({
  icon = <FacebookIcon />,
  type = 'default',
  onClick = () => {},
  styles,
}) => {
  return (
    <Button
      type={type}
      icon={icon}
      className={classNames(classes.authProviderBtn, styles)}
      onClick={onClick}
    />
  );
};

export default AuthProviderButton;
