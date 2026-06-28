import type { UseMutationResult } from "@tanstack/react-query";
import { ConfirmationModal } from "@shared/ui/modals";
import type { AdminCategoryCardData } from "../../lib/categoryVisuals";

interface CategoryDeleteConfirmationModalProps {
  target: AdminCategoryCardData | null;
  mutation: UseMutationResult<void, Error, string, unknown>;
  onClose: () => void;
}

export const CategoryDeleteConfirmationModal = ({
  target,
  mutation,
  onClose,
}: CategoryDeleteConfirmationModalProps) => (
  <ConfirmationModal
    isOpen={Boolean(target)}
    title="Delete this category?"
    text="This action cannot be undone."
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
        mutation.mutate(target.id);
      }
    }}
  />
);
