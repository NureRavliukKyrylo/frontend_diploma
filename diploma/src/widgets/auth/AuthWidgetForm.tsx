import { AuthWrapper } from "@shared/ui/wrappers";
import { LoginForm, SignUpForm } from "@features/auth";

export function AuthWidgetForm() {
  return <AuthWrapper signupForm={<SignUpForm />} signinForm={<LoginForm />} />;
}
