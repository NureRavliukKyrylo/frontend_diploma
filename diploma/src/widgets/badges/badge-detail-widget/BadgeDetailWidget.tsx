import { ReadMoreButton } from "@shared/ui/buttons";
import styles from "./BadgeDetailWidget.module.scss";
import { formatDateToText } from "@shared/libs/date";
import { Stars } from "@shared/ui/stars";
import { TierOrder } from "@entities/badge/model/types/tier/TierList";
import { ProgressBar } from "@shared/ui";
import { badgesQuery, TierColors } from "@entities/badge";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ShareBadgeButton } from "@features/badge";
import { Link } from "@tanstack/react-router";
import { LockedIcon } from "@shared/assets/icons/info";
import { useTranslation, Trans } from "react-i18next";

const entityTypeToRoute = {
  organization: "/organizations/$id",
  project: "/projects/$id",
  event: "/events/$id",
  task: "/tasks/$id",
} as const;

export const BadgeDetailWidget = ({ id }: { id: string }) => {
  const { t, i18n } = useTranslation(["badge"]);
  const { data: badge } = useSuspenseQuery(badgesQuery.id(id));

  return (
    <>
      <div className={styles.imageWrapper}>
        <img
          className={styles.iconUrl}
          src={badge.iconUrl}
          alt={t("badge:labels.imgAltBadge")}
        />
        {!badge.isUnlocked && (
          <div className={styles.lockedOverlay}>
            <LockedIcon />
          </div>
        )}
      </div>
      <div className={styles.badgeDetailInfo}>
        <div className={styles.headerInfo}>
          <div className={styles.shareTitleWrapper}>
            <h1>{badge.title}</h1>
            {badge.isUnlocked && (
              <ShareBadgeButton
                text={t("badge:share.message", { title: badge.title })}
                pageUrl={`https://impactflow.com/badges/${badge.id}`}
              />
            )}
          </div>
          <div className={styles.rankEntity}>
            <h2 style={{ color: TierColors[badge.rank.name] }}>
              {t("badge:labels.rankCapital", { rank: badge.rank.name })}
            </h2>
            {badge.scopeEntityType ? (
              <Link
                to={entityTypeToRoute[badge.scopeEntityType]}
                params={{ id: badge.scopeEntityId }}
                className={styles.entityInfo}
              >
                {badge.scopeEntityType === "organization" && (
                  <img src="" alt={t("badge:labels.imgAltOrg")} />
                )}
                <p>{t(`badge:scopes.${badge.scopeEntityType}`)}</p>
              </Link>
            ) : (
              <div className={styles.entityInfo}>
                <p>{t("badge:scopes.global")}</p>
              </div>
            )}
          </div>
        </div>
        <div className={styles.middleInfo}>
          <ReadMoreButton
            collapsedHeight={80}
            className={styles.readMoreButtonContainer}
            classNameButton={styles.readMoreButtonBadge}
          >
            <p>{badge.description}</p>
          </ReadMoreButton>
          <div className={styles.metaInfo}>
            <div className={styles.receivedAll}>
              <div className={styles.titleInfo}>
                <h1>{t("badge:labels.volunteers")}</h1>
                <h2>{t("badge:labels.received")}</h2>
              </div>
              <p>{badge.awardedCountTotal}</p>
            </div>
            <div className={styles.earnedOn}>
              <div className={styles.titleInfo}>
                <h1>{t("badge:labels.first")}</h1>
                <h2>{t("badge:labels.earnedOn")}</h2>
              </div>
              <p>
                {badge.firstAwardedAt
                  ? formatDateToText(
                      badge.firstAwardedAt,
                      i18n.language as "en" | "uk",
                    )
                  : "—"}
              </p>
            </div>
          </div>
          <div className={styles.rarityBlock}>
            <h1>{t("badge:labels.rarity")}</h1>
            <Stars
              value={TierOrder[badge.rank.name]}
              maxStars={Object.keys(TierOrder).length}
              classNameStar={styles.rarityStar}
            />
          </div>
        </div>
        <div className={styles.bottomInfo}>
          <div className={styles.progressBlock}>
            <h1>{t("badge:labels.progress")}</h1>
            <ProgressBar current={badge.progressPercent} max={100} />
            <h2>
              {badge.progressPercent === 100 ? (
                <Trans
                  i18nKey="badge:progressMessages.completed"
                  values={{ title: badge.title }}
                  components={[<span key="bold" />]}
                />
              ) : (
                <Trans
                  i18nKey="badge:progressMessages.incomplete"
                  values={{
                    remaining: 100 - badge.progressPercent,
                    title: badge.title,
                  }}
                  components={[<span key="bold" />]}
                />
              )}
            </h2>
          </div>
          <div className={styles.requirementsBadge}>
            {badge.ruleProgress.map((value, idx) => (
              <h1 key={idx}>{value.label}</h1>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
