import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import { Content } from 'antd/lib/layout/layout';

const useStyles = createUseStyles((theme) => ({
  mainContent: {
    paddingTop: '100px',
  },
  [theme.breakpoints.down(theme.breakpoints.sm)]: {
    mainContent: {
      paddingTop: '170px',
    },
  },
}));

const MainContent = ({ children }) => {
  const classes = useStyles();
  return <Content className={classNames(classes.mainContent)}>{children}</Content>;
};

export default MainContent;
