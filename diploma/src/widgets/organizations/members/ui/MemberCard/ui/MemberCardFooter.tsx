import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Check,
  MessageSquare,
  MoreHorizontal,
  UserMinus,
} from "lucide-react";
import type { OrganizationContextRole } from "@entities/organization";
import type { useMemberRoleMenu } from "../lib/useMemberRoleMenu";
import type { OrganizationMemberCardModel } from "../types";
import { getRoleTone } from "./roleTone";
import styles from "../MemberCard.module.scss";

interface MemberCardFooterProps {
  member: OrganizationMemberCardModel;
  roleMenu: ReturnType<typeof useMemberRoleMenu>;
  isRoleChangePending: boolean;
  showRoleSection: boolean;
  entityLabel: string;
  onProfileClick: (member: OrganizationMemberCardModel) => void;
  onMessageClick: (member: OrganizationMemberCardModel) => void;
  onRemoveClick: (member: OrganizationMemberCardModel) => void;
}

export const MemberCardFooter = ({
  member,
  roleMenu,
  isRoleChangePending,
  showRoleSection,
  entityLabel,
  onProfileClick,
  onMessageClick,
  onRemoveClick,
}: MemberCardFooterProps) => {
  const { t } = useTranslation("common");
  const entity = t(`member.entities.${entityLabel}`);

  return (
    <div className={styles.footer}>
    <button
      type="button"
      className={styles.profileBtn}
      onClick={() => onProfileClick(member)}
    >
      {t("member.profile")}
    </button>

    {!member.isOwner ? (
      <div className={styles.menuWrap} ref={roleMenu.menuRef}>
        <AnimatePresence>
          {roleMenu.isMenuOpen ? (
            <motion.div
              className={styles.dropdownMenu}
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              {showRoleSection ? (
                <RoleMenuSection
                  roles={roleMenu.availableRoles}
                  roleMenu={roleMenu}
                  isRoleChangePending={isRoleChangePending}
                />
              ) : null}

              <div className={styles.menuSection}>
                <button
                  type="button"
                  className={styles.menuAction}
                  onClick={() => {
                    onMessageClick(member);
                    roleMenu.closeMenu();
                  }}
                >
                  <MessageSquare size={15} strokeWidth={2.2} />
                  <span>{t("member.sendMessage")}</span>
                </button>
              </div>

              <div className={styles.menuSection}>
                <button
                  type="button"
                  className={`${styles.menuAction} ${styles.menuActionDanger}`}
                  onClick={() => {
                    onRemoveClick(member);
                    roleMenu.closeMenu();
                  }}
                >
                  <UserMinus size={15} strokeWidth={2.2} />
                  <span>{t("member.removeFrom", { entity })}</span>
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <button
          type="button"
          className={`${styles.moreBtn} ${
            roleMenu.isMenuOpen ? styles.moreBtnOpen : ""
          }`}
          aria-expanded={roleMenu.isMenuOpen}
          aria-label={t("member.openActions", { name: member.fullName })}
          onClick={roleMenu.toggleMenu}
        >
          <MoreHorizontal size={20} strokeWidth={2.4} />
        </button>
      </div>
    ) : null}
    </div>
  );
};

interface RoleMenuSectionProps {
  roles: OrganizationContextRole[];
  roleMenu: ReturnType<typeof useMemberRoleMenu>;
  isRoleChangePending: boolean;
}

const RoleMenuSection = ({
  roles,
  roleMenu,
  isRoleChangePending,
}: RoleMenuSectionProps) => {
  const { t } = useTranslation("common");

  return (
    <div className={styles.menuSection}>
    <p className={styles.sectionLabel}>{t("member.changeRole")}</p>
    <div className={styles.roleList}>
      {roles.map((role) => {
        const isActiveRole = roleMenu.isCurrentRole(role.id);
        const tone = getRoleTone(role.name, false, t("member.ownerLabel"));

        return (
          <button
            key={role.id}
            type="button"
            className={styles.roleItem}
            disabled={isRoleChangePending || isActiveRole}
            onClick={() => roleMenu.selectRole(role.id)}
          >
            <span
              className={styles.roleDot}
              style={{ backgroundColor: tone.dotColor }}
            />
            <span className={styles.roleItemLabel}>{role.name}</span>
            {isActiveRole ? (
              <Check
                size={14}
                strokeWidth={2.8}
                className={styles.roleCheck}
              />
            ) : null}
          </button>
        );
      })}
    </div>
    </div>
  );
};
