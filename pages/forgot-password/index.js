import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import FormWrapper from "components/Authentification/FormWrapper";
import AuthentificationContainer from "components/Authentification/AuthentificationContainer";
import ForgotPasswordForm from "components/Authentification/ForgotPasswordForm";
import InformModal from "components/Modals/InformModal";
import { doResetPassword } from "state/actions/user";

const ForgotPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const onFinish = async ({ email }) => {
    console.log("email", email);
    try {
      await dispatch(doResetPassword(email));
      setIsModalVisible(true);
    } catch (error) {
      console.log("error", error);
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
  return (
    <>
      <AuthentificationContainer
        alt="Sign In Image"
        srcImage="/assets/signup.png"
      >
        <FormWrapper
          isNeededAuthProviders={false}
          formTitle="Восстановить пароль"
          onFinish={onFinish}
          FormComponent={ForgotPasswordForm}
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
