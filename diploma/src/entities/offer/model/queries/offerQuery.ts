import type {
  OfferSearchParams,
  OfferJoinedSearchParams,
  OfferMySearchParams,
  TransactionsSearchParams,
} from "../../libs";
import {
  getListOffers,
  getListJoinedOffers,
  getListMyOffers,
  getOfferId,
  getOfferJoinedId,
  getOfferMyId,
  getListTransactions,
  getListBookings,
  getTimeBankStats,
} from "../../api";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

export const offerKeys = {
  all: () => ["offers"] as const,
  list: (params: OfferSearchParams) =>
    [...offerKeys.all(), "list", params] as const,
  id: (id: string) => [...offerKeys.all(), "id", id] as const,
  joinedId: (id: string) => [...offerKeys.id(id), "joined"] as const,
  myId: (id: string) => [...offerKeys.id(id), "my"] as const,
  joineds: () => [...offerKeys.all(), "joined"] as const,
  joined: (params: OfferJoinedSearchParams) =>
    [...offerKeys.joineds(), params] as const,
  mys: () => [...offerKeys.all(), "my"] as const,
  my: (params: OfferMySearchParams) => [...offerKeys.mys(), params] as const,
  transactions: () => ["transactions"] as const,
  listTransactions: (params: TransactionsSearchParams) =>
    [...offerKeys.transactions(), "list", params] as const,
  allBookings: (id: string) => [...offerKeys.all(), "bookings", id] as const,
  bookingsList: (id: string, params: { Page?: number; PageSize: number }) => [
    ...offerKeys.allBookings(id),
    "list",
    params,
  ],
  timeBankStats: () => [...offerKeys.all(), "stats"],
};

export const offerQuery = {
  list: (params: OfferSearchParams) =>
    queryOptions({
      queryKey: offerKeys.list({ ...params }),
      queryFn: () => getListOffers({ ...params }),
      placeholderData: (prev) => prev,
    }),
  id: (id: string) =>
    queryOptions({
      queryKey: offerKeys.id(id),
      queryFn: () => getOfferId(id),
      select: (res) => res.data,
    }),
  joinedId: (id: string) =>
    queryOptions({
      queryKey: offerKeys.joinedId(id),
      queryFn: () => getOfferJoinedId(id),
      select: (res) => res.data,
    }),
  myId: (id: string) =>
    queryOptions({
      queryKey: offerKeys.myId(id),
      queryFn: () => getOfferMyId(id),
      select: (res) => res.data,
    }),
  joined: (params: OfferJoinedSearchParams) =>
    queryOptions({
      queryKey: offerKeys.joined({ ...params }),
      queryFn: () => getListJoinedOffers({ ...params }),
      placeholderData: (prev) => prev,
    }),
  my: (params: OfferMySearchParams) =>
    queryOptions({
      queryKey: offerKeys.my({ ...params }),
      queryFn: () => getListMyOffers({ ...params }),
      placeholderData: (prev) => prev,
    }),
  listTransactions: (params: TransactionsSearchParams) =>
    queryOptions({
      queryKey: offerKeys.listTransactions({ ...params }),
      queryFn: () => getListTransactions({ ...params }),
      placeholderData: (prev) => prev,
    }),
  listBookings: (id: string, params: { Page?: number; PageSize: number }) =>
    infiniteQueryOptions({
      queryKey: offerKeys.bookingsList(id, { ...params }),
      queryFn: ({ pageParam }) =>
        getListBookings(id, { ...params, Page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.pagination.nextPage ?? undefined,
      select: (data) => data.pages.flatMap((page) => page.data),
    }),
  stats: () =>
    queryOptions({
      queryKey: offerKeys.timeBankStats(),
      queryFn: () => getTimeBankStats(),
      placeholderData: (prev) => prev,
      select: (data) => data.data,
    }),
};
