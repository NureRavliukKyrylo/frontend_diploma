import { LegalHeader } from "@widgets/common";
import {
  COMMUNITY_RULES,
  TERMS_SECTIONS,
  TERMS_TOC_ITEMS,
  TermsCta,
  TermsHero,
  TermsRules,
  TermsSections,
  TermsSummary,
  TermsToc,
} from "@widgets/terms";
import styles from "./TermsPage.module.scss";

export const TermsPage = () => (
  <div className={styles.page}>
    <LegalHeader />

    <div className={styles.content}>
      <TermsHero />
      <TermsSummary />

      <div className={styles.layout}>
        <TermsToc sections={TERMS_TOC_ITEMS} />

        <div className={styles.sections}>
          <TermsSections sections={TERMS_SECTIONS} />
          <TermsRules rules={COMMUNITY_RULES} />
        </div>
      </div>
    </div>

    <div className={styles.ctaWrapper}>
      <TermsCta />
    </div>
  </div>
);
