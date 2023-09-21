import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty as _isEmpty } from 'lodash';
import { message } from 'antd';
import FormWrapper from 'components/Authentification/FormWrapper';
import AuthentificationContainer from 'components/Authentification/AuthentificationContainer';
import ForgotPasswordForm from 'components/Authentification/ForgotPasswordForm';
import InformModal from 'components/Modals/InformModal';
import { doForgotPassword } from 'state/actions/user';
import { checkErrorCode } from 'lib/strapi/shared/errors';

const ForgotPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const onFinish = async ({ email }) => {
    setIsResettingPassword(true);
    const response = await dispatch(doForgotPassword(email));
    if (checkErrorCode(response.status)) {
      response?.data?.data?.forEach((item) =>
        item.messages.forEach((res) => message.error(res.message))
      );
      setIsResettingPassword(false);
      return;
    }
    if (response.status === 200) {
      setIsModalVisible(true);
      setIsResettingPassword(false);
    }
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOk = () => {
    setIsModalVisible(false);
    router.push('/login');
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    router.push('/login');
  };

  useEffect(() => {
    if (!_isEmpty(profile)) {
      router.push('/');
    }
  }, [profile, router]);

  return (
    <>
      <AuthentificationContainer alt="Sign In Image" srcImage="/assets/signup.png">
        <FormWrapper
          isNeededAuthProviders={false}
          btnText="components:buttons.forgot-password"
          formTitle="components:auth.forgot-password-title"
          onFinish={onFinish}
          FormComponent={ForgotPasswordForm}
          isLoadingAuth={isResettingPassword}
        />
      </AuthentificationContainer>
      <InformModal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        title="components:auth.success-forgot-password-title"
      />
    </>
  );
};

export default ForgotPassword;
