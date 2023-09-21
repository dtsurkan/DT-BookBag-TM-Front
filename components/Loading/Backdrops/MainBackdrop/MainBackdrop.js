import { createUseStyles } from 'react-jss';
import { Spin } from 'antd';
import classNames from 'classnames';

const useStyles = createUseStyles({
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity 195ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
  isActiveBackdrop: {
    opacity: 1,
    visibility: 'visible',
    zIndex: 1100,
  },
});

const MainBackdrop = ({ isSpinning = false }) => {
  const classes = useStyles();
  return (
    <div className={classNames(classes.backdrop, { [classes.isActiveBackdrop]: isSpinning })}>
      <Spin size="large" />
    </div>
  );
};

export default MainBackdrop;
