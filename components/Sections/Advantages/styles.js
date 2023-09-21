import { createUseStyles } from 'react-jss';

export default createUseStyles((theme) => ({
  advantages: {
    minHeight: '40vh',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '75px 0',
  },
  advantagesHeading: {
    textAlign: 'center',
    marginBottom: '84px',
  },
  advantagesHeadingTitle: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  advantagesCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '480px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '25px 30px',
  },
  [theme.breakpoints.down(theme.breakpoints.lg)]: {
    advantages: {
      alignItems: 'flex-start',
    },
    advantagesHeading: {
      textAlign: 'left',
      marginBottom: '50px',
    },
    advantagesHeadingTitle: {
      maxWidth: 'initial',
    },
    advantagesCard: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      textAlign: 'left',
      padding: '16px 0px',
      '& svg': {
        marginRight: '10px',
      },
    },
  },
  [theme.breakpoints.down(theme.breakpoints.md)]: {
    advantagesCard: {
      maxWidth: 'initial',
    },
  },
}));
