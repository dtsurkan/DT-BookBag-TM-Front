import { ConfigProvider } from 'antd';
import useStyles from '../globalStyles';

const AntdProvider = ({ children }) => {
  // Import Global React jss styles
  // NOTE! JSS PROVIDER must be above than execute useStyles()!
  useStyles();
  return <ConfigProvider>{children}</ConfigProvider>;
};

export default AntdProvider;
