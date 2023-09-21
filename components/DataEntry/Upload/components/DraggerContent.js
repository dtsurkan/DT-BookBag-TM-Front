import useTranslation from 'next-translate/useTranslation';
import { InboxOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import Text from 'antd/lib/typography/Text';

const DraggerContent = () => {
  const { t } = useTranslation();
  return (
    <Space direction="vertical" align="center">
      <Text>
        <InboxOutlined />
      </Text>
      <Text>{t('components:data-entries.upload-first-paragraph')}</Text>
      <Text>{t('components:data-entries.upload-second-paragraph')}</Text>
    </Space>
  );
};

export default DraggerContent;
