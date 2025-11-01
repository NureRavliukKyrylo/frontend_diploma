import { EmailVerificationForm } from "@features/auth";
import { AdditionalForm } from "@shared/ui/layouts";

export function EmailVerificationPage() {
  return (
    <AdditionalForm
      title="Email Verification"
      description="We’ve sent a 6-digit code to your email. Please enter it below to continue"
    >
      <EmailVerificationForm />
    </AdditionalForm>
  );
}
