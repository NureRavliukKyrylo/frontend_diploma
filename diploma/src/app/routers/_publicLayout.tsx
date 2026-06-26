import { IndexLayout } from "@app/layouts";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_publicLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <IndexLayout>
      <Outlet />
    </IndexLayout>
  );
}
