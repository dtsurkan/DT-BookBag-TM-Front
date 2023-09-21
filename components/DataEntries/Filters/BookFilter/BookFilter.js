import useTranslation from 'next-translate/useTranslation';
import { createUseStyles } from 'react-jss';
import { Col } from 'antd';
import Text from 'antd/lib/typography/Text';
import FilterIcon from 'components/Icons/FilterIcon';
import MainSelectSearch from '../../Main/MainSelectSearch/MainSelectSearch';

const useStyles = createUseStyles((theme) => ({
  filterBox: {
    display: 'flex',
    alignItems: 'center',
  },
  [theme.breakpoints.down(theme.breakpoints.md)]: {
    filterBox: {
      justifyContent: 'space-between',
    },
  },
}));

const FilterComponent = ({
  filterText = 'components:data-entries.condition-filter-label',
  name = '',
  options = [],
  bordered = false,
  placeholder = 'components:data-entries.condition-placeholder',
  formStyles = { marginBottom: 0 },
  xs = 12,
  lg = 10,
  ...props
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Col xs={24} lg={12} xl={6} className={classes.filterBox}>
      <Col style={{ display: 'flex', alignItems: 'center' }}>
        <FilterIcon />
        <Text>{t(filterText)}</Text>
      </Col>
      <MainSelectSearch
        xs={xs}
        lg={lg}
        name={name}
        options={options}
        bordered={bordered}
        hasFeedback={false}
        placeholder={placeholder}
        formStyles={formStyles}
        {...props}
      />
    </Col>
  );
};

export default FilterComponent;
