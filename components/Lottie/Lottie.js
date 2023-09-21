import { useLottie } from 'lottie-react';

export const LottieComponent = ({
  width = '100%',
  height = '100%',
  animationData,
  loop = true,
  autoplay = true,
  styles = {},
}) => {
  const options = {
    animationData,
    loop,
    autoplay,
  };
  const style = {
    width,
    height,
    ...styles,
  };
  const { View } = useLottie(options, style);
  return View;
};

export default LottieComponent;
