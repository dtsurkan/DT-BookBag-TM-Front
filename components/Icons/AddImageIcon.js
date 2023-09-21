import Icon from '@ant-design/icons';

const AddImageSvg = () => (
  <svg
    id="image-add-line"
    xmlns="http://www.w3.org/2000/svg"
    width="18.635"
    height="18.635"
    viewBox="0 0 18.635 18.635"
  >
    <path id="Path_63" data-name="Path 63" d="M0,0H18.635V18.635H0Z" fill="none" />
    <path
      id="Path_64"
      data-name="Path 64"
      d="M16.752,12.317v2.329h2.329V16.2H16.752v2.329H15.2V16.2H12.87V14.647H15.2V12.317ZM16.759,3a.771.771,0,0,1,.77.771v6.993H15.976V4.553H3.553V15.422l7.764-7.764,2.329,2.329v2.2L11.317,9.855,5.748,15.423h5.569v1.553H2.77A.771.771,0,0,1,2,16.205V3.771A.776.776,0,0,1,2.77,3H16.759ZM6.659,6.106A1.553,1.553,0,1,1,5.106,7.659,1.553,1.553,0,0,1,6.659,6.106Z"
      transform="translate(-0.447 -0.671)"
      fill="#8d9da4"
    />
  </svg>
);

export const AddImageIcon = (props) => <Icon component={AddImageSvg} {...props} />;
