import { useRouter } from 'next/router';
import { useState } from 'react';
import { message } from 'antd';
import { getSession } from 'next-auth/client';
import useShowSimpleModal from 'hooks/useShowSimpleModal';
import FormWrapper from 'components/Authentication/Forms/FormWrapper';
import AuthentificationContainer from 'components/Authentication/AuthenticationContainer';
import ForgotPasswordForm from 'components/Authentication/Forms/ForgotPassword';
import InfoModal from 'components/Modals/Info';
import { forgotPasswordAuthStrapi } from 'lib/strapi/services/auth';
import { checkErrorCode } from 'lib/strapi/shared/errors';
import SignInImg from 'public/assets/signin.png';

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const ForgotPassword = () => {
  const router = useRouter();
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const { isModalVisible, showModal, cancelModal } = useShowSimpleModal();

  const onFinish = async ({ email }) => {
    setIsResettingPassword(true);
    const response = await forgotPasswordAuthStrapi(email);
    console.log(`response`, response);
    if (checkErrorCode(response.status)) {
      response?.data?.data?.forEach((item) =>
        item.messages.forEach((res) => message.error(res.message))
      );
      setIsResettingPassword(false);
    }
    if (response.status === 200) {
      showModal();
      setIsResettingPassword(false);
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
      <AuthentificationContainer alt="Sign In Image" srcImage={SignInImg}>
        <FormWrapper
          isNeededAuthProviders={false}
          btnText="components:buttons.forgot-password"
          formTitle="components:auth.forgot-password-title"
          onFinish={onFinish}
          FormComponent={ForgotPasswordForm}
          isLoadingAuth={isResettingPassword}
        />
      </AuthentificationContainer>
      <InfoModal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        title="components:auth.success-forgot-password-title"
      />
    </>
  );
};

export default ForgotPassword;
