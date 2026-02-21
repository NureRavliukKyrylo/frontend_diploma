import { type VerificationModalType } from "@entities/user/profile";
import { TwoFactorVerificationContent } from "../../set-two-factor";
import {
  ChangePasswordVerificationContent,
  ResetPasswordVerificationContent,
} from "../../change-password";
import {
  ChangeEmailVerificationContent,
  NewEmailVerificationContent,
} from "../../change-email";

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
      1: <ChangeEmailVerificationContent />,
      2: <NewEmailVerificationContent />,
      3: <ChangeEmailVerificationContent />,
    },
  },
  changePassword: {
    steps: {
      1: <ChangePasswordVerificationContent />,
      2: <ResetPasswordVerificationContent />,
    },
  },
};
