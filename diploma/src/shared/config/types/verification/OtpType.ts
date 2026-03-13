export const OtpType = {
  EmailVerification: 0,
  TwoFactor: 1,
  PasswordReset: 2,
};

export type OtpType = (typeof OtpType)[keyof typeof OtpType];
