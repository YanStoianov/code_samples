import { ButtonHTMLAttributes } from "react";

interface Classes {
  root?: string | unknown;
}

interface ApButtonProps {
  label: string;
  classes?: Classes;
}

export type CustomButtonProps = ApButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;
