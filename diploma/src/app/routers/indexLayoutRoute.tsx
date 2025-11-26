import { rootRoute } from "./__root";
import { createRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { IndexLayout } from "@app/layouts";

export const indexLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "index-layout",
  component: () => (
    <IndexLayout>
      <Outlet />
    </IndexLayout>
  ),
});
