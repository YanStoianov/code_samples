import React from "react";
import { useIntl } from "react-intl";
// STYLES
import styles from "./styles.module.scss";
// COMPONENTS
import FormHeader from "@/components/common/FormHeader/FormHeader";
import SubActionButton from "@/components/buttons/SubActionButton/SubActionButton";

interface Props {
  handleLogOut: () => void;
}

const LogOut = ({ handleLogOut }: Props) => {
  const intl = useIntl();

  return (
    <div className={styles.LogOut}>
      <FormHeader
        classes={{
          root: styles.LogOutHeader,
          title: styles.LogOutHeaderTitle,
        }}
        title={intl.formatMessage({ id: "auth.noAccessToStores" })}
        subTitle={""}
      />
      <div className={styles.LogOutContent}>
        {intl.formatMessage({ id: "auth.contactYourAdministrator" })}
      </div>
      <div className={styles.LogOutHeaderLogoutButtonContainer}>
        <SubActionButton
          onClick={handleLogOut}
          type={"button"}
          label={intl.formatMessage({ id: "auth.signOut" })}
        />
      </div>
    </div>
  );
};

export default LogOut;
