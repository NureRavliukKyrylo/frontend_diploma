import { createRootRoute, Outlet } from "@tanstack/react-router";
import { BaseLayout } from "@app/layouts";

export const rootRoute = createRootRoute({
  component: () => (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  ),
});

