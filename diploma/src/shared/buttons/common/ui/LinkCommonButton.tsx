import { Link } from "@tanstack/react-router";
import styles from "./../styles/LinkCommonButton.module.scss";

interface LinkCommonButtonProps {
  to: string;
  linkWidth?: string | number;
  linkHeight?: string | number;
  imgSrc: string;
  imgAlt?: string;
  imgWidth?: string | number;
  imgHeight?: string | number;
}

export const LinkCommonButton = ({
  to,
  linkWidth = "auto",
  linkHeight = "auto",
  imgSrc,
  imgAlt = "",
  imgWidth = "auto",
  imgHeight = "auto",
}: LinkCommonButtonProps) => {
  return (
    <Link
      to={to}
      className={styles.linkCommonButton}
      style={{ width: linkWidth, height: linkHeight }}
    >
      <img
        src={imgSrc}
        alt={imgAlt}
        style={{ width: imgWidth, height: imgHeight }}
      />
    </Link>
  );
};
