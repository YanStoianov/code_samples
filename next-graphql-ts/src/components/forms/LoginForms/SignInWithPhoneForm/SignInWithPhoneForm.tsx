import React, { useState } from "react";
import { FormikValues } from "formik";
import { useDispatch } from "react-redux";
import Router from "next/router";
import { useIntl } from "react-intl";
// CONSTANTS
import { signinWithMobileFormConstants } from "@/components/forms/LoginForms/SignInWithPhoneForm/constants";
import { appPathNames } from "@/constants/appConstants";
// TYPES
import {
  CodeValues,
  PhoneNumberValues,
  UserPhoneNumber,
} from "@/components/forms/LoginForms/SignInWithPhoneForm/types";
import { LoginFormProps } from "@/components/forms/LoginForms/types";
//Gql
import { useLogInMutation, useSendPhoneOtpMutation } from "@/graphql/generated/schema";
// STORE
import { userLogIn } from "@/store/user/userSlice";
// STYLES
import styles from "../styles.module.scss";
// COMPONENTS
import ApLoader from "@/components/loaders/ApLoader/ApLoader";
import FormHeader from "@/components/common/FormHeader/FormHeader";
import PhoneNumberForm from "@/components/forms/LoginForms/SignInWithPhoneForm/components/PhoneNumberForm/PhoneNumberForm";
import SubActionButton from "@/components/buttons/SubActionButton/SubActionButton";
import ItemForm from "@/components/forms/LoginForms/SignInWithPhoneForm/components/ItemForm/ItemForm";

const SignInWithPhoneForm = ({ setSignInFormType }: LoginFormProps) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState<UserPhoneNumber>({
    phone: "",
    isValid: false,
  });

  const [sendPhoneOtp, { loading }] = useSendPhoneOtpMutation();
  const [logIn, { loading: logInLoading }] = useLogInMutation();

  const handleSigInWithEmail = () => {
    setSignInFormType("email");
  };

  const handleSendPhoneNumber = async (
    { phone }: PhoneNumberValues,
    { setFieldError }: FormikValues,
  ) => {
    try {
      const { data } = await sendPhoneOtp({
        variables: {
          number: phone,
        },
      });

      setPhoneNumber({
        phone,
        isValid: data?.sendPhoneOtp ?? false,
      });
    } catch (e) {
      if (e instanceof Error) {
        setFieldError(signinWithMobileFormConstants.PHONE, e.message);
      }
    }
  };

  const handleLogin = async ({ code }: CodeValues, { setFieldError }: FormikValues) => {
    try {
      const { data } = await logIn({
        variables: {
          User: {
            password: code,
            username: phoneNumber?.phone ?? "",
            type: "mobile",
          },
        },
      });

      if (data) {
        await dispatch(userLogIn(data));

        await Router.push(appPathNames.DASHBOARD);
      }
    } catch (e) {
      if (e instanceof Error) {
        setFieldError(signinWithMobileFormConstants.CODE, e.message);
      }
    }
  };

  return (
    <div className={styles.SignInForm}>
      <ApLoader isVisible={loading || logInLoading} />
      <FormHeader title={intl.formatMessage({ id: "auth.signIn" })} />
      {!phoneNumber.isValid && (
        <PhoneNumberForm onSubmit={handleSendPhoneNumber} initialValues={{ phone: "" }} />
      )}
      {phoneNumber.isValid && (
        <ItemForm phone={phoneNumber.phone} onSubmit={handleLogin} initialValues={{ code: "" }} />
      )}
      <div className={styles.ItemFormSubmitContainer}>
        <SubActionButton
          onClick={handleSigInWithEmail}
          type={"button"}
          label={intl.formatMessage({ id: "auth.signInWithEmailAddress" })}
        />
      </div>
    </div>
  );
};

export default SignInWithPhoneForm;
