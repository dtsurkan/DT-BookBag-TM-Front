import Icon from '@ant-design/icons';

const ArrowDownSvg = () => (
  <svg
    id="arrow-drop-down-line"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path id="Path_14" data-name="Path 14" d="M0,0H24V24H0Z" fill="none" />
    <path
      id="Path_15"
      data-name="Path 15"
      d="M14.953,18.937l-7.2-7.2,2.4-2.4,4.8,4.8,4.8-4.8,2.4,2.4Z"
      transform="translate(-2.953 -1.969)"
      fill="#8d9da4"
    />
  </svg>
);

const ArrowDownIcon = (props) => <Icon component={ArrowDownSvg} {...props} />;

export default ArrowDownIcon;
