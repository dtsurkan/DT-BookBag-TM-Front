import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { isEmpty as _isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import FormWrapper from 'components/Authentification/FormWrapper';
import AuthentificationContainer from 'components/Authentification/AuthentificationContainer';
import ResetPasswordForm from 'components/Authentification/ResetPasswordForm';
import InformModal from 'components/Modals/InformModal';
import { doResetPassword } from 'state/actions/user';
import { checkErrorCode } from 'lib/strapi/shared/errors';

const ResetPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const { profile } = useSelector((state) => state.user);
  const onFinish = async (values) => {
    const updateValues = { code: router.query.code, ...values };
    const response = await dispatch(doResetPassword(updateValues));
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
          btnText="components:buttons.reset-password"
          formTitle="components:auth.reset-password-title"
          onFinish={onFinish}
          FormComponent={ResetPasswordForm}
          isLoadingAuth={isResettingPassword}
        />
      </AuthentificationContainer>
      <InformModal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        title="components:auth.success-reset-password-title"
      />
    </>
  );
};

export default ResetPassword;
