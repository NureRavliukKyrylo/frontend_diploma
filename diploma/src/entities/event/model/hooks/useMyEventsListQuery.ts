import { useSuspenseQuery } from "@tanstack/react-query";
import type { QueryResult } from "@shared/config/types";
import { eventQuery } from "../queries/eventQuery";
import type { MyEventsRequestParams } from "@entities/event/libs";
import type { Event } from "../types/Event";

export const useMyEventsListQuery =
  (search: MyEventsRequestParams) => (): QueryResult<Event> => {
    const { data } = useSuspenseQuery(eventQuery.my(search));
    return { data: data.data };
  };
