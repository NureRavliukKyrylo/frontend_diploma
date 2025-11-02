import React from "react";
import { ButtonLayout } from "./ButtonLayout";
import { Bell } from "@shared/assets/icons/actions";
import styles from "../styles/NotificationButton.module.scss";

export const NotificationButton: React.FC = () => {
  return (
    <ButtonLayout className={styles.notificationButton}>
      <img
        src={Bell}
        alt="Notifications"
        className={styles.notificationImage}
      />
    </ButtonLayout>
  );
};
