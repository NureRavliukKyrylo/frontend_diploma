import type { EventRequestParams } from "../../libs";
import { eventQuery } from "../queries/eventQuery";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Event } from "../types/Event";
import type { QueryResult } from "@shared/config/types";

export const useEventsListQuery =
  (search: EventRequestParams) => (): QueryResult<Event> => {
    const { data } = useSuspenseQuery(eventQuery.list(search));
    return { data: data.data };
  };
