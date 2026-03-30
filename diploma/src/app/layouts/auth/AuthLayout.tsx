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
        <LinkButtonWrapper to="/auth" className={styles.headerLinkButton}>
          {" "}
          {/* stub for now */}
          <img src={TermsCondition} alt="terms condition" />
        </LinkButtonWrapper>
        <LinkButtonWrapper to="/auth" className={styles.headerLinkButton}>
          {" "}
          {/* stub for now */}
          <img src={Policy} alt="policy" />
        </LinkButtonWrapper>
      </div>
      {children}
      <div className={styles.footerButtonAuth}>
        <LinkButtonWrapper to="/auth" className={styles.footerLinkButton}>
          {" "}
          {/* stub for now */}
          <img src={QuestionSign} alt="question sign" />
        </LinkButtonWrapper>
      </div>
    </div>
  );
};
