export interface Classes {
  root?: string;
  content?: string;
  label?: string;
}

export type LoaderPosition = "absolute" | "fixed";

export interface Props {
  isVisible: boolean;
  progressSize?: number;
  classes?: Classes;
  loaderPosition?: LoaderPosition;
  label?: string;
}
