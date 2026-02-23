const AUTH_ROOT = "/auth" as const;
const FORGOT_ROOT = `${AUTH_ROOT}/forgot-password` as const;

export const AuthRoutes = {
  root: AUTH_ROOT,
  default: "/",
  verification: {
    email: `${AUTH_ROOT}/verification-email`,
    twoFactor: `${AUTH_ROOT}/verification-two-factor`,
  },
  forgotPassword: {
    root: FORGOT_ROOT,
    verification: `${FORGOT_ROOT}/verification`,
    setPassword: `${FORGOT_ROOT}/set-password`,
  },
} as const;
