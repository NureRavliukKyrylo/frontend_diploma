import { OfferPage } from "@pages/offers";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/offers/$id/")({
  component: OfferPage,
});
