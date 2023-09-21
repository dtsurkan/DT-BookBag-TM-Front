import { createUseStyles } from 'react-jss';

export default createUseStyles((theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    alignSelf: 'center',
    margin: 'auto',
    overflow: 'hidden',
    background: 'transparent',
    minHeight: '100vh',
  },

  [theme.breakpoints.down(theme.breakpoints.lg)]: {
    container: {
      padding: '0 16px 16px',
    },
  },
  // For container width
  // [theme.breakpoints.up(0)]: {
  //   container: {
  //     maxWidth: `${theme.breakpoints.xs}px`,
  //   },
  // },
  [theme.breakpoints.up(theme.breakpoints.sm)]: {
    container: {
      maxWidth: `${theme.breakpoints.sm}px`,
    },
  },
  [theme.breakpoints.up(theme.breakpoints.md)]: {
    container: {
      maxWidth: `${theme.breakpoints.md}px`,
    },
  },
  [theme.breakpoints.up(theme.breakpoints.lg)]: {
    container: {
      maxWidth: `${theme.breakpoints.lg}px`,
    },
  },
  [theme.breakpoints.up(theme.breakpoints.xl)]: {
    container: {
      maxWidth: `${theme.breakpoints.xl}px`,
    },
  },
  [theme.breakpoints.up(theme.breakpoints.xxl)]: {
    container: {
      maxWidth: `${theme.breakpoints.xxl}px`,
    },
  },
}));
