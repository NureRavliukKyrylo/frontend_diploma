import { useState, useCallback } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { eventQuery } from "@entities/event";
import { taskQuery } from "@entities/task";
import type { CalendarView, EventType } from "@shared/config/types";
import type { EventInput } from "@fullcalendar/core";
import { parseInitialDate, serializeDate } from "../libs/dateSerializers";

interface ActiveInfo {
  id: string;
  type: EventType;
  cellEvents: Array<{ id: string; type: EventType }>;
  anchor: { getBoundingClientRect: () => DOMRect };
}

export const useVolunteerCalendarPage = (events: EventInput[]) => {
  const search = useSearch({ from: "/_masterLayout/calendar/" });
  const navigate = useNavigate({ from: "/calendar/" });
  const queryClient = useQueryClient();
  const [activeInfo, setActiveInfo] = useState<ActiveInfo | null>(null);

  const currentIndex = activeInfo
    ? activeInfo.cellEvents.findIndex((e) => e.id === activeInfo.id)
    : -1;

  const prefetchNext = useCallback(
    (cellEvents: ActiveInfo["cellEvents"], index: number) => {
      const next = cellEvents[index + 1];
      if (!next) return;

      if (next.type === "event") {
        queryClient.prefetchQuery(eventQuery.id(next.id));
      } else {
        queryClient.prefetchQuery(taskQuery.id(next.id));
      }
    },
    [queryClient],
  );

  const handleDateClick = useCallback(
    (date: Date, jsEvent: MouseEvent) => {
      const cellEvents = events
        .filter((e) => {
          const eventDate = new Date(e.start as string);
          return (
            eventDate.getFullYear() === date.getFullYear() &&
            eventDate.getMonth() === date.getMonth() &&
            eventDate.getDate() === date.getDate()
          );
        })
        .map((e) => ({
          id: String(e.id),
          type: e.extendedProps?.type as EventType,
        }));

      if (!cellEvents.length) return;

      const { clientX, clientY } = jsEvent;

      const isTimeGrid = !!(jsEvent.target as HTMLElement).closest(
        ".fc-timegrid",
      );

      const anchor = isTimeGrid
        ? {
            getBoundingClientRect: () =>
              ({
                x: clientX,
                y: clientY,
                top: clientY,
                bottom: clientY,
                left: clientX,
                right: clientX,
                width: 0,
                height: 0,
                toJSON: () => {},
              }) as DOMRect,
          }
        : ((jsEvent.target as HTMLElement).closest<HTMLElement>(
            ".fc-daygrid-day",
          ) ?? (jsEvent.target as HTMLElement));

      const first = cellEvents[0];
      setActiveInfo({
        id: first.id,
        type: first.type,
        cellEvents,
        anchor,
      });
      prefetchNext(cellEvents, 0);
    },
    [events, prefetchNext],
  );

  const handlePrev = useCallback(() => {
    if (!activeInfo) return;
    const prev = activeInfo.cellEvents[currentIndex - 1];
    if (!prev) return;
    setActiveInfo({ ...activeInfo, id: prev.id, type: prev.type });
  }, [activeInfo, currentIndex]);

  const handleNext = useCallback(() => {
    if (!activeInfo) return;
    const next = activeInfo.cellEvents[currentIndex + 1];
    if (!next) return;
    setActiveInfo({ ...activeInfo, id: next.id, type: next.type });
    prefetchNext(activeInfo.cellEvents, currentIndex + 1);
  }, [activeInfo, currentIndex, prefetchNext]);

  const handleViewChange = useCallback(
    (newView: CalendarView, currentDate: Date) => {
      navigate({
        search: { tab: newView, date: serializeDate(newView, currentDate) },
      });
    },
    [navigate],
  );

  const handleNavigate = useCallback(
    (currentDate: Date, currentView: CalendarView) => {
      navigate({
        search: (prev) => ({
          ...prev,
          date: serializeDate(currentView, currentDate),
        }),
      });
    },
    [navigate],
  );

  return {
    initialView: search.tab,
    initialDate: parseInitialDate(search.date),
    handleViewChange,
    handleNavigate,
    handleDateClick,
    activeInfo,
    currentIndex,
    handlePrev,
    handleNext,
    handleClose: () => setActiveInfo(null),
  };
};
