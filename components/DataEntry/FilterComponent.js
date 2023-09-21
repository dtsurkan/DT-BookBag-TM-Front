import useTranslation from 'next-translate/useTranslation';
import { Col } from 'antd';
import Text from 'antd/lib/typography/Text';
import { FilterIcon } from 'components/Icons';
import MainSelectSearch from './MainSelectSearch';

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
  const { t } = useTranslation();
  return (
    <Col
      xs={24}
      lg={6}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
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
