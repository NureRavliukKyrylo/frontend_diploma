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
import { useTranslation } from "react-i18next";

export const OverviewTab = () => {
  const { t } = useTranslation("timeBank");
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
          <span className={styles.balanceLabel}>
            {t("overview.balance.label").toUpperCase()}
          </span>
          <div className={styles.balanceAmount}>
            <h1>{stats.balanceHours}</h1>
            <span className={styles.unit}>{t("units.h")}</span>
          </div>
          <p className={styles.balanceMinutes}>
            {t("overview.balance.minutes", { count: stats.balanceMinutes })}
          </p>
          <div className={styles.balanceStats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>
                {stats.reservedMinutes}
                {t("units.m")}
              </span>
              <span className={styles.statLabel}>
                {t("overview.balance.reserved")}
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>
                {stats.lifetimeEarnedMinutes}
                {t("units.m")}
              </span>
              <span className={styles.statLabel}>
                {t("overview.balance.lifetimeEarned")}
              </span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>
                {stats.lifetimeSpentMinutes}
                {t("units.m")}
              </span>
              <span className={styles.statLabel}>
                {t("overview.balance.lifetimeSpent")}
              </span>
            </div>
          </div>
          <div className={styles.levelProgressBlock}>
            <div className={styles.levelProgressHeader}>
              <span>{t("overview.level.progressGeneric")}</span>
              <span>
                {stats.progressMinutes}
                {t("units.m")} / {stats.nextLevelMinMinutes}
                {t("units.m")}
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
                <span className={styles.currentLevelSub}>
                  {t("overview.level.title")}
                </span>
              </div>
            </div>
            <span className={styles.lvlBadge}>
              {t("overview.level.badgeLabel", {
                order: stats.currentLevel.sortOrder,
              })}
            </span>
          </div>

          <div className={styles.progressToNext}>
            <div className={styles.progressToNextHeader}>
              <span className={styles.nextLevelProgress}>
                {t("overview.level.progress", { name: stats.nextLevel.title })}
              </span>
              <span>
                {stats.progressMinutes}
                {t("units.m")} / {stats.nextLevelMinMinutes}
                {t("units.m")}
              </span>
            </div>
            <ProgressBar
              current={stats.progressPercent}
              className={styles.levelProgressBar}
            />
            <p className={styles.nextLevelHint}>
              {t("overview.level.hint", {
                name: stats.nextLevel.title,
                remaining: stats.nextLevelMinMinutes - stats.progressMinutes,
              })}
            </p>
          </div>

          <div className={styles.monthStats}>
            <div className={styles.monthRow}>
              <span>{t("overview.monthly.earned")}</span>
              <span className={styles.positive}>
                +{stats.currentMonthEarnedMinutes}
                {t("units.m")}
              </span>
            </div>
            <div className={styles.monthRow}>
              <span>{t("overview.monthly.spent")}</span>
              <span className={styles.negative}>
                -{stats.currentMonthSpentMinutes}
                {t("units.m")}
              </span>
            </div>
            <div className={styles.monthRow}>
              <span>{t("overview.monthly.reservations")}</span>
              <span className={styles.highlight}>
                {stats.reservedMinutes}
                {t("units.m")}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className={styles.statsRow}>
        {[
          {
            label: t("overview.cards.lifetimeEarned"),
            value: stats.lifetimeEarnedMinutes,
            delta: t("overview.cards.monthDeltaPositive", {
              count: stats.currentMonthEarnedMinutes,
            }),
            positive: true,
          },
          {
            label: t("overview.cards.lifetimeSpent"),
            value: stats.lifetimeSpentMinutes,
            delta: t("overview.cards.monthDeltaNegative", {
              count: stats.currentMonthSpentMinutes,
            }),
            positive: false,
          },
          {
            label: t("overview.cards.giftedIn"),
            value: stats.lifetimeGiftedInMinutes,
            delta: t("overview.cards.monthDeltaPositive", {
              count: stats.currentMonthGiftedInMinutes,
            }),
            positive: true,
          },
          {
            label: t("overview.cards.giftedOut"),
            value: stats.lifetimeGiftedOutMinutes,
            delta: t("overview.cards.monthDeltaNegative", {
              count: stats.currentMonthGiftedOutMinutes,
            }),
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
              <span className={styles.statCardUnit}>{t("units.m")}</span>
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
          <h2>{t("overview.transactions.title")}</h2>
          <motion.div
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ display: "inline-flex" }}
          >
            <LinkButtonWrapper
              to="/time-bank"
              search={{ tab: "transactions" }}
              className={styles.viewAll}
            >
              {t("overview.transactions.viewAll")}
              <Arrow />
            </LinkButtonWrapper>
          </motion.div>
        </div>
        {recentTransactions?.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>{t("overview.transactions.empty")}</h2>
            <p>{t("overview.transactions.emptyDescription")}</p>
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
