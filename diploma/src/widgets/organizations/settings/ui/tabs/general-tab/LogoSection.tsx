import { useRef } from "react";
import { Trash2, Upload } from "lucide-react";
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
  const logoInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionLabel}>Logo</h2>
      <p className={styles.sectionDescription}>
        Keep your organization identity recognizable across ImpactFlow.
      </p>

      <div className={styles.logoSection}>
        <div className={styles.logoPreview}>
          {logoUrl ? (
            <img src={logoUrl} alt={`${organizationName} logo`} />
          ) : (
            <span>{initials}</span>
          )}
        </div>

        <div className={styles.logoCopy}>
          <h3>Organization logo</h3>
          <p>JPG, PNG or WEBP - max 2 MB</p>
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
            {isLogoUploading ? "Uploading" : "Upload"}
          </button>
          <button
            type="button"
            className={styles.removeButton}
            disabled={isLogoRemoving || (!logoUrl && !isLogoUploading)}
            onClick={onLogoRemove}
          >
            <Trash2 size={15} />
            {isLogoRemoving ? "Removing" : "Remove"}
          </button>
        </div>
      </div>
    </section>
  );
};
