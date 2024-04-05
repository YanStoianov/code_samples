import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
// MUI
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
// STORE
import { getNotification } from "@/store/settings/selectors";
import { setNotification } from "@/store/settings/settingsSlice";
// STYLES
import styles from "./styles.module.scss";

const ApNotification = () => {
  const dispatch = useDispatch();
  const notificationState = useSelector(getNotification);

  const isError = notificationState.type === "error";

  const rootClass = classNames({
    [styles.ApNotification]: true,
    [styles.ApNotificationTransparent]: notificationState.transparent,
    [styles.ApNotificationError]: isError,
  });

  const messageClass = classNames({
    [styles.ApNotificationMessage]: true,
    [styles.ApNotificationMessageError]: isError,
  });
  const actionClass = classNames({
    [styles.ApNotificationAction]: true,
    [styles.ApNotificationActionErrorTransparent]: isError && notificationState.transparent,
    [styles.ApNotificationActionError]: isError,
  });

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(
      setNotification({
        open: false,
        text: notificationState.text,
        type: notificationState.type,
      }),
    );
  };

  const action = (
    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
      ok
    </IconButton>
  );
  return (
    <Snackbar
      open={notificationState.open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={notificationState.text}
      action={action}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      classes={{
        root: styles.Snackbar,
      }}
      ContentProps={{
        classes: {
          root: rootClass,
          message: messageClass,
          action: actionClass,
        },
      }}
    />
  );
};

export default ApNotification;
