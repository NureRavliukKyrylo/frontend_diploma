import {
  badgesKeys,
  uploadAdminBadgeIcon,
  type AdminBadgeListItem,
} from "@entities/badge";
import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BaseModal } from "@shared/ui/modals";
import { ImagePlus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { badgeIconMaxSize } from "../../badge-form-modal/libs/badgeFormSchema";
import {
  badgePlaceholderIcon,
  getBadgePreviewIcon,
} from "../../lib/badgeCardAdapter";
import styles from "./BadgeIconModal.module.scss";

interface BadgeIconModalProps {
  badge: AdminBadgeListItem | null;
  onClose: () => void;
}

export const BadgeIconModal = ({ badge, onClose }: BadgeIconModalProps) => {
  const { t } = useTranslation("admin");
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mutation = useMutation({
    mutationFn: async () => {
      if (!badge || !iconFile) {
        throw new Error(t("badges.icon.chooseFirst"));
      }

      return uploadAdminBadgeIcon(badge.id, iconFile);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: badgesKeys.all() });
      addToast({ title: t("badges.icon.updated"), color: "success" });
      onClose();
    },
    onError: () => {
      addToast({ title: t("badges.icon.uploadFailed"), color: "danger" });
    },
  });

  useEffect(() => {
    setIconFile(null);
    setPreview(getBadgePreviewIcon(badge?.iconUrl));
    setError(null);
  }, [badge]);

  const selectFile = (file: File | null) => {
    setError(null);

    if (!file) {
      return;
    }

    if (file.size > badgeIconMaxSize) {
      setError(t("badges.form.fileTooLarge"));
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError(t("badges.form.imageOnly"));
      return;
    }

    setIconFile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <BaseModal
      isOpen={Boolean(badge)}
      onClose={onClose}
      maxWidth="520px"
      showClosed={false}
    >
      <div className={styles.wrapper}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label={t("badges.icon.close")}
        >
          <X size={18} aria-hidden="true" />
        </button>
        <h2 className={styles.title}>{t("badges.icon.title")}</h2>
        <p className={styles.subtitle}>
          {t("badges.icon.description", {
            name: badge?.title ?? t("badges.icon.thisBadge"),
          })}
        </p>
        <button
          type="button"
          className={styles.dropzone}
          onClick={() => fileInputRef.current?.click()}
        >
          {preview ? (
            <img
              src={preview}
              alt=""
              className={styles.preview}
              onError={() => setPreview(badgePlaceholderIcon)}
            />
          ) : (
            <ImagePlus size={28} aria-hidden="true" />
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className={styles.hiddenInput}
          onChange={(event) => {
            selectFile(event.currentTarget.files?.[0] ?? null);
            event.currentTarget.value = "";
          }}
        />
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => fileInputRef.current?.click()}
          >
            {t("badges.icon.choose")}
          </button>
          <button
            type="button"
            className={styles.primaryButton}
            disabled={!iconFile || mutation.isPending}
            onClick={() => mutation.mutate()}
          >
            {t("badges.icon.save")}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
