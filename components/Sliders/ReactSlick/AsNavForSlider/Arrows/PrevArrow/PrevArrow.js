import ArrowUpIcon from 'components/Icons/ArrowUpIcon';

const CustomPrevArrow = ({ style, onClick }) => (
  <div
    className="slick-arrow"
    style={{
      ...style,
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '50px',
      marginTop: '25px',
    }}
    onClick={onClick}
    onKeyDown={onClick}
    role="button"
    tabIndex="0"
  >
    <ArrowUpIcon style={{ cursor: 'pointer' }} />
  </div>
);

export default CustomPrevArrow;
