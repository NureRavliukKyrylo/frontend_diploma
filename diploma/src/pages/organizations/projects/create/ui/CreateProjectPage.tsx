import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { organizationQuery } from "@entities/organization";
import {
  AccessStep,
  BasicsStep,
  CategoriesStep,
  LocationDatesStep,
  useCreateProjectForm,
} from "@features/project";
import {
  PROJECT_CREATE_STEP_HEADERS,
  PROJECT_CREATE_STEPS,
} from "../config/projectCreateSteps";
import { getInitials } from "../../../shared/create-flow/lib/getInitials";
import { CreateFlowContent } from "../../../shared/create-flow/ui/CreateFlowContent";
import { CreateFlowSidebar } from "../../../shared/create-flow/ui/CreateFlowSidebar";
import { CreateFlowTopRow } from "../../../shared/create-flow/ui/CreateFlowTopRow";
import styles from "./CreateProjectPage.module.scss";

interface CreateProjectPageProps {
  organizationId: string;
}

export const CreateProjectPage = ({
  organizationId,
}: CreateProjectPageProps) => {
  const navigate = useNavigate();
  const { data: organization, isLoading } = useQuery(
    organizationQuery.byId(organizationId),
  );
  const form = useCreateProjectForm(organizationId);
  const isLastStep = form.activeStep === PROJECT_CREATE_STEPS.length - 1;
  const stepHeader = PROJECT_CREATE_STEP_HEADERS[form.activeStep];

  const handleCancel = () => {
    void navigate({
      to: "/organizations/$id",
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
          onDateChange={form.updateField}
        />
      );
    }

    if (form.activeStep === 2) {
      return (
        <CategoriesStep
          selectedIds={form.values.categoryIds}
          onToggle={form.toggleCategory}
        />
      );
    }

    return <AccessStep values={form.values} onChange={form.updateField} />;
  };

  if (isLoading || !organization) {
    return (
      <div className={styles.loadingPage}>
        <div className={styles.loadingCard}>Preparing project setup...</div>
      </div>
    );
  }

  const initials = getInitials(organization.name);

  return (
    <div className={styles.page}>
      <div className={styles.workArea}>
        <CreateFlowTopRow
          organizationName={organization.name}
          title="New project"
          backLabel="Back to organization"
          onCancel={handleCancel}
          styles={styles}
        />

        <div className={styles.body}>
          <CreateFlowSidebar
            organizationId={organizationId}
            organizationName={organization.name}
            logoUrl={organization.logoUrl}
            initials={initials}
            label="Project setup"
            steps={PROJECT_CREATE_STEPS}
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
            finalLabel="Create project"
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
