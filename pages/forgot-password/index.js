import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import FormWrapper from "components/Authentification/FormWrapper";
import AuthentificationContainer from "components/Authentification/AuthentificationContainer";
import ForgotPasswordForm from "components/Authentification/ForgotPasswordForm";
import InformModal from "components/Modals/InformModal";
import { doForgotPassword } from "state/actions/user";

const ForgotPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const onFinish = async ({ email }) => {
    setIsResettingPassword(true);
    const response = await dispatch(doForgotPassword(email));
    if (response.status === 400 || response.status === 429) {
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
    router.push("/login");
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    router.push("/login");
  };

  useEffect(() => {
    if (profile) {
      router.push("/");
    }
  }, [profile]);

  return (
    <>
      <AuthentificationContainer
        alt="Sign In Image"
        srcImage="/assets/signup.png"
      >
        <FormWrapper
          isNeededAuthProviders={false}
          btnText="Восстановить пароль"
          formTitle="Восстановить пароль"
          onFinish={onFinish}
          FormComponent={ForgotPasswordForm}
          isLoadingAuth={isResettingPassword}
        />
      </AuthentificationContainer>
      <InformModal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Вам отправлено на почту ссылку для восстановления пароля. Пожалуйста, проверьте емейл"
      />
    </>
  );
};

export default ForgotPassword;
