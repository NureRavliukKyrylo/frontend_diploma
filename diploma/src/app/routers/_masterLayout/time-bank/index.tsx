import {
  TimeBankPage,
  timeBankTabConfig,
  type TimeBankMode,
} from "@pages/offers";
import { timeBankSearchDefaults, timeBankSearchSchema } from "@pages/offers";
import { createFileRoute } from "@tanstack/react-router";
import { createTabCleanerMiddleware } from "@shared/libs/search-params";

export const Route = createFileRoute("/_masterLayout/time-bank/")({
  validateSearch: timeBankSearchSchema,
  search: {
    middlewares: [
      createTabCleanerMiddleware(timeBankSearchDefaults, "overview"),
    ],
  },
  component: TimeBankPage,
  loader: async ({ context: { queryClient }, location }) => {
    const tab = (location.search as { tab?: TimeBankMode }).tab ?? "overview";
    const config = timeBankTabConfig[tab];
    await config.ensure(queryClient);
    config.prefetch(queryClient);
  },
});
