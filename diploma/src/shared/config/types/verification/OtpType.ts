export const OtpType = {
  EmailVerification: 0,
  TwoFactor: 1,
  PasswordReset: 2,
  ChangeEmailOld: 3,
  ChangeEmailNew: 4,
  PasswordChange: 5,
  GoogleUnlink: 6,
  DisableTwoFactor: 7,
};

export type OtpType = (typeof OtpType)[keyof typeof OtpType];
