import type {
  EventPaginationParams,
  EventRequestParams,
  MyEventsRequestParams,
} from "../../libs";
import {
  getListEvents,
  getMyEvents,
  getEventId,
  type EventAttendanceSearchParams,
  type EventAttendanceManagerSearchParams,
  getEventAttendanceManagerList,
  getEventAttendancesList,
  getEventJoinedId,
} from "../../api";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

export const eventKeys = {
  all: () => ["events"] as const,
  list: (params: EventRequestParams) =>
    [...eventKeys.all(), "list", params] as const,
  id: (id: string) => [...eventKeys.all(), "id", id] as const,
  joinedId: (id: string) => [...eventKeys.id(id), "joined"] as const,
  mys: () => [...eventKeys.all(), "my"] as const,
  my: (params: MyEventsRequestParams) => [...eventKeys.mys(), params] as const,
  infinite: (params: EventPaginationParams) =>
    [...eventKeys.list(params), "infinite"] as const,
  attendance: (eventId: string, params: EventAttendanceSearchParams) => [
    ...eventKeys.id(eventId),
    "attendance",
    params,
  ],
  attendanceManager: (
    eventId: string,
    params: EventAttendanceManagerSearchParams,
  ) =>
    [...eventKeys.id(eventId), "attendance-manager", params] as const,
};

export const eventQuery = {
  list: (params: EventRequestParams) =>
    queryOptions({
      queryKey: eventKeys.list({ ...params }),
      queryFn: () => getListEvents({ ...params }),
      placeholderData: (prev) => prev,
    }),
  id: (id: string) =>
    queryOptions({
      queryKey: eventKeys.id(id),
      queryFn: () => getEventId(id),
      select: (res) => res.data,
    }),
  joinedId: (id: string) =>
    queryOptions({
      queryKey: eventKeys.joinedId(id),
      queryFn: () => getEventJoinedId(id),
      select: (res) => res.data,
    }),
  my: (params: MyEventsRequestParams) =>
    queryOptions({
      queryKey: eventKeys.my({ ...params }),
      queryFn: () => getMyEvents({ ...params }),
      placeholderData: (prev) => prev,
    }),
  eventAttendance: (eventId: string, params: EventAttendanceSearchParams) =>
    queryOptions({
      queryKey: eventKeys.attendance(eventId, { ...params }),
      queryFn: () => getEventAttendancesList(eventId, { ...params }),
      placeholderData: (prev) => prev,
    }),
  attendanceManager: (
    eventId: string,
    params: EventAttendanceManagerSearchParams,
  ) =>
    queryOptions({
      queryKey: eventKeys.attendanceManager(eventId, { ...params }),
      queryFn: () => getEventAttendanceManagerList(eventId, { ...params }),
      placeholderData: (prev) => prev,
    }),
  infinite: (params: EventPaginationParams) =>
    infiniteQueryOptions({
      queryKey: eventKeys.infinite(params),
      queryFn: ({ pageParam }) => getListEvents({ ...params, Page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.pagination.nextPage ?? undefined,
      select: (data) => data.pages.flatMap((page) => page.data),
    }),
};
