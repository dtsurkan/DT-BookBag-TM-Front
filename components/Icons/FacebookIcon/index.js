import Icon from '@ant-design/icons';

const FacebookSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <g id="Group_30" data-name="Group 30" transform="translate(-134 -257)">
      <path
        id="facebook-2"
        d="M97.387,39.408V27.284h4.07l.609-4.725H97.387V19.542c0-1.368.38-2.3,2.342-2.3h2.5V13.015a33.534,33.534,0,0,0-3.646-.186c-3.607,0-6.077,2.2-6.077,6.246v3.485h-4.08v4.725h4.08V39.409h4.879Z"
        transform="translate(54.572 247.171)"
        fill="#fff"
      />
      <rect
        id="Rectangle_18"
        data-name="Rectangle 18"
        width="32"
        height="32"
        transform="translate(134 257)"
        fill="none"
      />
    </g>
  </svg>
);

const FacebookIcon = (props) => <Icon component={FacebookSvg} {...props} />;

export default FacebookIcon;
