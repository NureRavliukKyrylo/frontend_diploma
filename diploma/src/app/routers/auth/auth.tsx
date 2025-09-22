import { createRoute } from "@tanstack/react-router";
import { authRoute } from "./index";
import { AuthWidgetForm } from "../../../widgets/auth";

export const authDefaultRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/",
  component: () => <AuthWidgetForm />,
});
