/* eslint-disable react/display-name */
import Slider from 'react-slick';
import useTranslation from 'next-translate/useTranslation';
import { Button } from 'antd';
import { useRouter } from 'next/router';

const BooksSlider = ({
  children,
  dots = true,
  arrows = false,
  infinite = false,
  swipeToSlide = true,
  speed = 500,
  slidesToShow = 3,
  slidesToScroll = 1,
  route = `/books`,
  ...other
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const settings = {
    dots,
    infinite,
    speed,
    slidesToShow,
    slidesToScroll,
    arrows,
    swipeToSlide,
    dotsClass: 'slick-dots booksSliderCustomDots',
    appendDots: (dots) => (
      <span>
        <ul>{dots}</ul>
        <Button type="link" onClick={() => router.push(route)}>
          {t('components:buttons.see-all-books')}
        </Button>
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
  return <Slider {...settings}>{children}</Slider>;
};

export default BooksSlider;
