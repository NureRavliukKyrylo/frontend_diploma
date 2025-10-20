import { AuthForm } from "@shared/ui/layouts";
import { LoginForm, SignUpForm } from "@features/auth";

export function AuthWidgetForm() {
  return <AuthForm signupForm={<SignUpForm />} signinForm={<LoginForm />} />;
}
