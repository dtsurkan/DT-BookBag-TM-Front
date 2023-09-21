import { createUseStyles } from 'react-jss';

export default createUseStyles((theme) => ({
  header: {
    width: '100%',
    display: 'flex',
    alignSelf: 'center',
    margin: 'auto',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: 0,
    background: 'none',
    minHeight: '100px',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  [theme.breakpoints.down(theme.breakpoints.xl)]: {
    header: {
      zIndex: 1010,
      position: 'fixed',
      background: 'white',
    },
  },
  [theme.breakpoints.down(theme.breakpoints.lg)]: {
    header: {
      padding: '0 16px',
    },
  },
  [theme.breakpoints.down(theme.breakpoints.md)]: {
    header: {
      minHeight: '170px',
    },
  },
  [theme.breakpoints.down(theme.breakpoints.xs)]: {
    header: {
      paddingBottom: '16px',
    },
  },
  // For header width
  // [theme.breakpoints.up(0)]: {
  //   header: {
  //     maxWidth: `${theme.breakpoints.xs}px`,
  //   },
  // },
  [theme.breakpoints.up(theme.breakpoints.sm)]: {
    header: {
      maxWidth: `${theme.breakpoints.sm}px`,
    },
  },
  [theme.breakpoints.up(theme.breakpoints.md)]: {
    header: {
      maxWidth: `${theme.breakpoints.md}px`,
    },
  },
  [theme.breakpoints.up(theme.breakpoints.lg)]: {
    header: {
      maxWidth: `${theme.breakpoints.lg}px`,
    },
  },
  [theme.breakpoints.up(theme.breakpoints.xl)]: {
    header: {
      maxWidth: `${theme.breakpoints.xl}px`,
    },
  },
  [theme.breakpoints.up(theme.breakpoints.xxl)]: {
    header: {
      maxWidth: `${theme.breakpoints.xxl}px`,
    },
  },
}));
