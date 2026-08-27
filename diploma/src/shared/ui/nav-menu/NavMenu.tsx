import { Link } from "@tanstack/react-router";
import styles from "./NavMenu.module.scss";
import type { NavLink } from "@shared/config/types";

interface NavMenuProps {
  links: NavLink[];
  linkClassName?: string;
}

export const NavMenu = ({ links, linkClassName = "" }: NavMenuProps) => {
  return (
    <>
      {links.map(({ title, href }) => (
        <Link to={href} className={`${styles.navLink} ${linkClassName}`}>
          {title}
        </Link>
      ))}
    </>
  );
};
