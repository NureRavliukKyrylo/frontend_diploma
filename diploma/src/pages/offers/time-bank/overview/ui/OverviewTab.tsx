import styles from "./OverviewTab.module.scss";
import { ProgressBar } from "@shared/ui";
import { TransactionsListWidget } from "@widgets/offers";
import { offerQuery, TransactionListItem } from "@entities/offer";
import { LinkButtonWrapper } from "@shared/ui/buttons";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { staggeredCardVariants } from "@shared/assets/animations";
import { BadgeIcon } from "@shared/assets/icons/info";
import { Arrow } from "@shared/assets/icons/actions";

export const OverviewTab = () => {
  const { data: stats } = useQuery(offerQuery.stats());

  if (!stats) return null;

  const recentTransactions = stats.recentTransactions?.slice(0, 6) ?? [];

  return (
    <div className={styles.overviewWrapper}>
      <div className={styles.topRow}>
        <motion.div
          className={styles.balanceCard}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className={styles.balanceLabel}>AVAILABLE BALANCE</span>
          <div className={styles.balanceAmount}>
            <h1>{stats.balanceHours}</h1>
            <span className={styles.unit}>h</span>
          </div>
          <p className={styles.balanceMinutes}>
            {stats.balanceMinutes} minutes
          </p>
          <div className={styles.balanceStats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{stats.reservedMinutes}m</span>
              <span className={styles.statLabel}>Reserved</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>
                {stats.lifetimeEarnedMinutes}m
              </span>
              <span className={styles.statLabel}>Lifetime Earned</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>
                {stats.lifetimeSpentMinutes}m
              </span>
              <span className={styles.statLabel}>Lifetime Spent</span>
            </div>
          </div>
          <div className={styles.levelProgressBlock}>
            <div className={styles.levelProgressHeader}>
              <span>Progress to next level</span>
              <span>
                {stats.progressMinutes}m / {stats.nextLevelMinMinutes}m
              </span>
            </div>
            <ProgressBar
              current={stats.progressPercent}
              className={styles.progressBar}
            />
          </div>
        </motion.div>
        <motion.div
          className={styles.levelCard}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <div className={styles.levelCardTop}>
            <div className={styles.currentLevelBadge}>
              <div className={styles.badgeWrapper}>
                <BadgeIcon />
              </div>
              <div className={styles.levelInfo}>
                <span className={styles.currentLevelTitle}>
                  {stats.currentLevel?.title ?? "—"}
                </span>
                <span className={styles.currentLevelSub}>Current level</span>
              </div>
            </div>
            <span className={styles.lvlBadge}>
              LVL {stats.currentLevel.sortOrder}
            </span>
          </div>

          <div className={styles.progressToNext}>
            <div className={styles.progressToNextHeader}>
              <span className={styles.nextLevelProgress}>
                Progress to {stats.nextLevel.title}
              </span>
              <span>
                {stats.progressMinutes}m / {stats.nextLevelMinMinutes}m
              </span>
            </div>
            <ProgressBar
              current={stats.progressPercent}
              className={styles.levelProgressBar}
            />
            <p className={styles.nextLevelHint}>
              Next: <strong>{stats.nextLevel.title}</strong> -{" "}
              {stats.nextLevelMinMinutes - stats.progressMinutes}m to go
            </p>
          </div>

          <div className={styles.monthStats}>
            <div className={styles.monthRow}>
              <span>This month earned</span>
              <span className={styles.positive}>
                +{stats.currentMonthEarnedMinutes}m
              </span>
            </div>
            <div className={styles.monthRow}>
              <span>This month spent</span>
              <span className={styles.negative}>
                -{stats.currentMonthSpentMinutes}m
              </span>
            </div>
            <div className={styles.monthRow}>
              <span>Active reservations</span>
              <span className={styles.highlight}>{stats.reservedMinutes}m</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className={styles.statsRow}>
        {[
          {
            label: "LIFETIME EARNED",
            value: stats.lifetimeEarnedMinutes,
            delta: `+${stats.currentMonthEarnedMinutes}m this month`,
            positive: true,
          },
          {
            label: "LIFETIME SPENT",
            value: stats.lifetimeSpentMinutes,
            delta: `-${stats.currentMonthSpentMinutes}m this month`,
            positive: false,
          },
          {
            label: "GIFTED IN",
            value: stats.lifetimeGiftedInMinutes,
            delta: `+${stats.currentMonthGiftedInMinutes}m this month`,
            positive: true,
          },
          {
            label: "GIFTED OUT",
            value: stats.lifetimeGiftedOutMinutes,
            delta: `-${stats.currentMonthGiftedOutMinutes}m this month`,
            positive: false,
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className={styles.statCard}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
          >
            <span className={styles.statCardLabel}>{stat.label}</span>
            <div className={styles.statCardValue}>
              <h2>{stat.value}</h2>
              <span className={styles.statCardUnit}>m</span>
            </div>
            <span
              className={`${styles.statCardDelta} ${stat.positive ? styles.positive : styles.negative}`}
            >
              {stat.delta}
            </span>
          </motion.div>
        ))}
      </div>

      <div className={styles.transactionsCard}>
        <div className={styles.transactionsHeader}>
          <h2>Recent Transactions</h2>
          <LinkButtonWrapper
            to="/time-bank"
            search={{ tab: "transactions" }}
            className={styles.viewAll}
          >
            View all
            <Arrow />
          </LinkButtonWrapper>
        </div>
        {recentTransactions?.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>No transactions yet</h2>
            <p>Your time bank activity will appear here</p>
          </div>
        ) : (
          <TransactionsListWidget
            transactions={recentTransactions}
            className={styles.transactionsList}
            renderCard={(transaction, index) => (
              <motion.div
                key={transaction.id}
                custom={index + 1}
                variants={staggeredCardVariants}
                initial="hidden"
                animate="visible"
              >
                <TransactionListItem transaction={transaction} />
              </motion.div>
            )}
          />
        )}
      </div>
    </div>
  );
};
