import { MainProfilePage, MainProfilePageSkeleton } from "@pages/profile";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_masterLayout/profile/")({
  component: MainProfilePage,
  pendingComponent: MainProfilePageSkeleton,
});
