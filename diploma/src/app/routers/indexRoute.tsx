import { rootRoute } from "./__root";
import { createRoute } from "@tanstack/react-router";
import App from "../../App";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: App,
});
