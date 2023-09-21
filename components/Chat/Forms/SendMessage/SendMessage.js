import { SendOutlined } from '@ant-design/icons';
import useTranslation from 'next-translate/useTranslation';
import { useSession } from 'next-auth/client';
import { Col, Form, Row, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import TextAreaInput from 'components/DataEntries/Main/MainTextAreaInput';
import MainSpinner from 'components/Loading/Spinners/MainSpinner';

const SendMessageForm = ({
  form,
  onFinish = () => {},
  conversation,
  isTyping,
  participant,
  isLoadingMessage,
}) => {
  const [session] = useSession();
  const { t } = useTranslation();
  return (
    <Form form={form} onFinish={onFinish} size="large">
      <Row align="center">
        <Col xs={24} lg={18}>
          <TextAreaInput
            onPressEnter={(event) => {
              //  NOTE! shift + enter checking
              if (event.keyCode === 13 && !event.shiftKey) {
                onFinish({ message: event.target.value });
              }
            }}
            onKeyDown={() => conversation.typing()}
            name="message"
            bordered={false}
            allowClear={true}
            placeholder="components:data-entries.message-placeholder"
            autoSize={{ minRows: 1, maxRows: 2 }}
            showCount={false}
            lg={24}
          />
          {isTyping && participant !== session?.profile.username ? (
            <Space>
              <Text>{t('components:others.is-typing', { participant })}</Text>
            </Space>
          ) : (
            <Space>
              <Text></Text>
            </Space>
          )}
        </Col>
        <Col xs={24} lg={6}>
          <Form.Item style={{ margin: 0 }}>
            <MainSpinner spinning={isLoadingMessage}>
              <PrimaryButton btnText="components:buttons.send" icon={<SendOutlined />} />
            </MainSpinner>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SendMessageForm;
