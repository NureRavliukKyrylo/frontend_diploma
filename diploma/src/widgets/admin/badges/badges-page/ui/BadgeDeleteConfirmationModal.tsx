import type { UseMutationResult } from "@tanstack/react-query";
import { ConfirmationModal } from "@shared/ui/modals";
import type { DeleteBadgeTarget } from "../model/useAdminBadgesPage";
import { useTranslation } from "react-i18next";

interface BadgeDeleteConfirmationModalProps {
  target: DeleteBadgeTarget | null;
  mutation: UseMutationResult<void, Error, string, unknown>;
  onClose: () => void;
}

export const BadgeDeleteConfirmationModal = ({
  target,
  mutation,
  onClose,
}: BadgeDeleteConfirmationModalProps) => {
  const { t } = useTranslation("admin");
  const awardedCount = target?.badge.awardedCountTotal ?? 0;

  return (
    <ConfirmationModal
      isOpen={Boolean(target)}
      title={t("badges.delete.title")}
      text={
        awardedCount > 0
          ? t("badges.delete.awardedWarning", { count: awardedCount })
          : t("badges.delete.warning")
      }
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
          mutation.mutate(target.badge.id);
        }
      }}
    />
  );
};
