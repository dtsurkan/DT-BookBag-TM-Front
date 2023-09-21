import { InboxOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import Text from 'antd/lib/typography/Text';

const DraggerContent = () => {
  return (
    <Space direction="vertical" align="center">
      <Text>
        <InboxOutlined />
      </Text>
      <Text>Клацніть або перетягніть файл у цю область, щоб завантажити</Text>
      <Text>
        Підтримка одноразового або масового завантаження. Суворо забороняйте завантажувати дані
        компанії або інші файли групи.
      </Text>
    </Space>
  );
};

export default DraggerContent;
