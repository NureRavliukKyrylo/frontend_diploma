import { Link } from "@tanstack/react-router";
import styles from "../styles/ContactsButton.module.scss";
import type { TFunction } from "i18next";

interface ContactsButtonProps {
  t: TFunction;
}

export const ContactsButton = ({ t }: ContactsButtonProps) => {
  return (
    <Link to="/auth" className={styles.contactsButton}>
      {t("common:actions.contactUs")}
    </Link>
  );
};
