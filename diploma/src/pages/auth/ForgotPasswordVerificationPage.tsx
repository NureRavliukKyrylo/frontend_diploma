import { useAuthStore } from "@entities/user";
import { ForgotPasswordVerificationForm } from "@features/auth";
import { AdditionalForm } from "@shared/ui/layouts";

export function ForgotPasswordVerificationPage() {
  const { emailForgotPassword } = useAuthStore();
  return (
    <AdditionalForm
      title="Email Verification"
      description={`We’ve sent a 6-digit code to your email ${emailForgotPassword}. Please enter it below to continue`}
    >
      <ForgotPasswordVerificationForm />
    </AdditionalForm>
  );
}
