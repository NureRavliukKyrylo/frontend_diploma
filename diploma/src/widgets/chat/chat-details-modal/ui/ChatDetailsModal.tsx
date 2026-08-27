import { useEffect } from "react";
import { LogOut, Users, X } from "lucide-react";
import { Avatar } from "@shared/ui";
import { BaseModal } from "@shared/ui/modals";
import { getFullName } from "@entities/user";
import type { Chat } from "@entities/chat";
import { useTranslation } from "react-i18next";
import styles from "./ChatDetailsModal.module.scss";

interface ChatDetailsModalProps {
  isOpen: boolean;
  chat: Chat;
  onClose: () => void;
  onLeaveChat: () => void;
  isLeaving?: boolean;
}

export const ChatDetailsModal = ({
  isOpen,
  chat,
  onClose,
  onLeaveChat,
  isLeaving = false,
}: ChatDetailsModalProps) => {
  const { t } = useTranslation(["chat"]);
  const initials = chat.name?.split(" ").slice(0, 2).join(" ") ?? "Chat";
  const chipClassName = `${styles.typeChip} ${styles[chat.relatedEntityType]}`;

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="480px"
      showClosed={false}
      className={styles.modal}
    >
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.headerMain}>
            <Avatar
              className={styles.avatar}
              src={chat.avatarUrl ?? undefined}
              fallback={initials}
              shape="rounded"
            />
            <div className={styles.titleBlock}>
              <h2 className={styles.title}>{chat.name}</h2>
              <div className={styles.metaRow}>
                <span className={chipClassName}>
                  {t(`chat:categories.${chat.relatedEntityType}`, {
                    defaultValue: chat.relatedEntityType,
                  })}
                </span>
                <span className={styles.participantCount}>
                  {t("labels.membersCount", {
                    count: chat.participants.length,
                  })}
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            aria-label={t("chat:details.close")}
            onClick={onClose}
          >
            <X size={18} strokeWidth={2.6} aria-hidden="true" />
          </button>
        </header>

        <div className={styles.divider} />

        <section className={styles.participantsSection}>
          <h3 className={styles.sectionLabel}>
            <Users size={15} strokeWidth={2.4} aria-hidden="true" />
            {t("chat:details.participants")}
          </h3>
          <div className={styles.participantsList}>
            {chat.participants.map((participant) => {
              const fullName = getFullName(
                participant.firstName,
                participant.lastName,
              );

              return (
                <div className={styles.participantRow} key={participant.id}>
                  <Avatar
                    className={styles.participantAvatar}
                    src={participant.avatarUrl}
                    fallback={fullName}
                    shape="rounded"
                  />
                  <div className={styles.participantInfo}>
                    <span className={styles.participantName}>{fullName}</span>
                    <span className={styles.participantRole}>
                      {participant.roleName}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <footer className={styles.footer}>
          <button
            type="button"
            className={styles.leaveButton}
            onClick={onLeaveChat}
            disabled={isLeaving}
          >
            <LogOut size={17} strokeWidth={2.4} aria-hidden="true" />
            {t("chat:actions.leaveChat")}
          </button>
        </footer>
      </div>
    </BaseModal>
  );
};
