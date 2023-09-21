import { createUseStyles } from 'react-jss';

export default createUseStyles((theme) => ({
  subscribe: {
    minHeight: '600px',
    background: '#f9fefd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscribeCol: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscribeWrapper: {
    maxWidth: '850px',
    width: '100%',
    textAlign: 'center',
  },
  subscribeWrapperTitle: {
    marginTop: '16px',
  },
  subscribeForm: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    minWidth: '600px',
    marginTop: '55px',
  },
  subscribeFormBtn: { marginLeft: '16px' },
  [theme.breakpoints.down(theme.breakpoints.lg)]: {
    subscribeWrapper: {
      textAlign: 'left',
    },
    subscribeWrapperTitle: {
      padding: '0',
    },
    subscribeForm: {
      minWidth: 'initial',
    },
    subscribeFormBtn: {
      width: '100%',
      marginLeft: '0px',
    },
  },
}));
