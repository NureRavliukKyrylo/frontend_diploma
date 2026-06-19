import type { PrivacySection as PrivacySectionData } from "../../config/privacyData";
import { PrivacySection } from "./PrivacySection";
import styles from "./PrivacySections.module.scss";

interface PrivacySectionsProps {
  sections: readonly PrivacySectionData[];
}

export const PrivacySections = ({ sections }: PrivacySectionsProps) => (
  <div className={styles.sections}>
    {sections.map(section => (
      <PrivacySection key={section.id} {...section} />
    ))}
  </div>
);
