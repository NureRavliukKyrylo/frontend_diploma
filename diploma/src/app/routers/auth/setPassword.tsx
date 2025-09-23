import { createRoute } from "@tanstack/react-router";
import { authRoute } from "./index";
import { SetPasswordPage } from "../../../pages/auth";

export const setPasswordRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "set-password",
  component: () => <SetPasswordPage />,
});
