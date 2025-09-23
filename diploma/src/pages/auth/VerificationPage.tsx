import { VerificationForm } from "../../features/auth";
import { AdditionalForm } from "../../shared/layouts/auth";

export function VerificationPage() {
  return (
    <AdditionalForm
      title="Check your email"
      description="We’ve sent a 6-digit code to your email. Please enter it below to continue"
    >
      <VerificationForm />
    </AdditionalForm>
  );
}
