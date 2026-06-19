import {
  IconCalendar,
  IconFlag,
  IconHash,
  type Icon,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import styles from "./BannedInfoCard.module.scss";

interface InfoRow {
  icon: Icon;
  label: string;
  value: string;
}

const rows: InfoRow[] = [
  { icon: IconFlag, label: "Reason", value: "Time Bank manipulation" },
  { icon: IconCalendar, label: "Suspended until", value: "June 28, 2026" },
  { icon: IconHash, label: "Case ID", value: "#IF-29481" },
];

export const BannedInfoCard = () => {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
    >
      {rows.map(({ icon: RowIcon, label, value }, index) => (
        <div key={label}>
          <div className={styles.row}>
            <span className={styles.label}>
              <RowIcon size={16} strokeWidth={2.2} />
              {label}
            </span>
            <span className={styles.value}>{value}</span>
          </div>
          {index < rows.length - 1 && <div className={styles.divider} />}
        </div>
      ))}
    </motion.div>
  );
};
