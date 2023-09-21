import Icon from '@ant-design/icons';

const LeavesSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
    <g id="Group_16" data-name="Group 16" transform="translate(-591 -1324)">
      <circle
        id="Ellipse_3"
        data-name="Ellipse 3"
        cx="32"
        cy="32"
        r="32"
        transform="translate(591 1324)"
        fill="#daf6e0"
      />
      <g id="seedling-line" transform="translate(611 1344)">
        <path id="Path_16" data-name="Path 16" d="M0,0H24V24H0Z" fill="none" />
        <path
          id="Path_17"
          data-name="Path 17"
          d="M6,3a7,7,0,0,1,6.913,5.9A6.479,6.479,0,0,1,17.5,7H22V9.5A6.5,6.5,0,0,1,15.5,16H13v5H11V13H9A7,7,0,0,1,2,6V3ZM20,9H17.5A4.5,4.5,0,0,0,13,13.5V14h2.5A4.5,4.5,0,0,0,20,9.5ZM6,5H4V6a5,5,0,0,0,5,5h2V10A5,5,0,0,0,6,5Z"
          fill="#8ba591"
        />
      </g>
    </g>
  </svg>
);

export const LeavesIcon = (props) => <Icon component={LeavesSvg} {...props} />;
