import { createRootRoute, Outlet } from "@tanstack/react-router";
import { BaseLayout } from "../../shared/ui/layouts";
import { useErrorStore } from "@shared/config";

export const rootRoute = createRootRoute({
  beforeLoad: () => {
    const { clearAllErrors } = useErrorStore.getState();
    clearAllErrors();
  },
  component: () => (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  ),
});
