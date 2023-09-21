import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { isEmpty as _isEmpty } from 'lodash';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { message } from 'antd';

export const useShowConfigModal = () => {
  const router = useRouter();
  const { profile } = useSelector((state) => state.user);
  const [isConfigBookModal, setIsConfigBookModal] = useState(false);
  const { t } = useTranslation();
  const showConfigBookModal = () => {
    if (!_isEmpty(profile)) {
      setIsConfigBookModal(true);
    } else {
      message.info(t('components:auth.required-auth-title'));
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    }
  };
  const handleCancelConfigBookModal = () => setIsConfigBookModal(false);

  return { isConfigBookModal, showConfigBookModal, handleCancelConfigBookModal };
};
