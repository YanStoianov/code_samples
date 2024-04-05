import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { getCookie } from "cookies-next";
// CONSTANTS
import { appPathNames } from "@/constants/appConstants";
import { userConstants } from "@/store/user/constants";
// STORE
import { getUser } from "@/store/user/selectors";
import { setCurrentUser, userLogOut } from "@/store/user/userSlice";
// Gql
import { useGetCurrentUserLazyQuery } from "@/graphql/generated/schema";

export interface AuthProps {
  accessToken?: string | null;
}

const useAuth = (props?: AuthProps) => {
  let { accessToken } = { ...props };
  const cookieAccessToken = getCookie(userConstants.ACCESS_TOKEN);
  const currentPath = Router.router?.asPath as string;

  if (!accessToken) {
    accessToken = typeof cookieAccessToken === "string" ? cookieAccessToken : null;
  }

  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const [getCurrentUser, { loading }] = useGetCurrentUserLazyQuery();
  const showLoader = loading || (accessToken && !user);
  const redirectToSignIn = async () => {
    const currentRoute = Router.route;

    if (currentRoute !== appPathNames.SIGN_IN || currentRoute !== appPathNames.LOGIN_INFO) {
      await Router.push(`/${appPathNames.SIGN_IN}`);
    }
  };

  useEffect(() => {
    (async () => {
      if (!user && !accessToken) {
        await redirectToSignIn();
      }

      if (!user && accessToken) {
        const { data } = await getCurrentUser();

        if (!data) {
          dispatch(userLogOut());
          return await redirectToSignIn();
        }

        dispatch(setCurrentUser(data));
        const members = data.currentUser?.members?.length;

        await Router.push(members ? currentPath : appPathNames.LOGIN_INFO);
      }

      if (user && accessToken) {
        const members = user?.members?.length;

        if (currentPath === `/${appPathNames.SIGN_IN}`) {
          await Router.push(members ? appPathNames.DASHBOARD : appPathNames.LOGIN_INFO);
          return;
        }
        await Router.push(members ? currentPath : appPathNames.LOGIN_INFO);
      }
    })();
  }, [accessToken, currentPath, dispatch, getCurrentUser, user]);

  return { showLoader, user };
};

export default useAuth;
