import { getFullName } from "@entities/user";
import { RejectIcon } from "@shared/assets/icons/actions";
import { AnimatePresence, motion } from "framer-motion";
import type { Participant } from "../mention-button/MentionButton";
import styles from "./MessageForm.module.scss";

interface MentionPickerChipsProps {
  participants: Participant[];
  onRemove: (id: string) => void;
}

export const MentionPickerChips = ({
  participants,
  onRemove,
}: MentionPickerChipsProps) => (
  <AnimatePresence initial={false}>
    {participants.map((participant) => {
      const fullName = getFullName(participant.firstName, participant.lastName);

      return (
        <motion.span
          key={participant.id}
          className={styles.mentionTag}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.15 }}
        >
          @{fullName}
          <button
            type="button"
            className={styles.mentionTagRemove}
            onClick={() => onRemove(participant.id)}
          >
            <RejectIcon className={styles.mentionTagRemoveIcon} />
          </button>
        </motion.span>
      );
    })}
  </AnimatePresence>
);
