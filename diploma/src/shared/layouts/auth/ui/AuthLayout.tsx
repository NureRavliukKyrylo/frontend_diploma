import styles from "./../styles/AuthLayout.module.scss";
import { LinkCommonButton } from "../../../buttons/common";
import { LanguageSwitcherButton } from "../../../buttons/common";
import { QuestionSign, TermsCondition, Policy } from "../../../assets/common";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className={styles.authWrapper}>
      <div className={styles.navButtonsAuth}>
        <LanguageSwitcherButton />
        <LinkCommonButton
          to="/terms-and-conditions"
          linkWidth="40px"
          linkHeight="40px"
          imgSrc={TermsCondition}
          imgAlt="terms-conditions"
          imgWidth="27px"
          imgHeight="27px"
        />
        <LinkCommonButton
          to="/policy"
          linkWidth="40px"
          linkHeight="40px"
          imgSrc={Policy}
          imgAlt="policy"
          imgWidth="27px"
          imgHeight="27px"
        />
      </div>
      {children}
      <div className={styles.footerButtonAuth}>
        <LinkCommonButton
          to="/contacts"
          linkWidth="60px"
          linkHeight="60px"
          imgSrc={QuestionSign}
          imgAlt="question-mark"
          imgWidth="40px"
          imgHeight="40px"
        />
      </div>
    </div>
  );
};
