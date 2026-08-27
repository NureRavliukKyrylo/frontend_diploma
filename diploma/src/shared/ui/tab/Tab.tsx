import styles from "./Tab.module.scss";

interface TabProps {
  name: string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
  selectedClassName?: string;
  clickableClassName?: string;
}

export const Tab = ({
  name,
  isSelected,
  onClick,
  className,
  selectedClassName,
  clickableClassName,
}: TabProps) => (
  <div
    className={[
      styles.tab,
      isSelected ? (selectedClassName ?? styles.selected) : "",
      onClick ? (clickableClassName ?? styles.clickable) : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ")}
    onClick={() => onClick?.()}
  >
    <span className={styles.name}>{name}</span>
  </div>
);
