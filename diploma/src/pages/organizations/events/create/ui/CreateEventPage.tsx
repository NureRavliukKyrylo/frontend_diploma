import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { organizationQuery } from "@entities/organization";
import { projectQuery } from "@entities/project";
import {
  AccessStep,
  BasicsStep,
  CategoriesSkillsStep,
  LocationDatesStep,
  RecurrenceStep,
  useCreateEventForm,
} from "@features/event/create-event";
import {
  EVENT_CREATE_STEP_HEADERS,
  EVENT_CREATE_STEPS,
} from "../config/eventCreateSteps";
import { useTranslation } from "react-i18next";
import { getInitials } from "../../../shared/create-flow/lib/getInitials";
import { CreateFlowContent } from "../../../shared/create-flow/ui/CreateFlowContent";
import { CreateFlowSidebar } from "../../../shared/create-flow/ui/CreateFlowSidebar";
import { CreateFlowTopRow } from "../../../shared/create-flow/ui/CreateFlowTopRow";
import styles from "./CreateEventPage.module.scss";

interface CreateEventPageProps {
  organizationId: string;
  projectId?: string;
}

export const CreateEventPage = ({
  organizationId,
  projectId,
}: CreateEventPageProps) => {
  const { t } = useTranslation(["event"]);
  const navigate = useNavigate();
  const { data: organization, isLoading } = useQuery(
    organizationQuery.byId(organizationId),
  );
  const { data: projectContext } = useQuery({
    ...projectQuery.id(projectId ?? ""),
    enabled: Boolean(projectId),
  });
  const form = useCreateEventForm(organizationId, projectId);
  const isLastStep = form.activeStep === EVENT_CREATE_STEPS.length - 1;
  const stepHeader = EVENT_CREATE_STEP_HEADERS[form.activeStep];

  const handleCancel = () => {
    if (projectId) {
      void navigate({
        to: "/projects/$id",
        params: { id: projectId },
      });
      return;
    }

    void navigate({
      to: "/organizations/$id/events",
      params: { id: organizationId },
    });
  };

  const handlePrimaryAction = () => {
    if (isLastStep) {
      form.submit();
      return;
    }

    form.goNext();
  };

  const renderStep = () => {
    if (form.activeStep === 0) {
      return (
        <BasicsStep
          values={form.values}
          errors={form.errors}
          onChange={form.updateField}
        />
      );
    }

    if (form.activeStep === 1) {
      return (
        <LocationDatesStep
          values={form.values}
          errors={form.errors}
          onLocationChange={form.updateLocation}
          onFieldChange={form.updateField}
        />
      );
    }

    if (form.activeStep === 2) {
      return (
        <RecurrenceStep
          values={form.values}
          errors={form.errors}
          onChange={form.updateRecurrence}
        />
      );
    }

    if (form.activeStep === 3) {
      return (
        <CategoriesSkillsStep
          categoryIds={form.values.categoryIds}
          requiredSkills={form.values.requiredSkills}
          onToggleCategory={form.toggleCategory}
          onAddSkill={form.addSkillRequirement}
          onUpdateSkill={form.updateSkillRequirement}
          onRemoveSkill={form.removeSkillRequirement}
        />
      );
    }

    return <AccessStep values={form.values} onChange={form.updateField} />;
  };

  if (isLoading || !organization) {
    return (
      <div className={styles.loadingPage}>
        <div className={styles.loadingCard}>Preparing event setup...</div>
      </div>
    );
  }

  const initials = getInitials(organization.name);

  return (
    <div className={styles.page}>
      <div className={styles.workArea}>
        <CreateFlowTopRow
          organizationName={organization.name}
          title="New event"
          backLabel="Back to organization events"
          contextLabel={
            projectContext ? t("create.projectContextLabel") : undefined
          }
          contextValue={projectContext?.title}
          onCancel={handleCancel}
          styles={styles}
        />

        <div className={styles.body}>
          <CreateFlowSidebar
            organizationId={organizationId}
            organizationName={organization.name}
            logoUrl={organization.logoUrl}
            initials={initials}
            label="Event setup"
            projectContext={
              projectId && projectContext
                ? {
                    id: projectId,
                    name: projectContext.title,
                    label: t("create.projectContextSidebar"),
                  }
                : undefined
            }
            steps={EVENT_CREATE_STEPS}
            activeStep={form.activeStep}
            onStepClick={form.goToStep}
            styles={styles}
          />

          <CreateFlowContent
            activeStep={form.activeStep}
            eyebrow={stepHeader.eyebrow}
            title={stepHeader.title}
            subtitle={stepHeader.subtitle}
            isLastStep={isLastStep}
            isSubmitting={form.isSubmitting}
            finalLabel="Create event"
            onBack={form.goBack}
            onPrimaryAction={handlePrimaryAction}
            styles={styles}
          >
            {renderStep()}
          </CreateFlowContent>
        </div>
      </div>
    </div>
  );
};
