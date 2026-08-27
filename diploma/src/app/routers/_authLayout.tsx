import { AuthLayout } from "@app/layouts";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authLayout")({
  component: AuthLayoutComponent,
});

function AuthLayoutComponent() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
