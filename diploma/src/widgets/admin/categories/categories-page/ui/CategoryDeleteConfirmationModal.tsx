import type { UseMutationResult } from "@tanstack/react-query";
import { ConfirmationModal } from "@shared/ui/modals";
import { useTranslation } from "react-i18next";
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
}: CategoryDeleteConfirmationModalProps) => {
  const { t } = useTranslation("admin");

  return (
    <ConfirmationModal
      isOpen={Boolean(target)}
      title={t("categories.delete.title")}
      text={t("categories.delete.warning")}
      confirmText={t("common.actions.delete")}
      cancelText={t("common.actions.cancel")}
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
};
