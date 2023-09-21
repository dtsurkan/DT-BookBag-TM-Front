import { createUseStyles } from 'react-jss';

export default createUseStyles((theme) => ({
  '@global': {
    // NPROGRESS styles
    '#nprogress .bar': {
      height: '4px',
    },
    //--------------
    // GENERAL SETTINGS STYLES
    body: { fontFamily: "'Lato', sans-serif" },
    'ol,ul,dl': {
      margin: 0,
      padding: 0,
    },
    // ANTD DESIGN OVERWRITE
    // '.ant-btn.ant-btn-lg': {
    //   padding: '12px 30px',
    // },
    '.ant-form-item-explain.ant-form-item-explain-error, .ant-form-item-explain.ant-form-item-explain-success': {
      textAlign: 'right',
    },

    '.ant-collapse-icon-position-right > .ant-collapse-item > .ant-collapse-header': {
      padding: '12px 0',
    },

    '.ant-collapse > .ant-collapse-item > .ant-collapse-header .ant-collapse-extra': {
      float: 'none',
    },

    '.ant-collapse-content > .ant-collapse-content-box': {
      padding: '16px 0',
    },
    '.ant-collapse-icon-position-right > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow': {
      top: '50%',
      transform: 'translate(0, -50%)',
    },
    '.ant-message': {
      zIndex: 1030,
    },
    '.antd-img-crop-modal': {
      zIndex: 1021,
    },
    'h1.ant-typography, h2.ant-typography, h3.ant-typography, h4.ant-typography, h5.ant-typography, h6.ant-typography': {
      fontFamily: "'Exo 2', sans-serif",
    },

    // --------------------
    // REACT SLICK
    '.slick-list': {
      padding: 0,
    },
    '.slick-slide': {
      padding: '0 25px',
    },
    '.slick-dots.booksSliderCustomDots': {
      top: '-50px',
      right: 0,
      width: 'initial',
      height: 'fit-content',
      display: 'flex',
    },
    '.slick-dots': {
      '& li': {
        border: '2px solid #8d9da4',
        borderRadius: '50%',
        transition: 'all 0.2s linear',
        '& button': {
          '&:before': {
            display: 'none',
          },
        },
        '&:hover': {
          background: '#e6e6e6',
        },
      },
      '& li.slick-active': {
        background: '#01504d',
        border: '2px solid #01504d',
        '&:hover': {
          background: '#01504d',
        },
      },
    },
    [theme.breakpoints.down(theme.breakpoints.md)]: {
      '.slick-dots.booksSliderCustomDots': {
        left: 0,
        width: '100%',
        justifyContent: 'space-between',
      },
    },
  },
}));
