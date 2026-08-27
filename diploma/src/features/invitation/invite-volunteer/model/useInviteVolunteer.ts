import { useMutation } from "@tanstack/react-query";
import type { EntityType } from "@shared/config/types";
import {
  createInvitation,
  type CreateInvitationPayload,
} from "../api/createInvitation";

export const useInviteVolunteer = (
  entityId: string,
  entityType: EntityType = "organization",
) => {
  const mutation = useMutation({
    mutationFn: (payload: CreateInvitationPayload) =>
      createInvitation(entityType, entityId, payload),
  });

  return {
    inviteVolunteer: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
};
