import type { UseMutationResult } from "@tanstack/react-query";
import { ConfirmationModal } from "@shared/ui/modals";
import type { DeleteSkillTarget } from "../model/useAdminSkillsPage";

interface SkillDeleteConfirmationModalProps {
  target: DeleteSkillTarget | null;
  mutation: UseMutationResult<void, Error, string, unknown>;
  onClose: () => void;
}

export const SkillDeleteConfirmationModal = ({
  target,
  mutation,
  onClose,
}: SkillDeleteConfirmationModalProps) => (
  <ConfirmationModal
    isOpen={Boolean(target)}
    title="Delete this skill?"
    text={
      target?.totalVolunteers
        ? `${target.totalVolunteers} volunteers currently have this skill. Deleting it will not automatically remove it from their profiles - they may be left with a reference to a skill that no longer exists.`
        : "This action cannot be undone."
    }
    confirmText="Delete"
    cancelText="Cancel"
    isLoading={mutation.isPending}
    onCancel={() => {
      if (!mutation.isPending) {
        onClose();
      }
    }}
    onConfirm={() => {
      if (target) {
        mutation.mutate(target.skill.id);
      }
    }}
  />
);
