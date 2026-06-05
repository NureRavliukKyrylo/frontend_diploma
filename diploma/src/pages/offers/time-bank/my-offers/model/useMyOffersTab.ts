import {
  offerQuery,
  type OfferMySearchParams,
  type OfferSortValues,
} from "@entities/offer";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";

export const useMyOffersTab = (search: OfferMySearchParams) => {
  const navigate = useNavigate({ from: "/time-bank/" });
  const router = useRouter();

  const { data: myOffers } = useQuery(offerQuery.my(search));

  const nav = (updater: (prev: OfferMySearchParams) => OfferMySearchParams) =>
    navigate({
      search: (prev) => updater(prev as OfferMySearchParams),
      resetScroll: false,
    });

  const handleSearch = (value: string) =>
    nav((prev) => ({ ...prev, Search: value || undefined, Page: 1 }));

  const handleSort = (value: OfferSortValues) =>
    nav((prev) => ({ ...prev, OrderBy: value, Page: 1 }));

  const handlePageChange = (page: number) =>
    navigate({
      search: (prev) => ({ ...prev, Page: page }),
    });

  return {
    search,
    handleSearch,
    handleSort,
    handlePageChange,
    router,
    myOffers,
  };
};
