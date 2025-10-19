import { createRootRoute, Outlet } from "@tanstack/react-router";
import { BaseLayout } from "../../shared/ui/layouts";

export const rootRoute = createRootRoute({
  component: () => (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  ),
});
