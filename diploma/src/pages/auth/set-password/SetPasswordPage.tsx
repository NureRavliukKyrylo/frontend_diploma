import { PasswordForm } from "@features/auth";
import { AdditionalWrapper } from "@shared/ui/wrappers";

export function SetPasswordPage() {
  return (
    <AdditionalWrapper
      title="Create your password"
      description="Choose a secure password to protect your account. Make sure it’s strong and unique"
    >
      <PasswordForm />
    </AdditionalWrapper>
  );
}
