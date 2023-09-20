import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormWrapper from "components/Authentification/FormWrapper";
import LoginForm from "components/Authentification/LoginForm";
import AuthentificationContainer from "components/Authentification/AuthentificationContainer";
import { doCustomSignIn } from "state/actions/user";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  // console.log("profile", profile);
  useEffect(() => {
    if (profile) {
      router.push("/");
    }
  }, []);

  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      await dispatch(doCustomSignIn(email, password));
      router.push("/");
    } catch (error) {
      console.log("error", error);
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
      />
    </AuthentificationContainer>
  );
};

export default Login;
