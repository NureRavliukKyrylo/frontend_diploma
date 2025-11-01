import React from "react";
import { ButtonLayout } from "./ButtonLayout";
import { Bell } from "@shared/assets/common";
import styles from "../styles/ActiveProjectsButton.module.scss";

export const ActiveProjectsButton: React.FC = () => {
  return (
    <ButtonLayout className={styles.activeProjectsButton}>
      <img src={Bell} alt="Projects" />
      <span>Active projects</span>
    </ButtonLayout>
  );
};
