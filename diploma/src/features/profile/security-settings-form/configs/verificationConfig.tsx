import { type VerificationModalType } from "@entities/user/profile";
import { TwoFactorVerificationContent } from "../ui/content/TwoFactorVerificationContent";
import { ChangePasswordVerificationContent } from "../ui/content/ChangePasswordVerificationContent";

export const verificationConfig: Record<
  Exclude<VerificationModalType, null>,
  {
    steps: Record<number, React.ReactNode>;
  }
> = {
  twoFactor: {
    steps: {
      1: <TwoFactorVerificationContent />,
    },
  },
  emailVerification: {
    steps: {
      1: <TwoFactorVerificationContent />,
    },
  },
  changePassword: {
    steps: {
      1: <ChangePasswordVerificationContent />,
    },
  },
};
