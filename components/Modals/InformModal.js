import useTranslation from 'next-translate/useTranslation';
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
      <Image src="/assets/orderBook.png" width="120px" height="120px" alt="orderBook" />
      <Title>{t(title)}</Title>
      <Text>{t(text)}</Text>
    </Modal>
  );
};

export default InformModal;
