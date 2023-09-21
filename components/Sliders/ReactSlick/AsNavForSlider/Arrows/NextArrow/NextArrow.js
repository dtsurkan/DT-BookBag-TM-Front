import ArrowDownIcon from 'components/Icons/ArrowDownIcon';

const CustomNextArrow = ({ style, onClick }) => (
  <div
    className="slick-arrow"
    style={{
      ...style,
      display: 'flex',
      justifyContent: 'center',
      marginTop: '50px',
    }}
    onClick={onClick}
    onKeyDown={onClick}
    role="button"
    tabIndex="0"
  >
    <ArrowDownIcon style={{ cursor: 'pointer' }} />
  </div>
);

export default CustomNextArrow;
