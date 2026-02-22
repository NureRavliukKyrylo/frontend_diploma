import { IndexLayout } from "@app/layouts";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout")({
  component: MasterLayoutComponent,
});

function MasterLayoutComponent() {
  return (
    <IndexLayout>
      <Outlet />
    </IndexLayout>
  );
}
