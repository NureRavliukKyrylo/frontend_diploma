import { IndexLayout } from "@app/layouts";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_noFooterLayout")({
  component: NoFooterLayoutComponent,
});

function NoFooterLayoutComponent() {
  return (
    <IndexLayout showFooter={false}>
      <Outlet />
    </IndexLayout>
  );
}
