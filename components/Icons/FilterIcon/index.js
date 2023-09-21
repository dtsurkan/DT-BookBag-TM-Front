import Icon from '@ant-design/icons';

const FilterSvg = () => (
  <svg
    id="filter-3-line"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path id="Path_57" data-name="Path 57" d="M0,0H24V24H0Z" fill="none" />
    <path
      id="Path_58"
      data-name="Path 58"
      d="M10,18h4V16H10ZM3,6V8H21V6Zm3,7H18V11H6Z"
      fill="#05161d"
    />
  </svg>
);

const FilterIcon = (props) => <Icon component={FilterSvg} {...props} />;

export default FilterIcon;
