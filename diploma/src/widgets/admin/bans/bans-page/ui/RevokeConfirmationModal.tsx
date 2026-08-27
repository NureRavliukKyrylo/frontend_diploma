import { getErrorMessage } from "@shared/libs/error-message";
import { ConfirmationModal } from "@shared/ui/modals";
import type { TFunction } from "i18next";
import { getUserName } from "../../lib/banDisplay";
import type { AdminBansStyles, BanDisplay } from "../../model/types";

interface RevokeMutationState {
  isPending: boolean;
  isError: boolean;
  error: unknown;
  mutate: (payload: { id: string; reason?: string }) => void;
}

interface RevokeConfirmationModalProps {
  styles: AdminBansStyles;
  target: BanDisplay | null;
  reason: string;
  mutation: RevokeMutationState;
  t: TFunction;
  onReasonChange: (value: string) => void;
  onCancel: () => void;
}

export const RevokeConfirmationModal = ({
  styles,
  target,
  reason,
  mutation,
  t,
  onReasonChange,
  onCancel,
}: RevokeConfirmationModalProps) => (
  <ConfirmationModal
    isOpen={Boolean(target)}
    title={t("admin:bans.revoke.title")}
    text={
      target
        ? t("admin:bans.revoke.description", {
            name: getUserName(target.user, target.ban.userId),
          })
        : t("admin:bans.revoke.descriptionFallback")
    }
    confirmText={t("admin:bans.revoke.confirm")}
    cancelText={t("admin:common.actions.cancel")}
    onConfirm={() => {
      if (target) {
        mutation.mutate({
          id: target.ban.id,
          reason: reason.trim() || undefined,
        });
      }
    }}
    onCancel={onCancel}
    isLoading={mutation.isPending}
    error={mutation.isError ? getErrorMessage(mutation.error, t) : null}
    maxWidth="560px"
  >
    <label className={styles.revokeReasonField}>
      <span>{t("admin:bans.revoke.reason")}</span>
      <textarea
        value={reason}
        maxLength={1000}
        onChange={(event) => onReasonChange(event.target.value)}
        placeholder={t("admin:bans.revoke.placeholder")}
      />
    </label>
  </ConfirmationModal>
);
