import { createRoute } from "@tanstack/react-router";
import { FillingInfoFormPage } from "../../../pages/auth";
import { rootRoute } from "../__root";
import { MultiStepFormRoutes } from "../../../shared/routes";

export const fillingInfoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: MultiStepFormRoutes.fillForm,
  component: () => <FillingInfoFormPage />,
});
