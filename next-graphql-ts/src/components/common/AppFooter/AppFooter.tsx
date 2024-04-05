import React from "react";
import { useIntl } from "react-intl";
// STYLES
import styles from "./styles.module.scss";
// COMPONENTS
import FooterNav from "./components/FooterNav/FooterNav";
import AppLangSwitcher from "@/components/common/AppLangSwitcher/AppLangSwitcher";

const AppFooter = () => {
  const intl = useIntl();
  const apple = intl.formatMessage({ id: "app.apple" });

  return (
    <div className={styles.Footer}>
      <div className={styles.FooterLeft}>
        <div className={styles.FooterCopyright}>2020 © {apple}</div>
        <AppLangSwitcher />
      </div>

      <FooterNav />
    </div>
  );
};

export default AppFooter;
