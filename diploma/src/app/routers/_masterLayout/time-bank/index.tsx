import { TimeBankPage } from "@pages/offers";
import { timeBankSearchDefaults, timeBankSearchSchema } from "@pages/offers";
import { createFileRoute } from "@tanstack/react-router";
import { createTabCleanerMiddleware } from "@shared/libs/search-params";

export const Route = createFileRoute("/_masterLayout/time-bank/")({
  validateSearch: timeBankSearchSchema,
  search: {
    middlewares: [createTabCleanerMiddleware(timeBankSearchDefaults, "offers")],
  },
  component: TimeBankPage,
});
