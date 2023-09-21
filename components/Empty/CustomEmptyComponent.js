import useTranslation from 'next-translate/useTranslation';
import { Empty } from 'antd';

const CustomEmptyComponent = ({
  image = '/assets/no-data-cuate.png',
  description = 'components:empty.no-messages',
}) => {
  const { t } = useTranslation();
  return <Empty image={image} description={<span>{t(description)}</span>}></Empty>;
};

export default CustomEmptyComponent;
