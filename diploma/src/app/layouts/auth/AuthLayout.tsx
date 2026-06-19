import styles from "./AuthLayout.module.scss";
import { LanguageMenu } from "@shared/ui";
import { Link } from "@tanstack/react-router";
import {
  IconFileText,
  IconQuestionMark,
  IconShieldCheck,
  IconWorld,
} from "@tabler/icons-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className={styles.authWrapper}>
      <div className={styles.cornerTopRight}>
        <Link
          to="/privacy"
          className={styles.iconBtn}
          aria-label="Privacy Policy"
        >
          <IconShieldCheck />
          <span className={styles.tooltip}>Privacy Policy</span>
        </Link>
        <Link
          to="/terms"
          className={styles.iconBtn}
          aria-label="Terms of Service"
        >
          <IconFileText />
          <span className={styles.tooltip}>Terms of Service</span>
        </Link>
        <div className={styles.languageControl}>
          <LanguageMenu
            triggerClassName={styles.iconBtn}
            triggerIcon={<IconWorld />}
          />
          <span className={styles.tooltip}>Language</span>
        </div>
      </div>
      {children}
      <div className={styles.cornerBottomRight}>
        <span className={styles.faqLabel}>Need help?</span>
        <Link to="/faq" className={styles.faqBtn} aria-label="FAQ">
          <IconQuestionMark />
        </Link>
      </div>
    </div>
  );
};
