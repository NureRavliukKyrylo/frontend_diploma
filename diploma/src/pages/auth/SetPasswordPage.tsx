import { PasswordForm } from "@features/auth";
import { AdditionalForm } from "@shared/ui/layouts";

export function SetPasswordPage() {
  return (
    <AdditionalForm
      title="Create your password"
      description="Choose a secure password to protect your account. Make sure it’s strong and unique"
    >
      <PasswordForm />
    </AdditionalForm>
  );
}
