import styles from "./styles/AuthLayout.module.scss";
import { LinkCommonButton } from "../../buttons";
import { LanguageSwitcherButton } from "../../buttons";
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
          linkWidth="50px"
          linkHeight="50px"
          imgSrc={TermsCondition}
          imgAlt="terms-conditions"
          imgWidth="32px"
          imgHeight="32px"
        />
        <LinkCommonButton
          to="/policy"
          linkWidth="50px"
          linkHeight="50px"
          imgSrc={Policy}
          imgAlt="policy"
          imgWidth="32px"
          imgHeight="32px"
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
