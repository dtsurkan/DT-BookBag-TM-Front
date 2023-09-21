import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty as _isEmpty } from "lodash";
import { message } from "antd";
import LottieComponent from "components/Lottie/LottieComponent";
import { doGoogleSignIn } from "state/actions/user";
import loadingLottie from "lotties/loading.json";

const LoginRedirect = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { profile } = useSelector((state) => state.user);
  useEffect(() => {
    const getCallback = async () => {
      const response = await dispatch(doGoogleSignIn(router.query));
      console.log(`response `, response);
      if (response.status === 200) {
        setTimeout(() => router.push("/"), 2000);
      } else {
        if (response.data.message.message === "No access_token.") {
          message.error(response.data.message.message);
        } else if ((response.data.message.error = "invalid_token")) {
          message.error(response.data.message.error_description);
        } else {
          message.error(response.data.data);
        }
        router.push("/login");
      }
    };
    if (profile) {
      router.push("/");
    } else {
      if (!_isEmpty(router.query)) {
        getCallback();
      } else {
        // message.info("Empty url parameters. Please go to login page");
      }
    }
  }, [router.query, profile]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LottieComponent animationData={loadingLottie} width="initial" />
    </div>
  );
};

export default LoginRedirect;
