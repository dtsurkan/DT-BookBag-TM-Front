import Icon from '@ant-design/icons';

const DefenceSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
    <g id="Group_19" data-name="Group 19" transform="translate(-1108 -1265)">
      <g id="Group_14" data-name="Group 14" transform="translate(80 -59)">
        <circle
          id="Ellipse_4"
          data-name="Ellipse 4"
          cx="32"
          cy="32"
          r="32"
          transform="translate(1028 1324)"
          fill="#d1ecff"
        />
        <g id="shield-check-line" transform="translate(1048 1344)">
          <path id="Path_18" data-name="Path 18" d="M0,0H24V24H0Z" fill="none" />
          <path
            id="Path_19"
            data-name="Path 19"
            d="M12,1l8.217,1.826A1,1,0,0,1,21,3.8v9.987a6,6,0,0,1-2.672,4.992L12,23,5.672,18.781A6,6,0,0,1,3,13.79V3.8a1,1,0,0,1,.783-.976Zm0,2.049L5,4.6v9.185a4,4,0,0,0,1.781,3.328L12,20.6l5.219-3.48A4,4,0,0,0,19,13.79V4.6L12,3.05Zm4.452,5.173,1.415,1.414L11.5,16,7.26,11.757l1.414-1.414L11.5,13.171l4.95-4.95Z"
            fill="#6995b2"
          />
        </g>
      </g>
    </g>
  </svg>
);

export const DefenceIcon = (props) => <Icon component={DefenceSvg} {...props} />;
