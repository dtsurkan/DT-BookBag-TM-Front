import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { Col, Image, Row } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { ArrowDownIcon, ArrowUpIcon } from 'components/Icons';
import { getStrapiMedia } from 'lib/strapi/shared/media';

const CustomNextArrow = ({ style, onClick }) => (
  <div
    className="slick-arrow"
    style={{
      ...style,
      display: 'flex',
      justifyContent: 'center',
      marginTop: '50px',
    }}
    onClick={onClick}
    onKeyDown={onClick}
    role="button"
    tabIndex="0"
  >
    <ArrowDownIcon style={{ cursor: 'pointer' }} />
  </div>
);

const CustomPrevArrow = ({ style, onClick }) => (
  <div
    className="slick-arrow"
    style={{
      ...style,
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '50px',
      marginTop: '25px',
    }}
    onClick={onClick}
    onKeyDown={onClick}
    role="button"
    tabIndex="0"
  >
    <ArrowUpIcon style={{ cursor: 'pointer' }} />
  </div>
);

const AsNavForSlider = ({
  book = [],
  firstSettings = {
    // infinite: book?.photos.length > 3,
    infinite: false,
    arrows: true,
    vertical: true,
    // verticalSwiping: true,
    slidesToShow: 4,
    swipeToSlide: false,
    focusOnSelect: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 5,
          vertical: false,
          verticalSwiping: false,
          arrows: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 4,
          vertical: false,
          verticalSwiping: false,
          arrows: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
          vertical: false,
          verticalSwiping: false,
          arrows: false,
        },
      },
      {
        breakpoint: 374,
        settings: {
          slidesToShow: 2,
          vertical: false,
          verticalSwiping: false,
          arrows: false,
        },
      },
    ],
  },
  secondSettings = {
    arrows: false,
    fade: true,
    vertical: true,
    centerMode: true,
    centerPadding: '0px',
    verticalSwiping: true,
    swipeToSlide: false,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          vertical: false,
          verticalSwiping: false,
          arrows: true,
        },
      },
    ],
  },
  xs = 24,
  lg,
  xl = 12,
}) => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const slider1 = useRef();
  const slider2 = useRef();
  const screens = useBreakpoint();
  // i dont seem to need this
  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, []);

  const firstSliderSettings = {
    asNavFor: nav1,
    ref: (slider2) => setNav2(slider2),
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,

    ...firstSettings,
  };

  const secondSliderSettings = {
    asNavFor: nav2,
    ref: (slider1) => setNav1(slider1),

    ...secondSettings,
  };
  // double click on single image
  const nextSlide = () => nav2.slickNext();

  return (
    <Col xs={xs} lg={lg} xl={xl}>
      <Row gutter={[16, 16]} className="bookPhotosSliders">
        <Col xs={24} xl={4}>
          <Image.PreviewGroup>
            <Slider {...firstSliderSettings} className="bookPhotos">
              {book?.photos.map((image) => (
                <div style={{ display: 'flex', justifyContent: 'center' }} key={image.id}>
                  <Image className="img" src={getStrapiMedia(image.url)} alt={image.name} />
                </div>
              ))}
            </Slider>
          </Image.PreviewGroup>
        </Col>
        <Col xs={24} xl={20}>
          <Slider {...secondSliderSettings} className="bookPhoto">
            {book?.photos.map((image) => (
              <div key={image.id}>
                <img
                  onClick={!screens.xl ? nextSlide : () => {}}
                  onDoubleClick={screens.xl ? nextSlide : () => {}}
                  className="img"
                  src={getStrapiMedia(image.url)}
                  alt={image.name}
                />
              </div>
            ))}
          </Slider>
        </Col>
      </Row>
    </Col>
  );
};

export default AsNavForSlider;
