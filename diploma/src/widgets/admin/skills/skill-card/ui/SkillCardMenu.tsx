import { createPortal } from "react-dom";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import {
  ImageUp,
  MoreHorizontal,
  Pencil,
  Trash2,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import styles from "./SkillCardMenu.module.scss";

interface SkillCardMenuProps {
  triggerClassName: string;
  onEdit: () => void;
  onChangeIcon: () => void;
  onViewVolunteers: () => void;
  onDelete: () => void;
}

interface SkillCardMenuItem {
  label: string;
  icon: LucideIcon;
  onSelect: () => void;
  danger?: boolean;
}

const menuOffset = 8;

export const SkillCardMenu = ({
  triggerClassName,
  onEdit,
  onChangeIcon,
  onViewVolunteers,
  onDelete,
}: SkillCardMenuProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const updatePosition = useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    setPosition({
      top: rect.bottom + menuOffset,
      left: Math.max(12, rect.right - 200),
    });
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, updatePosition]);

  const selectAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  const menuItems: SkillCardMenuItem[] = [
    { label: "Edit skill", icon: Pencil, onSelect: onEdit },
    { label: "Change icon", icon: ImageUp, onSelect: onChangeIcon },
    { label: "View volunteers", icon: UsersRound, onSelect: onViewVolunteers },
    { label: "Delete skill", icon: Trash2, onSelect: onDelete, danger: true },
  ];

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={triggerClassName}
        onClick={(event) => {
          event.stopPropagation();
          updatePosition();
          setIsOpen((current) => !current);
        }}
        aria-label="Open skill actions"
      >
        <MoreHorizontal size={16} aria-hidden="true" />
      </button>

      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className={styles.menu}
            style={{ top: position.top, left: position.left }}
            onClick={(event) => event.stopPropagation()}
          >
            {menuItems.map((menuItem, index) => {
              const Icon = menuItem.icon;

              return (
                <div key={menuItem.label}>
                  {index === menuItems.length - 1 && (
                    <div className={styles.menuDivider} />
                  )}
                  <button
                    type="button"
                    className={`${styles.menuItem} ${
                      menuItem.danger ? styles.menuItemDanger : ""
                    }`}
                    onClick={() => selectAction(menuItem.onSelect)}
                  >
                    <Icon size={16} aria-hidden="true" />
                    {menuItem.label}
                  </button>
                </div>
              );
            })}
          </div>,
          document.body,
        )}
    </>
  );
};
