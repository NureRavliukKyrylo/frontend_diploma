import { useOrganizationMembersPage } from "../model/useOrganizationMembersPage";
import { MembersConfirmationModals } from "./members-page/MembersConfirmationModals";
import { MembersContent } from "./members-page/MembersContent";
import { MembersControls } from "./members-page/MembersControls";
import { MembersStats } from "./members-page/MembersStats";
import { MembersTopRow } from "./members-page/MembersTopRow";
import styles from "./OrganizationMembersPage.module.scss";

const PageState = ({ children }: { children: string }) => (
  <div className={styles.page}>
    <div className={styles.statePanel}>{children}</div>
  </div>
);

export const OrganizationMembersPage = () => {
  const model = useOrganizationMembersPage();

  if (model.isOrganizationPending) {
    return <PageState>Loading organization members...</PageState>;
  }

  if (model.isOrganizationError || !model.organization) {
    return (
      <PageState>We could not load this organization right now.</PageState>
    );
  }

  if (!model.isOwner && model.isEditAccessLoading) {
    return <PageState>Checking your access...</PageState>;
  }

  if (!model.isOwner && !model.canEdit) {
    return <PageState>Redirecting...</PageState>;
  }

  if (model.isMembersError) {
    return (
      <PageState>
        We could not load organization members right now.
      </PageState>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <MembersTopRow
          organizationName={model.organization.name}
          onBack={model.handleBack}
        />
        <MembersStats model={model} />
        <MembersControls model={model} />
        <MembersContent model={model} />
      </div>

      <MembersConfirmationModals model={model} />
    </div>
  );
};
