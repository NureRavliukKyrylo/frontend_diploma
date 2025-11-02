import { TwoFactorVerificationForm } from "@features/verification";
import { AdditionalWrapper } from "@shared/ui/wrappers";

export function TwoFactorVerificationPage() {
  return (
    <AdditionalWrapper
      title="Two-Factor Authentication"
      description="We’ve sent a 6-digit code to your email. Please enter it below to continue"
    >
      <TwoFactorVerificationForm />
    </AdditionalWrapper>
  );
}
