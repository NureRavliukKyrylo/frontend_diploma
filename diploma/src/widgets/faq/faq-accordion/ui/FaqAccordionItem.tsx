import { AnimatePresence, motion } from "framer-motion";
import { IconPlus } from "@tabler/icons-react";
import clsx from "clsx";
import type { FaqItem } from "../../config/faqData";
import styles from "./FaqAccordion.module.scss";

interface FaqAccordionItemProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}

export const FaqAccordionItem = ({
  item,
  isOpen,
  onToggle,
}: FaqAccordionItemProps) => {
  const answerId = `faq-answer-${item.id}`;

  return (
    <article className={clsx(styles.item, { [styles.open]: isOpen })}>
      <button
        type="button"
        className={styles.question}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={answerId}
      >
        <span>{item.question}</span>
        <motion.span
          className={styles.icon}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          aria-hidden="true"
        >
          <IconPlus size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            id={answerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className={styles.answer}>{item.answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};
