import { Modal } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import Image from 'next/image';

const InformModal = ({
  closable = false,
  centered = true,
  visible = false,
  onOk = () => {},
  onCancel = () => {},
  width = 700,
  title = 'Вы успешно зарегистрировались. Для верификации перейдите на почту и нажмите на ссылку и зайдите в систему.',
  text = 'Спасибо что остаетесь с нами!',
  isHasCancelBtn = { style: { display: 'none' } },
  zIndex = 1030,
}) => {
  return (
    <Modal
      zIndex={zIndex}
      closable={closable}
      centered={centered}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={width}
      cancelButtonProps={isHasCancelBtn}
      style={{ borderRadius: '2px' }}
      bodyStyle={{
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Image src="/assets/orderBook.png" width="120px" height="120px" alt="orderBook" />
      <Title>{title}</Title>
      <Text>{text}</Text>
    </Modal>
  );
};

export default InformModal;
