import {
  offerQuery,
  type OfferJoinedSearchParams,
  type OfferSortValues,
} from "@entities/offer";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";

export const useBookingsTab = (search: OfferJoinedSearchParams) => {
  const navigate = useNavigate({ from: "/time-bank/" });
  const router = useRouter();

  const { data: bookings } = useQuery(offerQuery.joined(search));

  const nav = (
    updater: (prev: OfferJoinedSearchParams) => OfferJoinedSearchParams,
  ) =>
    navigate({
      search: (prev) => updater(prev as OfferJoinedSearchParams),
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
    bookings,
  };
};
