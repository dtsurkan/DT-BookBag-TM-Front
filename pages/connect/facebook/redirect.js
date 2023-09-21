import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty as _isEmpty } from 'lodash';
import { message } from 'antd';
import CenteredLottieWrapper from 'components/Lottie/CenteredLottieWrapper';
import { doFacebookSignIn } from 'state/actions/user';
import loadingFacebookLottie from 'lotties/facebook-loading.json';

const LoginRedirect = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { profile } = useSelector((state) => state.user);
  useEffect(() => {
    const getCallback = async () => {
      const response = await dispatch(doFacebookSignIn(router.query));
      console.log(`response `, response);
      if (response.status === 200) {
        setTimeout(() => router.push('/'), 1000);
      } else {
        if (response.data.message.message === 'No access_token.') {
          message.error(response.data.message.message);
        } else if (response.data.message.error === 'invalid_token') {
          message.error(response.data.data.error.message);
        } else {
          message.error(response.data.data);
        }
        router.push('/login');
      }
    };
    if (!_isEmpty(profile)) {
      router.push('/');
    } else {
      if (!_isEmpty(router.query)) {
        getCallback();
      } else {
        // message.info("Empty url parameters. Please go to login page");
      }
    }
  }, [router.query, profile, dispatch, router]);

  return <CenteredLottieWrapper lottieData={loadingFacebookLottie} width="50%" height="50%" />;
};

export default LoginRedirect;
