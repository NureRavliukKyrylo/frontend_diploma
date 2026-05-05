import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
} from "@floating-ui/react";
import styles from "./AvailabilityContextMenu.module.scss";

interface MenuItem {
  key: "assign" | "update" | "delete";
  label: string;
  variant: "assign" | "update" | "delete";
  onClick: () => void;
}

interface AvailabilityContextMenuProps {
  anchor: Element;
  menuItems: MenuItem[];
  onClose: () => void;
}

export const AvailabilityContextMenu = ({
  anchor,
  menuItems,
  onClose,
}: AvailabilityContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const { refs, floatingStyles } = useFloating({
    whileElementsMounted: autoUpdate,
    placement: "right-start",
    middleware: [offset(8), flip(), shift({ padding: 8 })],
  });

  useEffect(() => {
    refs.setReference(anchor);
  }, [anchor]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      ref={(node) => {
        menuRef.current = node;
        refs.setFloating(node);
      }}
      className={styles.contextMenu}
      style={floatingStyles}
    >
      {menuItems.map((item) => (
        <button
          key={item.key}
          className={`${styles.menuItem} ${styles[item.variant]}`}
          onClick={item.onClick}
        >
          <span className={styles.menuItemTitle}>{item.label}</span>
        </button>
      ))}
    </div>,
    document.body,
  );
};
