import type { UseMutationResult } from "@tanstack/react-query";
import { ConfirmationModal } from "@shared/ui/modals";
import type { DeleteSkillTarget } from "../model/useAdminSkillsPage";
import { useTranslation } from "react-i18next";

interface SkillDeleteConfirmationModalProps {
  target: DeleteSkillTarget | null;
  mutation: UseMutationResult<void, Error, string, unknown>;
  onClose: () => void;
}

export const SkillDeleteConfirmationModal = ({
  target,
  mutation,
  onClose,
}: SkillDeleteConfirmationModalProps) => {
  const { t } = useTranslation("admin");

  return (
    <ConfirmationModal
      isOpen={Boolean(target)}
      title={t("skills.delete.title")}
      text={
        target?.totalVolunteers
          ? t("skills.delete.usedText", { count: target.totalVolunteers })
          : t("skills.delete.warning")
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
          mutation.mutate(target.skill.id);
        }
      }}
    />
  );
};
