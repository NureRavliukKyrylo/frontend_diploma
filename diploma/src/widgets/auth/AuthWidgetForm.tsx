import { AuthForm } from "../../shared/layouts/auth";
import { LoginForm, SignUpForm } from "../../features/auth";

export function AuthWidgetForm() {
  return <AuthForm signupForm={<SignUpForm />} signinForm={<LoginForm />} />;
}
