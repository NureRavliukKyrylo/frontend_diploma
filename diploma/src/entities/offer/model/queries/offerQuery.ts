import type {
  OfferSearchParams,
  OfferJoinedSearchParams,
  OfferMySearchParams,
} from "../../libs";
import {
  getListOffers,
  getListJoinedOffers,
  getListMyOffers,
  getOfferId,
  getOfferJoinedId,
  getOfferMyId,
} from "../../api";
import { queryOptions } from "@tanstack/react-query";

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
};
