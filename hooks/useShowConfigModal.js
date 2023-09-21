import { useRouter } from 'next/router';
import { isEmpty as _isEmpty } from 'lodash';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { message } from 'antd';

export const useShowConfigModal = () => {
  const router = useRouter();
  const { profile } = useSelector((state) => state.user);
  const [isConfigBookModal, setIsConfigBookModal] = useState(false);

  const showConfigBookModal = () => {
    if (!_isEmpty(profile)) {
      setIsConfigBookModal(true);
    } else {
      message.info('You need to auth!');
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    }
  };
  const handleCancelConfigBookModal = () => setIsConfigBookModal(false);

  return [isConfigBookModal, showConfigBookModal, handleCancelConfigBookModal];
};
