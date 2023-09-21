import classNames from 'classnames';
import { Content } from 'antd/lib/layout/layout';
import classes from 'styles/scss/layout/containers.module.scss';

const ContentComponent = ({ children }) => {
  return <Content className={classNames(classes.mainContent)}>{children}</Content>;
};

export default ContentComponent;
