import { EmailVerificationForm } from "@features/verification";
import { AdditionalWrapper } from "@shared/ui/wrappers";

export function EmailVerificationPage() {
  return (
    <AdditionalWrapper
      title="Email Verification"
      description="We’ve sent a 6-digit code to your email. Please enter it below to continue"
    >
      <EmailVerificationForm />
    </AdditionalWrapper>
  );
}
