import Icon from '@ant-design/icons';

const HandHeartSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
    <g id="Group_15" data-name="Group 15" transform="translate(-189 -1324)">
      <circle
        id="Ellipse_2"
        data-name="Ellipse 2"
        cx="32"
        cy="32"
        r="32"
        transform="translate(189 1324)"
        fill="#fff3e2"
      />
      <g id="hand-heart-line" transform="translate(209 1344)">
        <path id="Path_20" data-name="Path 20" d="M0,0H24V24H0Z" fill="none" />
        <path
          id="Path_21"
          data-name="Path 21"
          d="M5,9a1,1,0,0,1,1,1,6.97,6.97,0,0,1,4.33,1.5H12.5A4.487,4.487,0,0,1,15.853,13H19a5,5,0,0,1,4.516,2.851A13.154,13.154,0,0,1,13,21a14.447,14.447,0,0,1-7.06-1.658A1,1,0,0,1,5,20H2a1,1,0,0,1-1-1V10A1,1,0,0,1,2,9Zm1,3v5.021l.045.033A11.9,11.9,0,0,0,13,19a11.232,11.232,0,0,0,7.835-3.13l.133-.133-.12-.1a2.994,2.994,0,0,0-1.643-.63L19,15H16.888A4.523,4.523,0,0,1,17,16v1H8V15h6.79l-.034-.078A2.5,2.5,0,0,0,12.664,13.5l-.164,0H9.57A4.985,4.985,0,0,0,6,12ZM4,11H3v7H4Zm9.646-7.425L14,3.93l.354-.354a2.5,2.5,0,1,1,3.535,3.536L14,11,10.11,7.11a2.5,2.5,0,1,1,3.536-3.535ZM11.526,4.99a.5.5,0,0,0-.06.637l.058.069L14,8.17,16.476,5.7a.5.5,0,0,0,.058-.638l-.058-.07a.5.5,0,0,0-.638-.057l-.07.058L14,6.757l-1.767-1.77-.068-.056a.5.5,0,0,0-.638.058Z"
          fill="#dcbb8a"
        />
      </g>
    </g>
  </svg>
);

const HandHeartIcon = (props) => <Icon component={HandHeartSvg} {...props} />;

export default HandHeartIcon;
