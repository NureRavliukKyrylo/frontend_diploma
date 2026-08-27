import { AdminBansPage } from "@pages/admin";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_adminLayout/admin/bans/")({
  component: AdminBansPage,
});
