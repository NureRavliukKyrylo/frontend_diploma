import type { Dispatch, SetStateAction } from "react";
import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  cancelEvent,
  eventKeys,
  updateEvent,
  type Event,
} from "@entities/event";
import { organizationKeys } from "@entities/organization";
import { projectKeys } from "@entities/project";
import { buildEventSettingsPayload } from "../lib/buildEventSettingsPayload";
import { getEventSettingsErrorMessage } from "../lib/eventSettingsMeta";
import type { EventSettingsValues } from "./types";

interface UseEventSettingsMutationsProps {
  eventId: string;
  event?: Event;
  cancelReason: string;
  setIsSaveModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsCancelModalOpen: Dispatch<SetStateAction<boolean>>;
  setCancelReason: Dispatch<SetStateAction<string>>;
}

export const useEventSettingsMutations = ({
  eventId,
  event,
  cancelReason,
  setIsSaveModalOpen,
  setIsCancelModalOpen,
  setCancelReason,
}: UseEventSettingsMutationsProps) => {
  const queryClient = useQueryClient();

  const invalidateEventQueries = async () => {
    await queryClient.invalidateQueries({ queryKey: eventKeys.id(eventId) });
    await queryClient.invalidateQueries({ queryKey: eventKeys.all() });

    const organizationId = event?.organizationId ?? event?.organization?.id;
    if (organizationId) {
      await queryClient.invalidateQueries({
        queryKey: organizationKeys.details(organizationId),
      });
      await queryClient.invalidateQueries({ queryKey: organizationKeys.all() });
    }

    const projectId = event?.projectId ?? event?.project?.id;
    if (projectId) {
      await queryClient.invalidateQueries({ queryKey: projectKeys.id(projectId) });
      await queryClient.invalidateQueries({ queryKey: projectKeys.all() });
    }
  };

  const updateDetailsMutation = useMutation({
    mutationFn: (formValues: EventSettingsValues) =>
      updateEvent(buildEventSettingsPayload(eventId, formValues)),
    onSuccess: async () => {
      setIsSaveModalOpen(false);
      await invalidateEventQueries();
      addToast({ title: "Changes saved", color: "success" });
    },
    onError: (error) => {
      addToast({
        title: "Could not save changes",
        description: getEventSettingsErrorMessage(error),
        color: "danger",
      });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: () => cancelEvent(eventId, cancelReason),
    onSuccess: async () => {
      setIsCancelModalOpen(false);
      setCancelReason("");
      await invalidateEventQueries();
      addToast({ title: "Event cancelled", color: "success" });
    },
    onError: (error) => {
      addToast({
        title: "Could not cancel event",
        description: getEventSettingsErrorMessage(error),
        color: "danger",
      });
    },
  });

  return { updateDetailsMutation, cancelMutation };
};
