export const AuthRoutes = {
  root: "/auth",
  default: "/",
  twoFactor: "two-factor-verification",
  verification: "verification",
  forgotPassword: {
    root: "forgot-password",
    verification: "verification",
    setPassword: "set-password",
  },
} as const;
