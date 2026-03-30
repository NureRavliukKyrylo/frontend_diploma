import { createLazyFileRoute } from "@tanstack/react-router";
import { SetPasswordPage } from "@pages/auth";

export const Route = createLazyFileRoute(
  "/_authLayout/auth/forgot-password/set-password",
)({
  component: SetPasswordPage,
});
