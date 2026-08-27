import { useRef } from "react";
import { Trash2, Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "../GeneralTab.module.scss";

interface LogoSectionProps {
  organizationName: string;
  logoUrl?: string | null;
  initials: string;
  isLogoUploading: boolean;
  isLogoRemoving: boolean;
  onLogoSelect: (file: File | null) => void;
  onLogoRemove: () => void;
}

export const LogoSection = ({
  organizationName,
  logoUrl,
  initials,
  isLogoUploading,
  isLogoRemoving,
  onLogoSelect,
  onLogoRemove,
}: LogoSectionProps) => {
  const { t } = useTranslation("organizations");
  const logoInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionLabel}>{t("settings.general.logo")}</h2>
      <p className={styles.sectionDescription}>
        {t("settings.general.logoText")}
      </p>

      <div className={styles.logoSection}>
        <div className={styles.logoPreview}>
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={t("settings.general.logoAlt", {
                name: organizationName,
              })}
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>

        <div className={styles.logoCopy}>
          <h3>{t("settings.general.logoTitle")}</h3>
          <p>{t("settings.general.logoHint")}</p>
        </div>

        <input
          ref={logoInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className={styles.hiddenInput}
          onChange={(event) => {
            onLogoSelect(event.target.files?.[0] ?? null);
            event.target.value = "";
          }}
        />

        <div className={styles.logoActions}>
          <button
            type="button"
            className={styles.uploadButton}
            disabled={isLogoUploading}
            onClick={() => logoInputRef.current?.click()}
          >
            <Upload size={15} />
            {isLogoUploading
              ? t("settings.general.uploading")
              : t("settings.general.uploadLogo")}
          </button>
          <button
            type="button"
            className={styles.removeButton}
            disabled={isLogoRemoving || (!logoUrl && !isLogoUploading)}
            onClick={onLogoRemove}
          >
            <Trash2 size={15} />
            {isLogoRemoving
              ? t("settings.general.removing")
              : t("settings.general.removeLogo")}
          </button>
        </div>
      </div>
    </section>
  );
};
