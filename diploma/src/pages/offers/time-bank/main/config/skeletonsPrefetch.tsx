import { offerQuery } from "@entities/offer";
import { skillsQuery } from "@entities/skill";
import { categoryQuery } from "@entities/category";
import { profileQuery } from "@entities/user/profile";
import { queryClient } from "@shared/api";
import type { TimeBankMode } from "./TimeBankMode";
import type { QueryClient } from "@tanstack/react-query";
import { OverviewTabSkeleton } from "../../overview";
import { OffersTabSkeleton } from "../../offers";
import { MyOffersTabSkeleton } from "../../my-offers";
import { BookingsTabSkeleton } from "../../bookings";
import { TransactionsTabSkeleton } from "../../transactions";
import { filtersQuery } from "@shared/api/filters";

type TabConfig = {
  skeleton: React.FC;
  ensure: (qc: QueryClient) => Promise<unknown>;
  prefetch: (qc: QueryClient) => void;
};

export const timeBankTabConfig: Record<TimeBankMode, TabConfig> = {
  overview: {
    skeleton: OverviewTabSkeleton,
    ensure: (qc) => qc.ensureQueryData(offerQuery.stats()),
    prefetch: (qc) => {
      qc.prefetchQuery(profileQuery.all());
      qc.prefetchQuery(
        offerQuery.list({ OrderBy: "Default", Page: 1, PageSize: 12 }),
      );
    },
  },

  offers: {
    skeleton: OffersTabSkeleton,
    ensure: (qc) =>
      Promise.allSettled([
        qc.ensureQueryData(profileQuery.all()),
        qc.ensureQueryData(
          offerQuery.list({ OrderBy: "Default", Page: 1, PageSize: 12 }),
        ),
      ]),
    prefetch: (qc) => {
      qc.prefetchInfiniteQuery(skillsQuery.infinite({ PageSize: 7 }));
      qc.prefetchInfiniteQuery(categoryQuery.infinite({ PageSize: 7 }));
      qc.prefetchInfiniteQuery(
        filtersQuery.infiniteFilterOffers({
          pageSize: 7,
          facetType: "skill",
          scope: "user",
        }),
      );
      qc.prefetchInfiniteQuery(
        filtersQuery.infiniteFilterOffers({
          pageSize: 7,
          facetType: "category",
          scope: "user",
        }),
      );
    },
  },

  "my-offers": {
    skeleton: MyOffersTabSkeleton,
    ensure: (qc) =>
      qc.ensureQueryData(
        offerQuery.my({ OrderBy: "Default", Page: 1, PageSize: 12 }),
      ),
    prefetch: (qc) => {
      qc.prefetchInfiniteQuery(skillsQuery.infinite({ PageSize: 7 }));
      qc.prefetchInfiniteQuery(categoryQuery.infinite({ PageSize: 7 }));
      qc.prefetchInfiniteQuery(
        filtersQuery.infiniteFilterOffers({
          pageSize: 7,
          facetType: "skill",
          scope: "owner",
        }),
      );
      qc.prefetchInfiniteQuery(
        filtersQuery.infiniteFilterOffers({
          pageSize: 7,
          facetType: "category",
          scope: "owner",
        }),
      );
    },
  },

  bookings: {
    skeleton: BookingsTabSkeleton,
    ensure: (qc) =>
      qc.ensureQueryData(
        offerQuery.joined({ OrderBy: "Default", Page: 1, PageSize: 12 }),
      ),
    prefetch: (qc) => {
      qc.prefetchInfiniteQuery(
        filtersQuery.infiniteFilterOffers({
          pageSize: 7,
          facetType: "skill",
          scope: "user",
        }),
      );
      qc.prefetchInfiniteQuery(
        filtersQuery.infiniteFilterOffers({
          pageSize: 7,
          facetType: "category",
          scope: "user",
        }),
      );
    },
  },

  transactions: {
    skeleton: TransactionsTabSkeleton,
    ensure: (qc) =>
      qc.ensureQueryData(
        offerQuery.listTransactions({ Page: 1, PageSize: 12 }),
      ),
    prefetch: () => {},
  },
};

export const TAB_SKELETON: Record<TimeBankMode, React.FC> = Object.fromEntries(
  Object.entries(timeBankTabConfig).map(([tab, config]) => [
    tab,
    config.skeleton,
  ]),
) as Record<TimeBankMode, React.FC>;

export const prefetchTab = async (tab: TimeBankMode): Promise<void> => {
  const config = timeBankTabConfig[tab];
  await config.ensure(queryClient);
  config.prefetch(queryClient);
};
