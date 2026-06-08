import { myOfferDetailDefaults, myOfferSearchSchema } from "@entities/offer";
import { MyOfferPage } from "@pages/offers/my-offer-page/overview-tab";
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
});
