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
  return (
    <div className={styles.metaStrip}>
      <article>
        <span>Created</span>
        <strong>{createdAtLabel}</strong>
      </article>
      <article>
        <span>Launch date</span>
        <strong>{launchDateLabel}</strong>
      </article>
      <article>
        <span>Phone</span>
        <strong>{phoneLabel}</strong>
      </article>
    </div>
  );
};
