import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/reports")({
  beforeLoad: ({ context }) => {
    const role = context.role;
    if (role !== "Moderator" && role !== "Admin" && role !== "SuperAdmin") {
      throw redirect({ to: "/403" });
    }
  },
});
