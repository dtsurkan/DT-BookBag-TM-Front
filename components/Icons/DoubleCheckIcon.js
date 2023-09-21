import Icon from '@ant-design/icons';

const DoubleCheckSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18.483"
    height="18.483"
    viewBox="0 0 18.483 18.483"
  >
    <g id="check-double-line" transform="translate(-2.758 -2.758)">
      <path
        id="Path_51"
        data-name="Path 51"
        d="M0,0H18.483V18.483H0Z"
        transform="translate(2.758 2.758)"
        fill="none"
      />
      <path
        id="Path_52"
        data-name="Path 52"
        d="M9.9,12.51,11.084,13.7,18.19,6.589l1.187,1.187-8.293,8.293L5.742,10.727,6.929,9.54l1.784,1.784L9.9,12.509Zm0-2.374,4.157-4.157,1.184,1.184L11.084,11.32ZM7.528,14.883,6.342,16.069,1,10.727,2.187,9.54l1.186,1.186h0l4.156,4.156Z"
        transform="translate(1.758 0.965)"
        fill="#6bbe9f"
      />
    </g>
  </svg>
);

export const DoubleCheckIcon = (props) => <Icon component={DoubleCheckSvg} {...props} />;
