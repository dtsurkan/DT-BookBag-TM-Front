import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import FormWrapper from "components/Authentification/FormWrapper";
import LoginForm from "components/Authentification/LoginForm";
import AuthentificationContainer from "components/Authentification/AuthentificationContainer";
import { doCustomSignIn } from "state/actions/user";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  useEffect(() => {
    if (profile) {
      router.push("/");
    }
  }, [profile]);

  const onFinish = async ({ email, password }) => {
    setIsLoadingAuth(true);
    const response = await dispatch(doCustomSignIn(email, password));

    if (response.status === 400 || response.status === 429) {
      response?.data?.data?.forEach((item) =>
        item.messages.forEach((res) => message.error(res.message))
      );
      setIsLoadingAuth(false);
      return;
    }
    if (response.status === 200) {
      setIsLoadingAuth(false);
      router.push("/");
    }
  };
  return (
    <AuthentificationContainer
      alt="Sign In Image"
      srcImage="/assets/signin.png"
    >
      <FormWrapper
        onFinish={onFinish}
        linkUrl="/register"
        FormComponent={LoginForm}
        isLoadingAuth={isLoadingAuth}
      />
    </AuthentificationContainer>
  );
};

export default Login;
