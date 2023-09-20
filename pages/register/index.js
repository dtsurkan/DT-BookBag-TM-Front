import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormWrapper from "components/Authentification/FormWrapper";
import RegisterForm from "components/Authentification/RegisterForm";
import AuthentificationContainer from "components/Authentification/AuthentificationContainer";
import InformModal from "components/Modals/InformModal";
import { doCustomSignUp } from "state/actions/user";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const onFinish = async (values) => {
    const { email, password, displayName } = values;
    try {
      await dispatch(doCustomSignUp(displayName, email, password));
      setIsModalVisible(true);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (profile) {
      router.push("/");
    }
  }, []);

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
