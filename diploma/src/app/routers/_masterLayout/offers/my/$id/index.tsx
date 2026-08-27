import { myOfferDetailDefaults, myOfferSearchSchema } from "@entities/offer";
import { MyOfferPage, MyOfferPageSkeleton } from "@pages/offers";
import { createTabCleanerMiddleware } from "@shared/libs/search-params";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/offers/my/$id/")({
  validateSearch: myOfferSearchSchema,
  search: {
    middlewares: [
      createTabCleanerMiddleware(myOfferDetailDefaults, "overview"),
    ],
  },
  component: MyOfferPage,
  pendingComponent: MyOfferPageSkeleton,
});
