import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthenticationCookies } from "lib/cookies";
import { doSignOut } from "state/actions/user";

const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.user);
  console.log(`isAuthenticated`, isAuthenticated);
  const { token } = getAuthenticationCookies();
  console.log(`token`, token);
  useEffect(() => {
    const signOut = async () => {
      await dispatch(doSignOut());
      router.push("/login");
    };
    if (!token && isAuthenticated) {
      signOut();
    }
  }, [token, isAuthenticated]);

  return children;
};

export default Auth;
