import React from "react";
import Head from "next/head";
// TYPES
import { LayoutBaseProps } from "../types";
// HOOKS
import useWindowSize from "@/hooks/useWindowSize";
// STYLES
import styles from "./styles.module.scss";
// COMPONENTS
import ErrorBoundary from "@/components/common/ErrorBoundary/ErrorBoundary";
import Logo from "@/components/common/Logo/Logo";
import AppFooter from "@/components/common/AppFooter/AppFooter";
import ApNotification from "@/components/common/ApNotification/ApNotification";
import DownloadApple from "@/components/common/DownloadApple/DownloadApple";
import ApLoader from "@/components/loaders/ApLoader/ApLoader";

const AuthLayout = ({ children, title, description }: LayoutBaseProps) => {
  const { isMobile } = useWindowSize();

  if (isMobile === undefined) return <ApLoader isVisible={true} />;
  return (
    <div className={styles.AuthLayout}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <ErrorBoundary>
        <main className={styles.AuthMainContent}>
          <Logo className={styles.AuthLogo} />
          {isMobile ? <DownloadApple withLogo={false} /> : children}
        </main>
        <div className={styles.AuthFooter}>
          <AppFooter />
        </div>
        <ApNotification />
      </ErrorBoundary>
    </div>
  );
};

export default AuthLayout;
