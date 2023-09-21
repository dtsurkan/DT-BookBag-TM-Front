import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import FormWrapper from "components/Authentification/FormWrapper";
import AuthentificationContainer from "components/Authentification/AuthentificationContainer";
import ResetPasswordForm from "components/Authentification/ResetPasswordForm";
import InformModal from "components/Modals/InformModal";
import { doResetPassword } from "state/actions/user";

const ResetPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const { profile } = useSelector((state) => state.user);
  const onFinish = async (values) => {
    const updateValues = { code: router.query.code, ...values };
    const response = await dispatch(doResetPassword(updateValues));
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
          btnText="Cбросить пароль"
          formTitle="Сбросить пароль"
          onFinish={onFinish}
          FormComponent={ResetPasswordForm}
          isLoadingAuth={isResettingPassword}
        />
      </AuthentificationContainer>
      <InformModal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Ви успешно сбросили пароль. Пожалуйста, перейдите на страницу авторизации и зайдите в систему!"
      />
    </>
  );
};

export default ResetPassword;
