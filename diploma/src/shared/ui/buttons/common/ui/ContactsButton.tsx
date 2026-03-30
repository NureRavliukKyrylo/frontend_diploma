import { Link } from "@tanstack/react-router";
import styles from "../styles/ContactsButton.module.scss";

export const ContactsButton = () => {
  return (
    <Link to="/auth" className={styles.contactsButton}>
      {" "}
      {/* stub for now */}
      Contact Us
    </Link>
  );
};
