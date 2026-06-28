import { AdminLayout } from "@app/layouts";
import { useUserStore } from "@entities/user";
import { profileQuery } from "@entities/user/profile";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

const adminRoles = new Set(["Moderator", "Admin", "SuperAdmin"]);

export const Route = createFileRoute("/_adminLayout")({
  beforeLoad: async ({ context: { queryClient } }) => {
    const { isAuthenticated } = useUserStore.getState();

    if (!isAuthenticated) {
      throw redirect({ to: "/auth" });
    }

    let resolvedRole: string | undefined;

    try {
      const profile = await queryClient.fetchQuery(profileQuery.all());
      resolvedRole = profile.roleName;
      useUserStore.getState().setSystemRole(resolvedRole);
    } catch {
      throw redirect({ to: "/auth" });
    }

    if (!resolvedRole || !adminRoles.has(resolvedRole)) {
      throw redirect({ to: "/activities" });
    }
  },
  component: AdminLayoutComponent,
});

function AdminLayoutComponent() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
