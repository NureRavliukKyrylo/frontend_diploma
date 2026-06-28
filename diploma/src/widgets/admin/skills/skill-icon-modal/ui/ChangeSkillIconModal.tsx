import { skillKeys, uploadSkillIcon, type SkillListItemDto } from "@entities/skill";
import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BaseModal } from "@shared/ui/modals";
import { ImagePlus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./ChangeSkillIconModal.module.scss";

interface ChangeSkillIconModalProps {
  skill: SkillListItemDto | null;
  onClose: () => void;
}

export const ChangeSkillIconModal = ({
  skill,
  onClose,
}: ChangeSkillIconModalProps) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mutation = useMutation({
    mutationFn: async () => {
      if (!skill || !iconFile) {
        throw new Error("Choose an icon first");
      }

      return uploadSkillIcon(skill.id, iconFile);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: skillKeys.all() });
      addToast({ title: "Skill icon updated", color: "success" });
      onClose();
    },
    onError: () => {
      addToast({ title: "Failed to upload icon", color: "danger" });
    },
  });

  useEffect(() => {
    setIconFile(null);
    setPreview(skill?.iconUrl ?? null);
    setError(null);
  }, [skill?.id, skill?.iconUrl]);

  const selectFile = (file: File | null) => {
    setError(null);

    if (!file) {
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Icon must be 2MB or smaller");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file");
      return;
    }

    setIconFile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <BaseModal
      isOpen={Boolean(skill)}
      onClose={onClose}
      maxWidth="420px"
      showClosed={false}
    >
      <div className={styles.wrapper}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close icon modal"
        >
          <X size={18} aria-hidden="true" />
        </button>
        <h2 className={styles.title}>Change icon</h2>
        <p className={styles.subtitle}>
          Upload a square image for {skill?.name ?? "this skill"}.
        </p>
        <div className={styles.dropzone}>
          {preview ? (
            <img src={preview} alt="" className={styles.preview} />
          ) : (
            <ImagePlus size={28} aria-hidden="true" />
          )}
        </div>
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
            Choose file
          </button>
          <button
            type="button"
            className={styles.primaryButton}
            disabled={!iconFile || mutation.isPending}
            onClick={() => mutation.mutate()}
          >
            Save icon
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
