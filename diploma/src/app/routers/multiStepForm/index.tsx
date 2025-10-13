import { createRoute } from "@tanstack/react-router";
import { FillingInfoFormPage } from "../../../pages/auth";
import { rootRoute } from "../__root";

export const fillingInfoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/filling-info-form",
  component: () => <FillingInfoFormPage />,
});
