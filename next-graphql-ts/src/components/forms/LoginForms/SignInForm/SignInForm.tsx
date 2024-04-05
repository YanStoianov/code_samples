import React, { useState } from "react";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { FormikValues } from "formik";
// CONSTANTS
import { signInFormConstants } from "./constants";
import { appPathNames } from "@/constants/appConstants";
// Gql
import { useLogInMutation, User } from "@/graphql/generated/schema";
// TYPES
import { PasswordFormValues } from "./types";
import { LoginFormProps } from "@/components/forms/LoginForms/types";
// STYLES
import styles from "../styles.module.scss";
// STORE
import { userLogIn } from "@/store/user/userSlice";
// COMPONENTS
import ApLoader from "@/components/loaders/ApLoader/ApLoader";
import EmailForm from "./components/EmailForm/EmailForm";
import PasswordForm from "./components/PasswordForm/PasswordForm";

const SignInForm = ({ setSignInFormType }: LoginFormProps) => {
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState<User>({
    email: "",
    verified: false,
  });

  const [logIn, { loading: logInLoading }] = useLogInMutation();

  const handleSigInWithPhoneNumber = () => {
    setSignInFormType("phone");
  };

  const handleLogin = async ({ password }: PasswordFormValues, { setFieldError }: FormikValues) => {
    try {
      const { data } = await logIn({
        variables: {
          User: {
            password,
            username: userEmail?.email ?? "",
          },
        },
      });

      if (data) {
        await dispatch(userLogIn(data));
        await Router.push(appPathNames.DASHBOARD);
      }
    } catch (e) {
      if (e instanceof Error) {
        setFieldError(signInFormConstants.PASSWORD, e.message);
      }
    }
  };

  const handleBackToEmailForm = () => {
    setUserEmail((prevState) => ({ ...prevState, verified: false }));
  };

  return (
    <div className={styles.SignInForm}>
      <ApLoader isVisible={logInLoading} />
      {!userEmail.verified && (
        <EmailForm
          email={userEmail?.email ?? ""}
          setUserEmail={setUserEmail}
          handleSigInWithPhoneNumber={handleSigInWithPhoneNumber}
          initialValues={{ email: userEmail?.email ?? "" }}
        />
      )}
      {userEmail.verified && (
        <PasswordForm
          handleBackToEmailForm={handleBackToEmailForm}
          email={userEmail?.email ?? ""}
          initialValues={{ password: "" }}
          onSubmit={handleLogin}
        />
      )}
    </div>
  );
};

export default SignInForm;
