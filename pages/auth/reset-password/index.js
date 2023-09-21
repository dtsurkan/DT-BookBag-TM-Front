import { useRouter } from 'next/router';
import { useState } from 'react';
import { message } from 'antd';
import { getSession } from 'next-auth/client';
import FormWrapper from 'components/Authentication/Forms/FormWrapper';
import AuthentificationContainer from 'components/Authentication/AuthenticationContainer';
import ResetPasswordForm from 'components/Authentication/Forms/ResetPassword';
import InfoModal from 'components/Modals/Info';
import { checkErrorCode } from 'lib/strapi/shared/errors';
import useShowSimpleModal from 'hooks/useShowSimpleModal';
import { resetPasswordAuthStrapi } from 'lib/strapi/services/auth';
import SignUpImg from 'public/assets/signup.png';

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

const ResetPassword = () => {
  const router = useRouter();
  const { isModalVisible, showModal, cancelModal } = useShowSimpleModal();
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const onFinish = async (values) => {
    const updateValues = { code: router.query.code, ...values };
    const response = await resetPasswordAuthStrapi(updateValues);
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
      <AuthentificationContainer alt="Sign In Image" srcImage={SignUpImg}>
        <FormWrapper
          isNeededAuthProviders={false}
          btnText="components:buttons.reset-password"
          formTitle="components:auth.reset-password-title"
          onFinish={onFinish}
          FormComponent={ResetPasswordForm}
          isLoadingAuth={isResettingPassword}
        />
      </AuthentificationContainer>
      <InfoModal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        title="components:auth.success-reset-password-title"
      />
    </>
  );
};

export default ResetPassword;
