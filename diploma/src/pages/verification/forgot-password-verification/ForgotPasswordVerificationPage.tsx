import { useAuthStore } from "@entities/user";
import { ForgotPasswordVerificationForm } from "@features/verification";
import { AdditionalWrapper } from "@shared/ui/wrappers";

export function ForgotPasswordVerificationPage() {
  const { emailForgotPassword } = useAuthStore();
  return (
    <AdditionalWrapper
      title="Email Verification"
      description={`We’ve sent a 6-digit code to your email ${emailForgotPassword}. Please enter it below to continue`}
    >
      <ForgotPasswordVerificationForm />
    </AdditionalWrapper>
  );
}
