import { createUseStyles } from 'react-jss';

export default createUseStyles((theme) => ({
  bookPhotosSliders: {
    // background: 'green',
  },
  asideBookPhotos: {
    '& .slick-track': {
      maxHeight: '600px',
    },
    '& .slick-slide': {
      display: 'flex',
      justifyContent: 'center',
    },
    '& .ant-image-img': {
      width: '100px',
      height: '100px',
      margin: '0 auto',
      objectFit: 'fill',
    },
  },
  bookPhoto: {
    '& .slick-track': {
      // Think about it in future.
      // NOTE! This property need for properly height of slick-track, when one image in array.
      height: 'fit-content !important',
    },
    '& .slick-slide': {
      display: 'flex',
      justifyContent: 'center',
    },
    '& img': {
      width: '100%',
      maxHeight: '650px',
      //   height: '600px',
      height: 'fit-content',
      margin: '0 auto',
      objectFit: 'contain',
    },
  },
  [theme.breakpoints.down(theme.breakpoints.xl)]: {
    bookPhotosSliders: {
      flexDirection: 'column-reverse',
    },
    bookPhoto: {
      '& .slick-track': {
        display: 'flex',
        alignItems: 'center',
      },
      '& .slick-slide': {
        padding: 0,
      },
      '& img': {
        height: '100%',
      },
    },
  },
  [theme.breakpoints.down(theme.breakpoints.md)]: {
    bookPhoto: {
      '& img': {
        maxHeight: '500px',
        width: '100%',
      },
    },
  },
  [theme.breakpoints.down(theme.breakpoints.xs)]: {
    bookPhoto: {
      '& img': {
        maxHeight: '300px',
        objectFit: 'cover',
        objectPosition: 'center',
      },
    },
  },
}));
