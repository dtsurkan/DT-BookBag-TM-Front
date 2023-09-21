import ImgCrop from 'antd-img-crop';

const UploadWrapper = ({ rotate = true, hasImageCrop = false, children }) => {
  return hasImageCrop ? (
    <ImgCrop rotate={rotate} shape="round" grid={true}>
      {children}
    </ImgCrop>
  ) : (
    children
  );
};

export default UploadWrapper;
