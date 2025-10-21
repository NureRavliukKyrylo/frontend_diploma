export const AuthRoutes = {
  root: "auth",
  default: "/",
  verification: "verification",
  forgotPassword: {
    root: "forgot-password",
    verification: "verification",
    setPassword: "set-password",
  },
} as const;
