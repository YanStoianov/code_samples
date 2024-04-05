import React from "react";
// MUI
import { CircularProgress } from "@mui/material";
// TYPES
import { Props } from "./types";
// STYLES
import useStyles from "./useStyles";

const ApLoader = ({
  isVisible,
  progressSize = 60,
  loaderPosition = "fixed",
  classes = {
    root: "",
    content: "",
    label: "",
  },
  label = "",
}: Props) => {
  const styles = useStyles(classes, loaderPosition);

  if (!isVisible) return null;
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <CircularProgress size={progressSize} />
      </div>

      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
};

export default ApLoader;
