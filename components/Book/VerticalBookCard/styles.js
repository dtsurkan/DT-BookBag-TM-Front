import { createUseStyles } from 'react-jss';

export default createUseStyles((theme) => ({
  dropdownBtn: {
    position: 'absolute',
    right: '5px',
    top: 0,
    opacity: 0,
    visibility: 'visible',
    zIndex: 1,
    transition: '0.2s ease',
  },
  isVisibleDropdown: {
    visibility: 'visible',
    opacity: 1,
  },
  likedBooksCardHover: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#01504d',
    visibility: 'hidden',
    opacity: 0,
    zIndex: 1,
    transition: 'all 0.2s linear',
  },
  verticalBookCard: {
    '& img': {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      objectFit: 'contain',
    },
    '&:hover $dropdownBtn': {
      visibility: 'visible',
      opacity: 1,
    },
    '&:hover $likedBooksCardHover': {
      visibility: 'visible',
      opacity: 0.85,
    },
  },
  [theme.breakpoints.down(theme.breakpoints.lg)]: {
    dropdownBtn: {
      opacity: 1,
      visibility: 'visible',
    },
    likedBooksCardHover: {
      opacity: 0.85,
      visibility: 'visible',
    },
  },
}));
