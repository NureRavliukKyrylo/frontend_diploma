import React from "react";
import { ButtonLayout } from "./ButtonLayout";
import { MessageIcon } from "@shared/assets/icons/actions";
import styles from "../styles/MessagesButton.module.scss";

export const MessagesButton: React.FC = () => {
  return (
    <ButtonLayout className={styles.messageButton}>
      <img
        src={MessageIcon}
        alt="Notifications"
        className={styles.messageImage}
      />
    </ButtonLayout>
  );
};
