import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("project");
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
        <div className={styles.loadingCard}>{t("create.loading")}</div>
      </div>
    );
  }

  const initials = getInitials(organization.name);

  return (
    <div className={styles.page}>
      <div className={styles.workArea}>
        <CreateFlowTopRow
          organizationName={organization.name}
          title={t("create.newProject")}
          backLabel={t("create.back")}
          onCancel={handleCancel}
          styles={styles}
        />

        <div className={styles.body}>
          <CreateFlowSidebar
            organizationId={organizationId}
            organizationName={organization.name}
            logoUrl={organization.logoUrl}
            initials={initials}
            label={t("create.setup")}
            steps={PROJECT_CREATE_STEPS.map((step) => ({
              label: t(step.labelKey),
              sublabel: t(step.sublabelKey),
            }))}
            activeStep={form.activeStep}
            onStepClick={form.goToStep}
            styles={styles}
          />

          <CreateFlowContent
            activeStep={form.activeStep}
            eyebrow={t(stepHeader.eyebrowKey)}
            title={t(stepHeader.titleKey)}
            subtitle={t(stepHeader.subtitleKey)}
            isLastStep={isLastStep}
            isSubmitting={form.isSubmitting}
            finalLabel={t("create.create")}
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
