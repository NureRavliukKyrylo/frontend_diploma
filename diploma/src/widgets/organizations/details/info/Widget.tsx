import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { OrganizationSidebarCard } from "@entities/organization";
import type { Organization, OrganizationMember } from "@entities/organization";
import type { FeedbackSortValues } from "@entities/feedback";
import type { OrganizationDetailsTab } from "./config/tabs";
import { useOrganizationDetailsInfoModel } from "./model/useInfoModel";
import { OrganizationDetailsInternalNav } from "./ui/InternalNav";
import { OrganizationDetailsMetaStrip } from "./ui/MetaStrip";
import { OrganizationDetailsActionModals } from "./ui/ActionModals";
import { OrganizationDetailsTabContent } from "./ui/TabContent";
import { OrganizationDetailsInfoPanel } from "./ui/panel";
import styles from "./Widget.module.scss";

interface OrganizationDetailsInfoWidgetProps {
  organization: Organization;
  organizationId: string;
  members: OrganizationMember[];
  canManageOrganization?: boolean;
  canViewMembersTab?: boolean;
  membersAccessDenied?: boolean;
  isMembersLoading?: boolean;
  activeTab: OrganizationDetailsTab;
  onTabChange: (nextTab: OrganizationDetailsTab) => void;
}

export const OrganizationDetailsInfoWidget = ({
  organization,
  organizationId,
  members,
  canManageOrganization = false,
  canViewMembersTab = false,
  membersAccessDenied = false,
  activeTab,
  onTabChange,
}: OrganizationDetailsInfoWidgetProps) => {
  const [feedbackOrderBy, setFeedbackOrderBy] =
    useState<FeedbackSortValues>("Default");
  const model = useOrganizationDetailsInfoModel({
    organization,
    members,
    canManageOrganization,
    canViewMembersTab,
    activeTab,
    onTabChange,
  });

  return (
    <section className={styles.section}>
      <div className={styles.topLayout}>
        <OrganizationSidebarCard
          organization={organization}
          level={model.level}
          contactEmail={model.contactEmail}
          emailHref={model.emailHref}
          websiteHref={model.websiteHref}
          isSubscriptionResolutionPending={model.isSubscriptionResolutionPending}
          isOrganizationOwner={model.isOrganizationOwner}
          isSubscribed={model.isSubscribed}
          hasPendingJoinRequest={model.hasPendingJoinRequest}
          isNotificationsEnabled={model.isNotificationsEnabled}
          isJoinPending={model.isJoinPending}
          onJoin={model.requestJoin}
          onToggleNotifications={model.toggleNotifications}
          onRequestUnsubscribe={model.requestUnsubscribe}
        />

        <div className={styles.mainColumn}>
          {model.isMetaVisible ? (
            <OrganizationDetailsMetaStrip
              createdAtLabel={model.createdAtLabel}
              launchDateLabel={model.launchDateLabel}
              phoneLabel={model.phoneLabel}
            />
          ) : null}

          <OrganizationDetailsInfoPanel
            level={model.level}
            levelCurrent={model.levelCurrent}
            levelMax={model.levelMax}
            levelProgressPercent={model.levelProgressPercent}
            levelNext={model.levelNext}
            rating={model.rating}
            votes={model.votes}
            activeProjects={model.activeProjects}
            completedProjects={model.completedProjects}
            renderedDescription={model.renderedDescription}
            descriptionExpanded={model.descriptionExpanded}
            hasLongDescription={model.hasLongDescription}
            highlightedMembers={model.highlightedMembers}
            remainingMembersCount={model.remainingMembersCount}
            membersAccessDenied={membersAccessDenied}
            animation={model.animation}
            onToggleDescription={model.toggleDescription}
            onScrollToProjects={model.scrollToProjects}
          />
        </div>
      </div>

      <OrganizationDetailsInternalNav
        availableTabs={model.availableTabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
        prefersReducedMotion={model.prefersReducedMotion}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className={styles.tabContent}
          initial={
            model.prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 12 }
          }
          animate={{ opacity: 1, y: 0 }}
          exit={
            model.prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 12 }
          }
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <OrganizationDetailsTabContent
            activeTab={activeTab}
            organization={organization}
            organizationId={organizationId}
            canManageOrganization={canManageOrganization}
            feedbackOrderBy={feedbackOrderBy}
            setFeedbackOrderBy={setFeedbackOrderBy}
            model={model}
          />
        </motion.div>
      </AnimatePresence>

      <OrganizationDetailsActionModals organization={organization} model={model} />
    </section>
  );
};
