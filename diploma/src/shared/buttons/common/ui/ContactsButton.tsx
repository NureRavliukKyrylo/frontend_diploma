import { Link } from "@tanstack/react-router";
import styles from "../styles/ContactsButton.module.scss";

export const ContactsButton = () => {
  return (
    <Link to="/contacts" className={styles.contactsButton}>
      Contact Us
    </Link>
  );
};
