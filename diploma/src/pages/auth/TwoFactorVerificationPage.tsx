import { TwoFactorVerificationForm } from "@features/auth";
import { AdditionalForm } from "@shared/ui/layouts";

export function TwoFactorVerificationPage() {
  return (
    <AdditionalForm
      title="Two-Factor Authentication"
      description="We’ve sent a 6-digit code to your email. Please enter it below to continue"
    >
      <TwoFactorVerificationForm />
    </AdditionalForm>
  );
}
