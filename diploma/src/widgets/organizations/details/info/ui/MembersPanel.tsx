import Icon from "@mdi/react";
import { mdiDotsHorizontal } from "@mdi/js";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { profileSearchDefaults } from "@entities/user";
import { Avatar } from "@shared/ui";
import type { OrganizationDetailsAnimationConfig } from "../lib/animation";
import type { DirectoryMemberCard } from "../lib/helpers";
import styles from "./MembersPanel.module.scss";

interface OrganizationDetailsMembersPanelProps {
  memberDirectoryCards: DirectoryMemberCard[];
  animation: OrganizationDetailsAnimationConfig;
  canManageMembers?: boolean;
  canSelfUnsubscribe?: boolean;
  currentUserId?: string | null;
  onRequestUnsubscribe?: (member: DirectoryMemberCard) => void;
}

export const OrganizationDetailsMembersPanel = ({
  memberDirectoryCards,
  animation,
  canManageMembers = false,
  canSelfUnsubscribe = false,
  currentUserId,
  onRequestUnsubscribe,
}: OrganizationDetailsMembersPanelProps) => {
  const { t } = useTranslation("organizations");
  const { containerVariants, blockVariants, subtleHover } = animation;

  return (
    <motion.div
      className={styles.membersPanel}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
    >
      <div className={styles.membersDirectoryGrid}>
        <div className={styles.membersDirectoryIntro}>
          <div className={styles.membersDirectoryIntroCopy}>
            <h3>{t("details.members.title")}</h3>
            <p>{t("details.members.description")}</p>
          </div>
        </div>

        {memberDirectoryCards.length > 0 ? (
          memberDirectoryCards.map((memberCard) => (
            <motion.article
              key={memberCard.id}
              className={`${styles.membersDirectoryCard} ${styles.membersDirectoryCardInteractive}`}
              variants={blockVariants}
              whileHover={subtleHover}
            >
              {(((memberCard.id === currentUserId && canSelfUnsubscribe) ||
                (memberCard.id !== currentUserId && canManageMembers)) &&
                !memberCard.isOwner &&
                onRequestUnsubscribe) ? (
                <div className={styles.membersDirectoryActions}>
                  <Dropdown placement="bottom-end" shouldBlockScroll={false}>
                    <DropdownTrigger>
                      <button
                        type="button"
                        className={styles.membersDirectoryMenuButton}
                        aria-label={t("details.actions.openActions", {
                          name: memberCard.name,
                        })}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <Icon path={mdiDotsHorizontal} size={0.95} />
                      </button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label={t("details.actions.memberActions", {
                        name: memberCard.name,
                      })}
                    >
                      <DropdownItem
                        key="unsubscribe"
                        onClick={() => onRequestUnsubscribe(memberCard)}
                        classNames={{
                          base: styles.membersDirectoryDropdownItem,
                          title: styles.membersDirectoryDropdownTitle,
                        }}
                      >
                        {memberCard.id === currentUserId
                          ? t("details.actions.leave")
                          : t("details.actions.remove")}
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              ) : null}

              <Link
                to={memberCard.profilePath}
                search={profileSearchDefaults.profile}
                className={styles.membersDirectoryLink}
                aria-label={t("details.actions.openProfile", {
                  name: memberCard.name,
                })}
              >
                <Avatar
                  src={memberCard.avatarUrl ?? undefined}
                  fallback={memberCard.name}
                  variant={memberCard.avatarUrl ? "default" : "initials"}
                  className={styles.membersDirectoryAvatar}
                  initialsClassName={styles.membersDirectoryInitials}
                />

                <div className={styles.membersDirectoryMeta}>
                  <h4>{memberCard.name}</h4>
                  <p>{memberCard.roleLabel}</p>
                </div>
              </Link>
            </motion.article>
          ))
        ) : (
          <motion.article
            className={styles.membersDirectoryEmpty}
            variants={blockVariants}
          >
            <h4>{t("details.members.emptyTitle")}</h4>
            <p>{t("details.members.emptyText")}</p>
          </motion.article>
        )}
      </div>
    </motion.div>
  );
};
