import { useUserStore } from "@entities/user";
import { profileQuery } from "@entities/user/profile";
import { AdminAccessPoliciesPage } from "@pages/admin";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_adminLayout/admin/access-policies/")({
  beforeLoad: async ({ context: { queryClient } }) => {
    try {
      const profile = await queryClient.fetchQuery(profileQuery.all());
      useUserStore.getState().setSystemRole(profile.roleName);

      if (profile.roleName !== "SuperAdmin") {
        throw redirect({ to: "/admin" });
      }
    } catch (error) {
      if (error instanceof Response) {
        throw error;
      }

      throw redirect({ to: "/admin" });
    }
  },
  component: AdminAccessPoliciesPage,
});
