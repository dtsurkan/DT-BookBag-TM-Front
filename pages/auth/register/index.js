import { useRouter } from 'next/router';
import { useState } from 'react';
import useShowSimpleModal from 'hooks/useShowSimpleModal';
import { getProviders, getSession } from 'next-auth/client';
import { message } from 'antd';
import FormWrapper from 'components/Authentication/Forms/FormWrapper';
import RegisterForm from 'components/Authentication/Forms/Register';
import AuthentificationContainer from 'components/Authentication/AuthenticationContainer';
import InfoModal from 'components/Modals/Info';
import { registerUserToStrapi } from 'lib/strapi/services/auth';
import { checkErrorCode } from 'lib/strapi/shared/errors';
import * as ga from 'lib/google/analytics';

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  const providers = await getProviders();
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: { providers },
  };
}

const Register = ({ providers }) => {
  const router = useRouter();
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const { isModalVisible, showModal, cancelModal } = useShowSimpleModal();

  const onFinish = async (values) => {
    setIsLoadingAuth(true);
    const response = await registerUserToStrapi(values);
    if (checkErrorCode(response.status)) {
      response?.data?.data?.forEach((item) =>
        item.messages.forEach((res) => message.error(res.message))
      );
      setIsLoadingAuth(false);
    }
    if (response.status === 200) {
      showModal(true);
      setIsLoadingAuth(false);
      ga.event({
        action: 'sign_up',
        params: {
          event_category: 'access',
          event_label: 'register',
        },
      });
    }
  };

  const handleOk = () => {
    showModal();
    router.push('/auth/login');
  };
  const handleCancel = () => {
    cancelModal();
    router.push('/auth/login');
  };

  return (
    <>
      <AuthentificationContainer>
        <FormWrapper
          onFinish={onFinish}
          formTitle="components:auth.register-title"
          linkUrl="/auth/login"
          linkText="components:buttons.login"
          additionalText="components:auth-providers.additional-register-text"
          FormComponent={RegisterForm}
          isLoadingAuth={isLoadingAuth}
          providers={providers}
          // formSubtitle="Для покупки книг, вам не нужно создавать аккаунт, но если ви хотите продавать книги, тогда добро пожаловать!"
        />
      </AuthentificationContainer>
      <InfoModal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} />
    </>
  );
};

export default Register;
