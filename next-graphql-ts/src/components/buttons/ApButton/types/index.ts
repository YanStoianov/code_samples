import { ButtonHTMLAttributes, ReactNode } from "react";

interface Classes {
  root?: string | undefined;
  title?: string | undefined;
  iconContainer?: string | undefined;
}

interface ApButtonProps {
  title?: string;
  icon?: ReactNode;
  classes?: Classes;
}

export type CustomButtonProps = ApButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;
