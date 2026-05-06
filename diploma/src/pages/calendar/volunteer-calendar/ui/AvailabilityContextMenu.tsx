import { BasePopover } from "./BasePopover";
import styles from "./AvailabilityContextMenu.module.scss";
import type { MenuItem } from "@shared/config/types";

interface AvailabilityContextMenuProps {
  anchor: Element | { getBoundingClientRect: () => DOMRect };
  menuItems: MenuItem<"assign" | "update" | "delete">[];
  onClose: () => void;
}

export const AvailabilityContextMenu = ({
  anchor,
  menuItems,
  onClose,
}: AvailabilityContextMenuProps) => (
  <BasePopover anchor={anchor} onClose={onClose} closeOnScroll={true}>
    <div className={styles.contextMenu}>
      {menuItems.map((item) => (
        <button
          key={item.key}
          className={`${styles.menuItem} ${styles[item.variant ?? "assign"]}`}
          onClick={item.onClick}
        >
          <span className={styles.menuItemTitle}>{item.label}</span>
        </button>
      ))}
    </div>
  </BasePopover>
);
