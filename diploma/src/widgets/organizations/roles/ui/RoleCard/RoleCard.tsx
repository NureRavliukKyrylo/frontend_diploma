import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { ContextRoleDto } from "@entities/organization";
import {
  getRoleAccentColor,
  getRoleIndexLabel,
  type ContextRoleCardType,
} from "../../config/rolePresentation";
import { formatArchiveDate, formatArchiveReason } from "./lib/roleArchiveFormat";
import { RoleCardActions } from "./ui/RoleCardActions";
import { RoleTags } from "./ui/RoleTags";
import styles from "./RoleCard.module.scss";

export interface RoleCardProps {
  role: ContextRoleDto;
  index: number;
  type: ContextRoleCardType;
  memberCount?: number;
  archived?: boolean;
  onClick: () => void;
  onEdit?: () => void;
  onUse?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  onRestore?: () => void;
  onSetDefault?: () => void;
}

export const RoleCard = ({
  role,
  index,
  type,
  memberCount = 0,
  archived = false,
  onClick,
  onEdit,
  onUse,
  onArchive,
  onDelete,
  onRestore,
  onSetDefault,
}: RoleCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const accentColor = getRoleAccentColor(index);
  const indexLabel = getRoleIndexLabel(type, index);
  const archiveReason = formatArchiveReason(role.archiveReason);
  const archiveDate = formatArchiveDate(role.archivedAt);

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
    <motion.article
      className={[
        styles.roleCard,
        type === "system" ? styles.locked : "",
        type === "template" ? styles.template : "",
        archived ? styles.archived : "",
      ]
        .filter(Boolean)
        .join(" ")}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{
        y: type === "system" ? -2 : -5,
        scale: type === "system" ? 1 : 1.01,
      }}
      onClick={onClick}
    >
      <span className={styles.cardDeco} aria-hidden="true" />

      <div className={styles.cardBody}>
        <div className={styles.topRow}>
          <span className={styles.indexMark}>{indexLabel}</span>
          <RoleTags
            type={type}
            isDefaultForJoin={role.isDefaultForJoin}
          />
        </div>

        <h3 className={styles.roleName}>{role.name}</h3>
        <p className={styles.roleDescription}>
          {role.description?.trim() || "No description provided yet."}
        </p>

        {archived && (archiveReason || archiveDate) ? (
          <p className={styles.archiveMeta}>
            {archiveReason ? `Archived: ${archiveReason}` : "Archived role"}
            {archiveDate ? ` · ${archiveDate}` : ""}
          </p>
        ) : null}

        <div className={styles.permsCount}>
          <div className={styles.permsBar}>
            <div
              className={styles.permsFill}
              style={{
                width: `${Math.min((role.permissions.length / 16) * 100, 100)}%`,
                backgroundColor: accentColor,
              }}
            />
          </div>
          <span className={styles.permsNum}>
            {role.permissions.length} permissions
          </span>
        </div>

        <div className={styles.footer}>
          <span className={styles.metaText}>
            {type === "template"
              ? "Ready to use"
              : `${memberCount} ${memberCount === 1 ? "member" : "members"}`}
          </span>

          <div
            className={styles.actions}
            onClick={(event) => event.stopPropagation()}
          >
            <RoleCardActions
              roleName={role.name}
              isDefaultForJoin={role.isDefaultForJoin}
              type={type}
              archived={archived}
              isMenuOpen={isMenuOpen}
              menuRef={menuRef}
              onToggleMenu={() => setIsMenuOpen((current) => !current)}
              onCloseMenu={() => setIsMenuOpen(false)}
              onEdit={onEdit}
              onUse={onUse}
              onArchive={onArchive}
              onDelete={onDelete}
              onRestore={onRestore}
              onSetDefault={onSetDefault}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
};
