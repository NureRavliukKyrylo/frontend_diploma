import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";
import type {
  LandingAnimations,
  LandingTimeBankContent,
} from "../../model/types";
import styles from "./LandingTimeBank.module.scss";

interface LandingTimeBankProps {
  content: LandingTimeBankContent;
  animations: Pick<LandingAnimations, "sectionViewport">;
}

export const LandingTimeBank = ({
  content,
  animations,
}: LandingTimeBankProps) => (
  <section id="time-bank" className={styles.timeBankSection}>
    <div className={styles.timeBankInner}>
      <motion.div
        className={styles.timeBankText}
        initial={{ opacity: 0, x: -44 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={animations.sectionViewport}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <p className={styles.darkTag}>{content.tag}</p>
        <h2>{content.title}</h2>
        <p>{content.description}</p>
        <ul className={styles.timeBankList}>
          {content.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        className={styles.balanceCard}
        initial={{ opacity: 0, x: 44 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={animations.sectionViewport}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <div className={styles.balanceHeader}>
          <Clock3 size={22} aria-hidden="true" />
          <span>Time Balance</span>
        </div>
        <p className={styles.balanceValue}>{content.balance}</p>
        <p className={styles.balanceLevel}>{content.level}</p>
        <div className={styles.progressTrack}>
          <motion.div
            className={styles.progressFill}
            initial={{ width: "0%" }}
            whileInView={{ width: "68%" }}
            viewport={animations.sectionViewport}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className={styles.transactions}>
          {content.transactions.map((transaction) => (
            <div key={transaction.title} className={styles.transactionRow}>
              <span>{transaction.title}</span>
              <strong
                className={
                  transaction.tone === "positive"
                    ? styles.positive
                    : styles.negative
                }
              >
                {transaction.value}
              </strong>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);
