import { motion } from "framer-motion";
import { Clock3, timeBankBullets, transactions } from "../../config/landingContent";
import { sectionViewport } from "../../lib/animations";
import styles from "./TimeBankSection.module.scss";

export const TimeBankSection = () => (
  <section id="time-bank" className={styles.timeBankSection}>
    <div className={styles.timeBankInner}>
      <motion.div
        className={styles.timeBankText}
        initial={{ opacity: 0, x: -44 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={sectionViewport}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <p className={styles.darkTag}>Time Bank</p>
        <h2>Your time is real currency</h2>
        <p>
          Every hour you give becomes a meaningful balance you can use to start
          new missions, help others, and grow your impact profile.
        </p>

        <ul className={styles.timeBankList}>
          {timeBankBullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        className={styles.balanceCard}
        initial={{ opacity: 0, x: 44 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={sectionViewport}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <div className={styles.balanceHeader}>
          <Clock3 size={22} aria-hidden="true" />
          <span>Time Balance</span>
        </div>
        <p className={styles.balanceValue}>142h</p>
        <p className={styles.balanceLevel}>Level 8 &middot; Experienced Volunteer</p>
        <div className={styles.progressTrack}>
          <motion.div
            className={styles.progressFill}
            initial={{ width: "0%" }}
            whileInView={{ width: "68%" }}
            viewport={sectionViewport}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>

        <div className={styles.transactions}>
          {transactions.map((transaction) => (
            <div key={transaction.title} className={styles.transactionRow}>
              <span>{transaction.title}</span>
              <strong
                className={
                  transaction.tone === "positive" ? styles.positive : styles.negative
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
