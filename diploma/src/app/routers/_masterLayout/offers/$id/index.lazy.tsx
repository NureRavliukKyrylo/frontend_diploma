import { OfferPageSkeleton } from "@pages/offers";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_masterLayout/offers/$id/")({
  pendingComponent: OfferPageSkeleton,
});
