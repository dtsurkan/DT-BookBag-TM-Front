import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import useTranslation from 'next-translate/useTranslation';
import { message } from 'antd';

const useShowConfigModal = () => {
  const router = useRouter();
  const [session] = useSession();
  const [isConfigBookModal, setIsConfigBookModal] = useState(false);
  const { t } = useTranslation();
  const showConfigBookModal = () => {
    if (session) {
      setIsConfigBookModal(true);
    } else {
      message.info(t('components:auth.required-auth-title'));
      setTimeout(() => {
        router.push('/auth/login');
      }, 1500);
    }
  };
  const handleCancelConfigBookModal = () => setIsConfigBookModal(false);

  return { isConfigBookModal, showConfigBookModal, handleCancelConfigBookModal };
};

export default useShowConfigModal;
