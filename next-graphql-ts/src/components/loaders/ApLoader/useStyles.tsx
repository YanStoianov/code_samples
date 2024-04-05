import classNames from "classnames";
import { Classes, LoaderPosition } from "./types";
import styles from "./styles.module.scss";

const useStyles = (classes: Classes, loaderPosition: LoaderPosition) => {
  const root = classNames({
    [styles.ApLoader]: true,
    [styles.ApLoaderAbsolute]: loaderPosition === "absolute",
    [`${classes.root}`]: classes.root,
  });

  const content = classNames({
    [styles.ApLoaderContent]: true,
    [`${classes.content}`]: classes.content,
  });

  const label = classNames({
    [styles.ApLoaderLabel]: true,
    [`${classes.content}`]: classes.label,
  });

  return {
    root,
    content,
    label,
  };
};

export default useStyles;
