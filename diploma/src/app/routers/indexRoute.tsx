import { rootRoute } from "./__root";
import { createRoute } from "@tanstack/react-router";
import { StepperFormWidget } from "../../widgets/auth";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <StepperFormWidget />,
});
