import { Empty } from 'antd';

const CustomEmptyComponent = ({
  image = '/assets/no-data-cuate.png',
  description = 'Немає повідомлень',
}) => {
  return <Empty image={image} description={<span>{description}</span>}></Empty>;
};

export default CustomEmptyComponent;
