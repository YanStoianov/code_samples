import React from "react";
import { GetServerSideProps } from "next/types";
import useAuth, { AuthProps } from "@/hooks/useAuth";
import { getCookie } from "cookies-next";
import { useIntl } from "react-intl";
// COMPONENTS
import LogIn from "@/components/common/LogIn/LogIn";
import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import ApLoader from "@/components/loaders/ApLoader/ApLoader";
// CONSTANTS
import { userConstants } from "@/store/user/constants";

const SignIn = (props: AuthProps) => {
  const { accessToken } = props;
  const { showLoader, user } = useAuth({ accessToken });

  const intl = useIntl();

  const title = intl.formatMessage({ id: "auth.signIn" });

  if (showLoader || user) {
    return <ApLoader isVisible={true} />;
  }

  return (
    <AuthLayout title={title} description={"Apple | signin"}>
      <LogIn />
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      accessToken: getCookie(userConstants.ACCESS_TOKEN, context) || null,
    },
  };
};

export default SignIn;
