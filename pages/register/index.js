import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { isEmpty as _isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import FormWrapper from 'components/Authentification/FormWrapper';
import RegisterForm from 'components/Authentification/RegisterForm';
import AuthentificationContainer from 'components/Authentification/AuthentificationContainer';
import InformModal from 'components/Modals/InformModal';
import { doCustomSignUp } from 'state/actions/user';
import { checkErrorCode } from 'lib/strapi/shared/errors';

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  const onFinish = async (values) => {
    setIsLoadingAuth(true);
    const response = await dispatch(doCustomSignUp(values));
    if (checkErrorCode(response.status)) {
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
    if (!_isEmpty(profile)) {
      router.push('/');
    }
  }, [profile, router]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
    router.push('/login');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    router.push('/login');
  };
  return (
    <>
      <AuthentificationContainer>
        <FormWrapper
          onFinish={onFinish}
          formTitle="components:auth.register-title"
          linkUrl="/login"
          linkText="components:buttons.login"
          additionalText="components:auth-providers.additional-register-text"
          FormComponent={RegisterForm}
          isLoadingAuth={isLoadingAuth}
          // formSubtitle="Для покупки книг, вам не нужно создавать аккаунт, но если ви хотите продавать книги, тогда добро пожаловать!"
        />
      </AuthentificationContainer>
      <InformModal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} />
    </>
  );
};

export default Register;
