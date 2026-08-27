import { motion, AnimatePresence } from "framer-motion";
import { MentionIcon } from "@shared/assets/icons/actions";
import { Avatar } from "@shared/ui";
import { getFullName } from "@entities/user";
import { getMentionColor } from "@shared/config/constants";
import styles from "./MentionButton.module.scss";
import { useRef, useState } from "react";
import { useOutsideClick } from "@shared/libs/hooks";
import { useTranslation } from "react-i18next";

export interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  roleName: string;
}

interface MentionButtonProps {
  participants: Participant[];
  mentionIds: string[];
  onToggle: (id: string) => void;
}

export const MentionButton = ({
  participants,
  mentionIds,
  onToggle,
}: MentionButtonProps) => {
  const { t } = useTranslation(["chat"]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClick([wrapperRef], () => setIsOpen(false));

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <motion.button
        type="button"
        className={`${styles.button} ${isOpen ? styles.buttonActive : ""}`}
        onClick={() => setIsOpen((p) => !p)}
        whileTap={{ scale: 0.88 }}
        whileHover={{ scale: 1.08 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <MentionIcon className={styles.icon} />
        <AnimatePresence>
          {mentionIds.length > 0 && (
            <motion.span
              className={styles.badge}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {mentionIds.length}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.popover}
            initial={{ opacity: 0, scale: 0.92, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 6 }}
            transition={{ type: "spring", stiffness: 340, damping: 24 }}
            style={{ originX: 0, originY: 1 }}
          >
            {participants.length === 0 && (
              <span className={styles.empty}>
                {t("chat:states.noParticipants")}
              </span>
            )}
            {participants.map((p, i) => {
              const fullName = getFullName(p.firstName, p.lastName);
              const isSelected = mentionIds.includes(p.id);
              const bgColor = getMentionColor(fullName);
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <button
                    type="button"
                    className={`${styles.item} ${isSelected ? styles.selected : ""}`}
                    onClick={() => onToggle(p.id)}
                  >
                    <Avatar
                      src={p.avatarUrl}
                      fallback={fullName}
                      className={styles.avatar}
                    />
                    <div className={styles.info}>
                      <span className={styles.name}>{fullName}</span>
                      <span className={styles.role}>{p.roleName}</span>
                    </div>
                    {isSelected && (
                      <motion.div
                        className={styles.selectedDot}
                        style={{ background: bgColor }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 20,
                        }}
                      />
                    )}
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
