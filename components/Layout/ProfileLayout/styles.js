import { createUseStyles } from 'react-jss';

export default createUseStyles((theme) => ({
  profileHeaderBox: {
    minHeight: '100vh',
    background: '#f9fefd',
    padding: '30px',
  },
  [theme.breakpoints.down(theme.breakpoints.xl)]: {
    profileHeaderBox: {
      minHeight: '50vh',
    },
  },
  [theme.breakpoints.down(theme.breakpoints.lg)]: {
    profileHeaderBox: {
      padding: '16px 0',
    },
  },
}));
