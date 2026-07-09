import { createPortal } from "react-dom";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import {
  Archive,
  Eye,
  ImageUp,
  MoreHorizontal,
  Pencil,
  RotateCcw,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import styles from "./BadgeAdminCardMenu.module.scss";
import { useTranslation } from "react-i18next";

interface BadgeAdminCardMenuProps {
  triggerClassName: string;
  isArchived: boolean;
  onView: () => void;
  onEdit: () => void;
  onChangeIcon: () => void;
  onArchive: () => void;
  onRecover: () => void;
  onDelete: () => void;
}

interface BadgeAdminCardMenuItem {
  label: string;
  icon: LucideIcon;
  onSelect: () => void;
  danger?: boolean;
}

const menuOffset = 8;

export const BadgeAdminCardMenu = ({
  triggerClassName,
  isArchived,
  onView,
  onEdit,
  onChangeIcon,
  onArchive,
  onRecover,
  onDelete,
}: BadgeAdminCardMenuProps) => {
  const { t } = useTranslation("admin");
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
      left: Math.max(12, rect.right - 220),
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

  const menuItems: BadgeAdminCardMenuItem[] = [
    { label: t("badges.menu.view"), icon: Eye, onSelect: onView },
    { label: t("badges.menu.edit"), icon: Pencil, onSelect: onEdit },
    {
      label: t("badges.menu.changeIcon"),
      icon: ImageUp,
      onSelect: onChangeIcon,
    },
    isArchived
      ? {
          label: t("badges.menu.recover"),
          icon: RotateCcw,
          onSelect: onRecover,
        }
      : {
          label: t("badges.menu.archive"),
          icon: Archive,
          onSelect: onArchive,
        },
    {
      label: t("badges.menu.delete"),
      icon: Trash2,
      onSelect: onDelete,
      danger: true,
    },
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
        aria-label={t("badges.openActions")}
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
