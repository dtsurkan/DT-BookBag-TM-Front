import { SendOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Col, Form, Row, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import PrimaryButton from 'components/Buttons/PrimaryButton';
import TextAreaInput from 'components/DataEntry/MainTextAreaInput';
import MainSpinner from 'components/Loading/Spinners/MainSpinner';

const SendMessageForm = ({
  form,
  onFinish = () => {},
  channel,
  isTyping,
  member,
  isLoadingMessage,
}) => {
  const { profile } = useSelector((state) => state.user);
  return (
    <Form form={form} onFinish={onFinish} size="large">
      <Row align="center">
        <Col xs={24} lg={18}>
          <TextAreaInput
            onKeyDown={() => channel.typing()}
            name="message"
            bordered={false}
            allowClear={true}
            placeholder="Ваше сообщение..."
            autoSize={{ minRows: 1, maxRows: 2 }}
            showCount={false}
            lg={24}
          />
          {isTyping && member !== profile.email ? (
            <Space>
              <Text>{member} is typing ...</Text>
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
              <PrimaryButton btnText="ОТПРАВИТЬ" icon={<SendOutlined />} />
            </MainSpinner>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SendMessageForm;
