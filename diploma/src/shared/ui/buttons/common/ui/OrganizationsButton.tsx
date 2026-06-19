import React from "react";
import { CompanyIcon } from "@shared/assets/icons/actions";
import { LinkButtonWrapper } from "../../base-buttons/link-wrapper/LinkButtonWrapper";
import styles from "../styles/OrganizationsButton.module.scss";

export const OrganizationsButton: React.FC = () => {
  return (
    <LinkButtonWrapper
      to="/organizations"
      aria-label="Organizations"
      className={styles.organizationsButton}
    >
      <img
        src={CompanyIcon}
        alt="Organizations"
        className={styles.organizationsImage}
      />
    </LinkButtonWrapper>
  );
};
