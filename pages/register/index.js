import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import FormWrapper from "components/Authentification/FormWrapper";
import RegisterForm from "components/Authentification/RegisterForm";
import AuthentificationContainer from "components/Authentification/AuthentificationContainer";
import InformModal from "components/Modals/InformModal";
import { doCustomSignUp } from "state/actions/user";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  const onFinish = async (values) => {
    setIsLoadingAuth(true);
    const response = await dispatch(doCustomSignUp(values));
    if (response.status === 400 || response.status === 429) {
      response?.data?.data?.forEach((item) =>
        item.messages.forEach((res) => message.error(res.message))
      );
      setIsLoadingAuth(false);
      return;
    }
    if (response.status === 200) {
      setIsModalVisible(true);
      setIsLoadingAuth(false);
    }
  };
  useEffect(() => {
    if (profile) {
      router.push("/");
    }
  }, [profile]);

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
      <AuthentificationContainer>
        <FormWrapper
          onFinish={onFinish}
          formTitle="Регистрация аккаунта"
          linkUrl="/login"
          linkText="войти"
          additionalText="Уже есть аккаунт? Нажмите "
          FormComponent={RegisterForm}
          isLoadingAuth={isLoadingAuth}
          // formSubtitle="Для покупки книг, вам не нужно создавать аккаунт, но если ви хотите продавать книги, тогда добро пожаловать!"
        />
      </AuthentificationContainer>
      <InformModal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </>
  );
};

export default Register;
