import {
  offerQuery,
  type OfferSearchParams,
  type OfferSortValues,
} from "@entities/offer";
import { profileQuery } from "@entities/user/profile";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";

export const useOffersTab = (search: OfferSearchParams) => {
  const navigate = useNavigate({ from: "/time-bank/" });
  const router = useRouter();

  const { data: offers } = useQuery(offerQuery.list(search));
  const { data: profile } = useQuery(profileQuery.all());

  const nav = (updater: (prev: OfferSearchParams) => OfferSearchParams) =>
    navigate({
      search: (prev) => updater(prev as OfferSearchParams),
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
    offers,
    profile,
  };
};
