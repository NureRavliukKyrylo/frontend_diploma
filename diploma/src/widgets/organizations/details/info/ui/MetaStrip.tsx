import { useTranslation } from "react-i18next";
import styles from "./MetaStrip.module.scss";

interface OrganizationDetailsMetaStripProps {
  createdAtLabel: string;
  launchDateLabel: string;
  phoneLabel: string;
}

export const OrganizationDetailsMetaStrip = ({
  createdAtLabel,
  launchDateLabel,
  phoneLabel,
}: OrganizationDetailsMetaStripProps) => {
  const { t } = useTranslation("organizations");
  return (
    <div className={styles.metaStrip}>
      <article>
        <span>{t("details.labels.created")}</span>
        <strong>{createdAtLabel}</strong>
      </article>
      <article>
        <span>{t("details.labels.launchDate")}</span>
        <strong>{launchDateLabel}</strong>
      </article>
      <article>
        <span>{t("details.labels.phone")}</span>
        <strong>{phoneLabel}</strong>
      </article>
    </div>
  );
};
