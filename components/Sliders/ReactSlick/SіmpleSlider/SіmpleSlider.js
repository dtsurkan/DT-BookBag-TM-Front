/* eslint-disable react/display-name */
import { useRouter } from 'next/router';
import { createUseStyles } from 'react-jss';
import Slider from 'react-slick';
import classNames from 'classnames';
import PrimaryButton from 'components/Buttons/PrimaryButton';

const useStyles = createUseStyles((theme) => ({
  newCollectionBooksSlider: {
    '& .slick-track': {
      display: 'flex',
      alignItems: 'center',
    },
    '& .slick-slide': {
      padding: '25px',
    },
  },
  [theme.breakpoints.down(theme.breakpoints.xl)]: {
    newCollectionBooksSlider: {
      '& .slick-slide': {
        padding: '10px',
      },
    },
  },
}));

const SimpleSlider = ({
  children,
  dots = true,
  arrows = false,
  infinite = false,
  swipeToSlide = true,
  speed = 500,
  slidesToShow = 3,
  slidesToScroll = 1,
  route = `/books`,
  externalClassName,
  dotsClass = 'slick-dots booksSliderCustomDots',
  ...other
}) => {
  const classes = useStyles();
  const router = useRouter();
  const settings = {
    dots,
    infinite,
    speed,
    slidesToShow,
    slidesToScroll,
    arrows,
    swipeToSlide,
    dotsClass,
    appendDots: (dots) => (
      <span>
        <ul>{dots}</ul>
        <PrimaryButton
          size="middle"
          btnText={'components:buttons.see-all-books'}
          isBlock={false}
          type="link"
          onClick={() => router.push(route)}
        />
      </span>
    ),
    responsive: [
      {
        breakpoint: 1599,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    ...other,
  };
  return (
    <div className={classNames(classes.newCollectionBooksSlider, externalClassName)}>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default SimpleSlider;
