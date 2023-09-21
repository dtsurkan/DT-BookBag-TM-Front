import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import { Modal } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import OrderBookImg from 'public/assets/orderBook.png';

const InfoModal = ({
  closable = false,
  centered = true,
  visible = false,
  onOk = () => {},
  onCancel = () => {},
  width = 700,
  title = 'components:auth.success-register-title',
  text = 'components:auth.success-register-text',
  isHasCancelBtn = { style: { display: 'none' } },
  zIndex = 1030,
}) => {
  const { t } = useTranslation();
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
      <Image quality={100} placeholder="blur" src={OrderBookImg} alt="orderBook" />
      <Title>{t(title)}</Title>
      <Text>{t(text)}</Text>
    </Modal>
  );
};

export default InfoModal;
