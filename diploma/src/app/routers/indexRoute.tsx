import { rootRoute } from "./__root";
import { createRoute } from "@tanstack/react-router";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <>
      <h1>test</h1>
    </>
  ),
});
