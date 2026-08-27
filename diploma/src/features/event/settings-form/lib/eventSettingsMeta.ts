import type { Event } from "@entities/event";
import type { EventSettingsLockState, EventStatus } from "../model/types";

const eventContentManagePermission = "event.content_manage";

export const getEventSettingsErrorMessage = (error: unknown) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response
  ) {
    const data = error.response.data as {
      error?: string;
      message?: string;
      title?: string;
      errors?: Record<string, string[]>;
    };

    if (data.error) return data.error;
    if (data.message) return data.message;
    if (data.title) return data.title;

    const firstError = data.errors
      ? Object.values(data.errors).flat().find(Boolean)
      : null;

    if (firstError) return firstError;
  }

  return "Something went wrong.";
};

export const getEventStatus = (event: Event): EventStatus => {
  if (event.isCancelled) return "cancelled";
  return event.status ?? "active";
};

export const getEventLockState = (
  event: Event | undefined,
): EventSettingsLockState => {
  if (!event?.startAt) {
    return {
      scheduleAndLocationLocked: false,
      typeAndSkillsLocked: false,
      message: null,
    };
  }

  const start = new Date(event.startAt);
  if (Number.isNaN(start.getTime())) {
    return {
      scheduleAndLocationLocked: false,
      typeAndSkillsLocked: false,
      message: null,
    };
  }

  const now = Date.now();
  const startTime = start.getTime();
  const within24h = now >= startTime - 24 * 60 * 60 * 1000 && now < startTime;

  if (now >= startTime) {
    return {
      scheduleAndLocationLocked: true,
      typeAndSkillsLocked: true,
      message:
        "Schedule, location, type, and required skills are locked because this event has already started.",
    };
  }

  if (within24h) {
    return {
      scheduleAndLocationLocked: true,
      typeAndSkillsLocked: false,
      message: "Schedule and location are locked because this event starts soon.",
    };
  }

  return {
    scheduleAndLocationLocked: false,
    typeAndSkillsLocked: false,
    message: null,
  };
};

export const hasEventContentManagePermission = (event: Event | undefined) => {
  const permissions = event?.currentUserRole?.permissions;
  if (!permissions) return true;

  return (
    permissions.includes("*") ||
    permissions.includes(eventContentManagePermission)
  );
};
