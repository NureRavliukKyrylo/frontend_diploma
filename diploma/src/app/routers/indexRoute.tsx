import { rootRoute } from "./__root";
import { createRoute } from "@tanstack/react-router";
import { FillingInfoFormPage } from "../../pages/auth";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <FillingInfoFormPage />,
});
