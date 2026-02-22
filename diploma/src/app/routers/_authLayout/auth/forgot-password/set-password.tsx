import { createFileRoute } from "@tanstack/react-router";
import { SetPasswordPage } from "@pages/auth";

export const Route = createFileRoute(
  "/_authLayout/auth/forgot-password/set-password",
)({
  component: SetPasswordPage,
});
