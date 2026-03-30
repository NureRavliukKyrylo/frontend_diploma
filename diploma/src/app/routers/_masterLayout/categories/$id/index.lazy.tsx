import {
  CategoryDetailPage,
  CategoryDetailPageSkeleton,
} from "@pages/categories";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_masterLayout/categories/$id/")({
  component: CategoryDetailPage,
  pendingComponent: CategoryDetailPageSkeleton,
});
