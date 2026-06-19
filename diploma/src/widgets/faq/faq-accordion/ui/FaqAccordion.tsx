import { AnimatePresence, motion } from "framer-motion";
import type { FaqItem } from "../../config/faqData";
import { FaqAccordionItem } from "./FaqAccordionItem";
import styles from "./FaqAccordion.module.scss";

interface FaqAccordionProps {
  items: FaqItem[];
  openId: string | null;
  onToggle: (id: string | null) => void;
}

export const FaqAccordion = ({
  items,
  openId,
  onToggle,
}: FaqAccordionProps) => (
  <motion.div
    className={styles.accordion}
    variants={{
      hidden: {},
      show: { transition: { staggerChildren: 0.07, delayChildren: 0.4 } },
    }}
    initial="hidden"
    animate="show"
  >
    <AnimatePresence initial={false} mode="popLayout">
      {items.map(item => (
        <motion.div
          key={item.id}
          layout
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.35, ease: "easeOut" },
            },
          }}
          exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
        >
          <FaqAccordionItem
            item={item}
            isOpen={openId === item.id}
            onToggle={() => onToggle(openId === item.id ? null : item.id)}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  </motion.div>
);
