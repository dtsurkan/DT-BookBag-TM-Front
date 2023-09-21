import LottieComponent from 'components/Lottie/LottieComponent';

const CenteredLottieWrapper = ({ lottieData = {}, width = 'initial', height = 'initial' }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LottieComponent animationData={lottieData} width={width} height={height} />
    </div>
  );
};

export default CenteredLottieWrapper;
