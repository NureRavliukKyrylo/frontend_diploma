import { ForgotPasswordForm } from "@features/auth";
import { AdditionalForm } from "@shared/ui/layouts";

export function ForgotPasswordPage() {
  return (
    <AdditionalForm
      title="Forgot password?"
      description="Enter your email address below and we’ll send you a 6-digit verification code to reset your password."
    >
      <ForgotPasswordForm />
    </AdditionalForm>
  );
}
