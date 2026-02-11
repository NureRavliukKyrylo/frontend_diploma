import { Link } from "@tanstack/react-router";
import styles from "./SocialLinks.module.scss";
import { type SocialLink } from "@shared/config/types";

interface SocialLinksProps {
  links: SocialLink[];
  size?: number;
}

export const SocialLinks = ({ links, size = 20 }: SocialLinksProps) => {
  return (
    <>
      {links.map(({ logo, href }) => (
        <Link
          key={href}
          to={href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          <img
            src={logo}
            alt={"social logo"}
            className={styles.logo}
            style={{ width: size, height: size }}
          />
        </Link>
      ))}
    </>
  );
};
