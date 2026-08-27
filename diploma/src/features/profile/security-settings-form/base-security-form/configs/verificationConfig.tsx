import { type VerificationModalType } from "@entities/user/profile";
import {
  TwoFactorDisableVerificationContent,
  TwoFactorEnableVerificationContent,
} from "../../set-two-factor";
import {
  ChangePasswordVerificationContent,
  ResetPasswordVerificationContent,
} from "../../change-password";
import {
  ChangeEmailVerificationContent,
  NewEmailVerificationContent,
} from "../../change-email";
import { UnlinkVerificationContent } from "../../connected-links";

export const verificationConfig: Record<
  Exclude<VerificationModalType, null>,
  {
    steps: Record<number, React.ReactNode>;
  }
> = {
  twoFactorEnable: {
    steps: {
      1: <TwoFactorEnableVerificationContent />,
    },
  },
  twoFactorDisable: {
    steps: { 1: <TwoFactorDisableVerificationContent /> },
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
  unlink: {
    steps: {
      1: <UnlinkVerificationContent />,
    },
  },
};
