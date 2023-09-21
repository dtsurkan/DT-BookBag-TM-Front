import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn, getProviders, getSession } from 'next-auth/client';
import { message } from 'antd';
import FormWrapper from 'components/Authentication/Forms/FormWrapper';
import LoginForm from 'components/Authentication/Forms/Login';
import AuthentificationContainer from 'components/Authentication/AuthenticationContainer';
import { checkErrorCode } from 'lib/strapi/shared/errors';
import * as ga from 'lib/google/analytics';
import useTranslation from 'next-translate/useTranslation';
import SignInImg from 'public/assets/signin.png';

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  const providers = await getProviders();
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: { providers },
  };
}

const Login = ({ providers }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  console.log(`isLoadingAuth`, isLoadingAuth);
  const onFinish = async ({ email, password }) => {
    console.log(`testwegwgwgwgwgwwrgwrg`);
    setIsLoadingAuth(true);
    console.log(`email,password`, email, password);

    const response = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    const parsedresponse = JSON.parse(response?.error);
    console.log(`parsedresponse`, parsedresponse);
    if (checkErrorCode(parsedresponse?.statusCode)) {
      parsedresponse?.data?.forEach((item) =>
        item?.messages.forEach((res) => message.error(res.message))
      );
    } else {
      message.success(t('components:auth.success-login-title'));
      ga.event({
        action: 'login',
        params: {
          event_category: 'access',
          event_label: 'custom-login',
        },
      });
      router.push('/');
    }
    setIsLoadingAuth(false);
  };
  return (
    <AuthentificationContainer alt="Sign In Image" srcImage={SignInImg}>
      <FormWrapper
        onFinish={onFinish}
        linkUrl="/auth/register"
        FormComponent={LoginForm}
        isLoadingAuth={isLoadingAuth}
        providers={providers}
      />
    </AuthentificationContainer>
  );
};

export default Login;
