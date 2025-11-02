import { ForgotPasswordForm } from "@features/auth";
import { AdditionalWrapper } from "@shared/ui/wrappers";

export function ForgotPasswordPage() {
  return (
    <AdditionalWrapper
      title="Forgot password?"
      description="Enter your email address below and we’ll send you a 6-digit verification code to reset your password."
    >
      <ForgotPasswordForm />
    </AdditionalWrapper>
  );
}
