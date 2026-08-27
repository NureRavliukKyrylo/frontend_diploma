import { LegalHeader } from "@widgets/common";
import {
  PRIVACY_SECTIONS,
  PrivacyCta,
  PrivacyHero,
  PrivacySections,
  PrivacyToc,
} from "@widgets/privacy";
import styles from "./PrivacyPage.module.scss";

export const PrivacyPage = () => (
  <div className={styles.page}>
    <LegalHeader />

    <div className={styles.content}>
      <PrivacyHero />

      <div className={styles.layout}>
        <PrivacyToc sections={PRIVACY_SECTIONS} />
        <PrivacySections sections={PRIVACY_SECTIONS} />
      </div>
    </div>

    <div className={styles.ctaWrapper}>
      <PrivacyCta />
    </div>
  </div>
);
