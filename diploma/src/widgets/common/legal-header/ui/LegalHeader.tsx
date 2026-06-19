import { Link } from "@tanstack/react-router";
import { GuestTopBar } from "../../guest-top-bar";
import styles from "./LegalHeader.module.scss";

export const LegalHeader = () => (
  <>
    <GuestTopBar />

    <header className={styles.heroNav}>
      <Link className={styles.logo} to="/" aria-label="ImpactFlow home">
        IMPACTFLOW
      </Link>
    </header>
  </>
);
