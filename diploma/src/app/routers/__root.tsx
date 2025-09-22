import { createRootRoute, Outlet } from "@tanstack/react-router";
import { BaseLayout } from "../../shared/layouts";

export const rootRoute = createRootRoute({
  component: () => (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  ),
});
