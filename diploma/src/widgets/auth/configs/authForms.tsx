import type { AuthMode } from "@entities/user";
import { LoginForm, SignUpForm } from "@features/auth";

export const authForms: Record<AuthMode, React.ReactNode> = {
  signup: <SignUpForm />,
  signin: <LoginForm />,
};
