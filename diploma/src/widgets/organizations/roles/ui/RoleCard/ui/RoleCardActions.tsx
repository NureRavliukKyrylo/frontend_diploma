import type { RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Archive,
  Lock,
  MoreHorizontal,
  Pencil,
  RotateCcw,
  Shield,
  Trash2,
} from "lucide-react";
import type { ContextRoleCardType } from "../../../config/rolePresentation";
import styles from "../RoleCard.module.scss";
import { useTranslation } from "react-i18next";

interface RoleCardActionsProps {
  roleName: string;
  isDefaultForJoin: boolean;
  type: ContextRoleCardType;
  archived: boolean;
  isMenuOpen: boolean;
  menuRef: RefObject<HTMLDivElement | null>;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onEdit?: () => void;
  onUse?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  onRestore?: () => void;
  onSetDefault?: () => void;
}

export const RoleCardActions = ({
  roleName,
  isDefaultForJoin,
  type,
  archived,
  isMenuOpen,
  menuRef,
  onToggleMenu,
  onCloseMenu,
  onEdit,
  onUse,
  onArchive,
  onDelete,
  onRestore,
  onSetDefault,
}: RoleCardActionsProps) => {
  const { t } = useTranslation("roles");
  if (archived) {
    return (
      <>
        <button
          type="button"
          className={styles.restoreButton}
          onClick={onRestore}
        >
          <RotateCcw size={15} strokeWidth={2.2} />
          {t("actions.restore")}
        </button>
        <button
          type="button"
          className={styles.iconDangerButton}
          aria-label={t("actions.deleteRole", { name: roleName })}
          onClick={onDelete}
        >
          <Trash2 size={16} strokeWidth={2.3} />
        </button>
      </>
    );
  }

  if (type === "system") {
    return (
      <button type="button" className={styles.lockedButton} disabled>
        <Lock size={14} strokeWidth={2.2} />
        {t("actions.locked")}
      </button>
    );
  }

  if (type === "template") {
    return (
      <button type="button" className={styles.useButton} onClick={onUse}>
        {t("actions.use")}
      </button>
    );
  }

  return (
    <>
      <div className={styles.moreWrap} ref={menuRef}>
        <AnimatePresence>
          {isMenuOpen ? (
            <motion.div
              className={styles.dropdownMenu}
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              <button
                type="button"
                className={styles.menuAction}
                onClick={() => {
                  onSetDefault?.();
                  onCloseMenu();
                }}
              >
                <Shield size={15} strokeWidth={2.2} />
                {isDefaultForJoin
                  ? t("actions.removeDefault")
                  : t("actions.setDefault")}
              </button>
              <button
                type="button"
                className={styles.menuAction}
                onClick={() => {
                  onArchive?.();
                  onCloseMenu();
                }}
              >
                <Archive size={15} strokeWidth={2.2} />
                {t("actions.archive")}
              </button>
              <button
                type="button"
                className={`${styles.menuAction} ${styles.menuDanger}`}
                onClick={() => {
                  onDelete?.();
                  onCloseMenu();
                }}
              >
                <Trash2 size={15} strokeWidth={2.2} />
                {t("actions.delete")}
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <button
          type="button"
          className={`${styles.moreButton} ${isMenuOpen ? styles.moreButtonOpen : ""}`}
          aria-label={t("actions.more", { name: roleName })}
          onClick={onToggleMenu}
        >
          <MoreHorizontal size={18} strokeWidth={2.3} />
        </button>
      </div>

      <button type="button" className={styles.editButton} onClick={onEdit}>
        <Pencil size={14} strokeWidth={2.3} />
        {t("actions.edit")}
      </button>
    </>
  );
};
