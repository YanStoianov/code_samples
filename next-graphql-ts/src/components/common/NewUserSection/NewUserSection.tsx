import React from "react";
import { useIntl } from "react-intl";
// STYLES
import styles from "./styles.module.scss";

const NewUserSection = () => {
  const intl = useIntl();

  return (
    <div className={styles.SignUpSection}>
      <div className={styles.SignUpSectionHeader}>
        {intl.formatMessage({ id: "auth.newToApple" })}
      </div>
      <div className={styles.SignUpSectionContent}>
        {intl.formatMessage({ id: "auth.downloadAppleApp" })}
      </div>
    </div>
  );
};

export default NewUserSection;
