export type FormType = "email" | "phone";

export interface LoginFormProps {
  setSignInFormType: (formType: FormType) => void;
}
