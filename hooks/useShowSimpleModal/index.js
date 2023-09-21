import { useState } from 'react';

const useShowSimpleModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => setIsModalVisible(true);
  const cancelModal = () => setIsModalVisible(false);

  return { isModalVisible, showModal, cancelModal };
};

export default useShowSimpleModal;
