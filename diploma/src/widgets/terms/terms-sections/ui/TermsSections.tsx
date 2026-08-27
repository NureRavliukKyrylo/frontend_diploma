import type { TermsSectionData } from "../../config/termsData";
import { TermsSection } from "./TermsSection";
import styles from "./TermsSections.module.scss";

interface TermsSectionsProps {
  sections: readonly TermsSectionData[];
}

export const TermsSections = ({ sections }: TermsSectionsProps) => (
  <div className={styles.sections}>
    {sections.map(section => (
      <TermsSection key={section.id} {...section} />
    ))}
  </div>
);
