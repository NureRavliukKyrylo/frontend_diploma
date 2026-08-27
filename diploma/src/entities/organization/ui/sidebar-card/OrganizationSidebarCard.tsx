import Icon from "@mdi/react";
import { mdiBell, mdiBellOutline } from "@mdi/js";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { Globe } from "@shared/assets/icons/info";
import { DefaultAvatar } from "@shared/assets/images/user";
import type { Organization } from "../../model/types/organization/Organization";
import styles from "./OrganizationSidebarCard.module.scss";

interface OrganizationSidebarCardProps {
  organization: Organization;
  level: number;
  hideLevelBadge?: boolean;
  contactEmail: string;
  emailHref: string | null;
  websiteHref: string | null;
  isSubscriptionResolutionPending: boolean;
  isOrganizationOwner: boolean;
  isSubscribed: boolean;
  hasPendingJoinRequest: boolean;
  isNotificationsEnabled: boolean;
  isJoinPending: boolean;
  onJoin: () => void;
  onToggleNotifications: () => void;
  onRequestUnsubscribe: () => void;
}

export const OrganizationSidebarCard = ({
  organization,
  level,
  hideLevelBadge = false,
  contactEmail,
  emailHref,
  websiteHref,
  isSubscriptionResolutionPending,
  isOrganizationOwner,
  isSubscribed,
  hasPendingJoinRequest,
  isNotificationsEnabled,
  isJoinPending,
  onJoin,
  onToggleNotifications,
  onRequestUnsubscribe,
}: OrganizationSidebarCardProps) => {
  return (
    <aside className={styles.sideProfileCard}>
      <div className={styles.logoFrame}>
        <img
          src={organization.logoUrl ?? DefaultAvatar}
          alt={organization.name}
          className={styles.logoImage}
        />
        {!hideLevelBadge ? <span className={styles.levelBadge}>{level}</span> : null}
      </div>

      <div className={styles.identityBlock}>
        <h1>{organization.name}</h1>
        <div className={styles.emailRow}>
          {emailHref ? (
            <a
              href={emailHref}
              className={styles.email}
              aria-label={`Send email to ${organization.name}`}
            >
              {contactEmail}
            </a>
          ) : (
            <span className={styles.email}>{contactEmail}</span>
          )}
        </div>
      </div>

      {websiteHref ? (
        <a
          href={websiteHref}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.websiteButton}
        >
          <img src={Globe} alt="website" />
          <span>WEBSITE</span>
        </a>
      ) : null}

      {!isSubscriptionResolutionPending && !isOrganizationOwner ? (
        isSubscribed ? (
          <div className={styles.subscriptionControls}>
            <BaseButtonWrapper
              type="button"
              className={styles.unsubscribeButton}
              onClick={onRequestUnsubscribe}
            >
              LEAVE
            </BaseButtonWrapper>

            <BaseButtonWrapper
              type="button"
              className={`${styles.notificationButton} ${
                isNotificationsEnabled ? styles.notificationButtonActive : ""
              }`}
              aria-label={
                isNotificationsEnabled
                  ? "Disable organization notifications"
                  : "Enable organization notifications"
              }
              aria-pressed={isNotificationsEnabled}
              onClick={onToggleNotifications}
            >
              <Icon
                path={isNotificationsEnabled ? mdiBell : mdiBellOutline}
                size={1.15}
                color={isNotificationsEnabled ? "#8C0000" : "#111111"}
              />
            </BaseButtonWrapper>
          </div>
        ) : hasPendingJoinRequest ? (
          <BaseButtonWrapper
            type="button"
            className={styles.subscribeButton}
            disabled
          >
            JOIN REQUEST PENDING
          </BaseButtonWrapper>
        ) : (
          <BaseButtonWrapper
            type="button"
            className={styles.subscribeButton}
            onClick={onJoin}
            disabled={isJoinPending}
          >
            {isJoinPending ? "JOINING..." : "JOIN"}
          </BaseButtonWrapper>
        )
      ) : null}
    </aside>
  );
};
