import { UserRoundX } from "lucide-react";
import { useTranslation } from "react-i18next";
import { InviteVolunteerModal } from "@features/invitation/invite-volunteer";
import {
  ManagementPageLayout,
  ManagementTopRow,
} from "@shared/ui/management-page-shell";
import {
  PublicProfileAbout,
  PublicProfileAvailability,
  PublicProfileBadges,
  PublicProfileOrganizations,
  PublicProfileOverview,
  PublicProfileSidebar,
  PublicProfileSkills,
} from "@widgets/users/public-profile";
import { usePublicUserProfilePage } from "../model/usePublicUserProfilePage";
import styles from "./PublicUserProfilePage.module.scss";

const PageState = ({ text }: { text: string }) => (
  <ManagementPageLayout>
    <div className={styles.state}>
      <UserRoundX size={30} />
      <strong>{text}</strong>
    </div>
  </ManagementPageLayout>
);

export const PublicUserProfilePage = () => {
  const { t } = useTranslation("common");
  const model = usePublicUserProfilePage();

  if (model.isLoading) {
    return <PageState text={t("publicProfile.loading")} />;
  }

  if (model.isError || !model.profile) {
    return <PageState text={t("publicProfile.error")} />;
  }

  const details = model.profile.profile;

  return (
    <ManagementPageLayout>
      <div className={styles.content}>
        <ManagementTopRow
          contextName={model.organization?.name}
          title={model.fullName}
          onBack={model.handleBack}
        />

        <div className={styles.layout}>
          <PublicProfileSidebar
            profile={model.profile}
            fullName={model.fullName}
            canInvite={model.canInvite}
            isInvited={model.isInvited}
            isInviting={model.isInviting}
            isOpeningChat={model.isOpeningChat}
            onInvite={model.openInvitation}
            onMessage={model.sendMessage}
          />

          <main className={styles.sections}>
            <PublicProfileAbout
              bio={details?.bio ?? null}
              progress={model.profile.progress}
              rating={model.profile.rating}
            />
            <PublicProfileOverview profile={details} />
            <PublicProfileSkills skills={model.profile.skills} />
            <PublicProfileBadges
              badges={details?.badgesPreview ?? []}
              unlockedCount={details?.unlockedBadgesCount ?? 0}
              lockedCount={details?.lockedBadgesCount ?? 0}
            />
            <PublicProfileOrganizations
              organizations={details?.organizations ?? []}
            />
            <PublicProfileAvailability slots={model.profile.availability} />
          </main>
        </div>
      </div>

      <InviteVolunteerModal
        isOpen={model.isInvitationOpen}
        volunteerName={model.fullName}
        entityName={
          model.organization?.name ??
          t("publicProfile.organizationFallback")
        }
        message={model.invitationMessage}
        onMessageChange={model.setInvitationMessage}
        onConfirm={model.confirmInvitation}
        onCancel={model.closeInvitation}
        isLoading={model.isInviting}
        error={model.invitationError}
      />
    </ManagementPageLayout>
  );
};
