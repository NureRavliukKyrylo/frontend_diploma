import { createFileRoute } from "@tanstack/react-router";
import { EmailVerificationPage } from "@pages/verification";

export const Route = createFileRoute("/_authLayout/auth/verification-email")({
  component: EmailVerificationPage,
});
