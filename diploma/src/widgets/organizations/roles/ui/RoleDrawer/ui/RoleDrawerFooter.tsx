import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Archive,
  Lock,
  MoreHorizontal,
  Pencil,
  Shield,
  Trash2,
} from "lucide-react";
import type { ContextRoleDto } from "@entities/organization";
import type { ContextRoleCardType } from "../../../config/rolePresentation";
import styles from "../RoleDrawer.module.scss";
import { useTranslation } from "react-i18next";

interface RoleDrawerFooterProps {
  role: ContextRoleDto;
  type: ContextRoleCardType;
  onEdit?: () => void;
  onSetDefault?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
}

export const RoleDrawerFooter = ({
  role,
  type,
  onEdit,
  onSetDefault,
  onArchive,
  onDelete,
}: RoleDrawerFooterProps) => {
  const { t } = useTranslation("roles");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (menuRef.current.contains(event.target as Node)) return;
      setIsMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <footer className={styles.footer}>
      {type === "custom" && !role.archivedAt ? (
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
                      setIsMenuOpen(false);
                    }}
                  >
                    <Shield size={15} strokeWidth={2.2} />
                    {role.isDefaultForJoin
                      ? t("actions.removeDefault")
                      : t("actions.setDefault")}
                  </button>
                  <button
                    type="button"
                    className={styles.menuAction}
                    onClick={() => {
                      onArchive?.();
                      setIsMenuOpen(false);
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
                      setIsMenuOpen(false);
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
              className={`${styles.moreButton} ${
                isMenuOpen ? styles.moreButtonOpen : ""
              }`}
              aria-label={t("actions.more", { name: role.name })}
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              <MoreHorizontal size={18} strokeWidth={2.3} />
            </button>
          </div>
          <button type="button" className={styles.editButton} onClick={onEdit}>
            <Pencil size={15} strokeWidth={2.3} />
            {t("actions.editRole")}
          </button>
        </>
      ) : (
        <span className={styles.lockedFooterText}>
          <Lock size={15} strokeWidth={2.3} />
          {t("actions.locked")}
        </span>
      )}
    </footer>
  );
};
