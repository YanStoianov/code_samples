import React from "react";
import classNames from "classnames";
// TYPES
import { CustomButtonProps } from "./types";
// STYLES
import styles from "./styles.module.scss";

const ApButton = ({ title, icon, classes, className, ...props }: CustomButtonProps) => {
  const rootClass = classNames({
    [styles.SubmitButton]: true,
    [`${classes?.root}`]: classes?.root,
    [`${className}`]: className,
  });

  const titleClass = classNames({
    [styles.SubmitButtonTitle]: true,
    [`${classes?.title}`]: classes?.title,
  });

  const iconContainerClass = classNames({
    [`${classes?.iconContainer}`]: classes?.iconContainer,
  });

  return (
    <button className={rootClass} {...props}>
      {title && <span className={titleClass}>{title}</span>}
      {icon && <div className={iconContainerClass}>{icon}</div>}
    </button>
  );
};

export default ApButton;
