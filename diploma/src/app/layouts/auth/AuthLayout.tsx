import styles from "./AuthLayout.module.scss";
import { LinkButtonWrapper } from "@shared/ui/buttons";
import { LanguageSwitcherButton } from "@shared/ui/buttons";
import { TermsCondition, Policy } from "@shared/assets/icons/documents";
import { QuestionSign } from "@shared/assets/icons/info";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className={styles.authWrapper}>
      <div className={styles.navButtonsAuth}>
        <LanguageSwitcherButton />
        <LinkButtonWrapper
          to="/terms-and-conditions"
          className={styles.headerLinkButton}
        >
          <img src={TermsCondition} alt="terms condition" />
        </LinkButtonWrapper>
        <LinkButtonWrapper to="/policy" className={styles.headerLinkButton}>
          <img src={Policy} alt="policy" />
        </LinkButtonWrapper>
      </div>
      {children}
      <div className={styles.footerButtonAuth}>
        <LinkButtonWrapper to="/policy" className={styles.footerLinkButton}>
          <img src={QuestionSign} alt="question sign" />
        </LinkButtonWrapper>
      </div>
    </div>
  );
};
