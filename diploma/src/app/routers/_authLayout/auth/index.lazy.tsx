import { createLazyFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@pages/auth";

export const Route = createLazyFileRoute("/_authLayout/auth/")({
  component: AuthPage,
});
