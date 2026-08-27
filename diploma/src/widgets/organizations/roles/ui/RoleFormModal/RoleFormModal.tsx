import { ArrowLeft, ArrowRight, Check, MapPin, X } from "lucide-react";
import type {
  ContextRoleCreateDto,
  ContextRoleDto,
} from "@entities/organization";
import type { ParticipationListItem } from "@entities/participation";
import { Toggle } from "@shared/ui";
import { BaseModal } from "@shared/ui/modals/base-modal/BaseModal";
import { RoleAssigneePicker } from "../RoleAssigneePicker";
import { RolePermissionGroups } from "./RolePermissionGroups";
import { type RoleFormMode, useRoleFormModal } from "./model/useRoleFormModal";
import styles from "./RoleFormModal.module.scss";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

interface RoleFormModalProps {
  isOpen: boolean;
  mode: RoleFormMode;
  organizationId: string;
  entityType?: string;
  entityId?: string;
  organizationName?: string;
  role?: ContextRoleDto | null;
  members: ParticipationListItem[];
  roles: ContextRoleDto[];
  existingRoles: ContextRoleDto[];
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: (payload: ContextRoleCreateDto) => Promise<void>;
}

const getEntityLabel = (
  entityType: string | null | undefined,
  t: TFunction,
) => {
  if (entityType === "project") return t("roles:form.entity.project");
  if (entityType === "event") return t("roles:form.entity.event");
  if (entityType === "task") return t("roles:form.entity.task");
  return t("roles:form.entity.organization");
};

export const RoleFormModal = ({
  isOpen,
  mode,
  organizationId,
  entityType = "organization",
  entityId = organizationId,
  organizationName,
  role,
  members,
  roles,
  existingRoles,
  isSubmitting = false,
  onClose,
  onSubmit,
}: RoleFormModalProps) => {
  const { t } = useTranslation("roles");
  const toggleTabs = [
    { label: t("form.no"), value: "off" },
    { label: t("form.yes"), value: "on" },
  ];
  const steps = [
    t("form.steps.basics"),
    t("form.steps.permissions"),
    t("form.steps.assignment"),
  ];
  const form = useRoleFormModal({
    isOpen,
    mode,
    organizationId,
    entityType,
    entityId,
    role,
    existingRoles,
    onSubmit,
  });

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className={styles.modalWrapper}
      maxWidth="640px"
      showClosed={false}
      animation="default"
    >
      <div className={styles.modal}>
        <header className={styles.header}>
          <div className={styles.headerCopy}>
            <h2>{form.title}</h2>
            <p>{form.stepSubtitle}</p>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            aria-label={t("form.close")}
            onClick={onClose}
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </header>

        <div className={styles.stepperWrap}>
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCurrent = form.currentStep === stepNumber;
            const isDone = form.currentStep > stepNumber;

            return (
              <div key={step} className={styles.stepCluster}>
                <div
                  className={`${styles.stepItem} ${
                    isDone
                      ? styles.stepDone
                      : isCurrent
                        ? styles.stepCurrent
                        : styles.stepUpcoming
                  }`}
                >
                  <span className={styles.stepCircle}>
                    {isDone ? <Check size={14} strokeWidth={3} /> : stepNumber}
                  </span>
                  <span className={styles.stepLabel}>{step}</span>
                </div>
                {index < steps.length - 1 ? (
                  <span className={styles.stepLine} />
                ) : null}
              </div>
            );
          })}
        </div>

        <div className={styles.form}>
          {form.currentStep === 1 ? (
            <>
              <div className={styles.field}>
                <label htmlFor="role-name">{t("form.name")}</label>
                <input
                  id="role-name"
                  value={form.values.name}
                  maxLength={200}
                  placeholder={t("form.namePlaceholder")}
                  onChange={(event) =>
                    form.updateField("name", event.target.value)
                  }
                />
                {form.errors.name ? (
                  <span className={styles.error}>{form.errors.name}</span>
                ) : null}
              </div>

              <div className={styles.field}>
                <label htmlFor="role-description">
                  {t("form.description")}
                </label>
                <textarea
                  id="role-description"
                  value={form.values.description}
                  placeholder={t("form.descriptionPlaceholder")}
                  onChange={(event) =>
                    form.updateField("description", event.target.value)
                  }
                />
              </div>

              {mode === "edit" && role ? (
                <div className={styles.contextLine}>
                  <MapPin size={15} strokeWidth={2.4} />
                  <span>
                    {t("form.appliesTo")}{" "}
                    <strong>
                      {getEntityLabel(role.entityType, t)} —{" "}
                      {role.entityType === "organization"
                        ? (organizationName ?? t("form.currentOrganization"))
                        : (role.entityId ?? t("form.currentContext"))}
                    </strong>
                  </span>
                </div>
              ) : null}
            </>
          ) : null}

          {form.currentStep === 2 ? (
            <RolePermissionGroups
              groups={form.permissionGroups}
              selectedCountLabel={form.selectedCountLabel}
              error={form.errors.permissions}
              onToggle={form.togglePermission}
            />
          ) : null}

          {form.currentStep === 3 ? (
            <div className={styles.assignmentStep}>
              <p className={styles.assignmentHint}>
                {t("form.assignmentHint")}
              </p>
              <RoleAssigneePicker
                label={t("form.assignableBy")}
                values={form.values.assignableBy}
                members={members}
                roles={roles}
                currentRoleId={role?.id}
                onAdd={(value) => form.addAssignment("assignableBy", value)}
                onRemove={(value) =>
                  form.removeAssignment("assignableBy", value)
                }
              />
              <RoleAssigneePicker
                label={t("form.approvableBy")}
                values={form.values.approvableBy}
                members={members}
                roles={roles}
                currentRoleId={role?.id}
                onAdd={(value) => form.addAssignment("approvableBy", value)}
                onRemove={(value) =>
                  form.removeAssignment("approvableBy", value)
                }
              />

              <section className={styles.defaultBlock}>
                <div className={styles.defaultCopy}>
                  <h3>{t("form.defaultTitle")}</h3>
                  <p>{t("form.defaultText")}</p>
                </div>
                <Toggle
                  tabs={toggleTabs}
                  activeValue={form.values.isDefaultForJoin ? "on" : "off"}
                  onChange={(value) =>
                    form.updateField("isDefaultForJoin", value === "on")
                  }
                  className={styles.defaultToggle}
                  buttonClassName={styles.toggleButton}
                  activeButtonClassName={styles.toggleButtonActive}
                  pillClassName={styles.togglePill}
                />
              </section>
            </div>
          ) : null}
        </div>

        {form.currentStep === 3 && form.submitError ? (
          <div className={styles.submitErrorBanner}>{form.submitError}</div>
        ) : null}

        <footer className={styles.footer}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
            disabled={isSubmitting}
          >
            {t("form.cancel")}
          </button>
          {form.currentStep > 1 ? (
            <button
              type="button"
              className={styles.backButton}
              onClick={form.goToPreviousStep}
              disabled={isSubmitting}
            >
              <ArrowLeft size={15} strokeWidth={2.4} />
              {t("form.back")}
            </button>
          ) : null}
          <button
            type="button"
            className={styles.submitButton}
            onClick={
              form.currentStep === 3 ? form.handleSubmit : form.goToNextStep
            }
            disabled={isSubmitting || !form.canContinue}
          >
            {isSubmitting
              ? t("form.saving")
              : form.currentStep === 3
                ? form.submitLabel
                : t("form.continue")}
            {form.currentStep < 3 ? (
              <ArrowRight size={15} strokeWidth={2.4} />
            ) : null}
          </button>
        </footer>
      </div>
    </BaseModal>
  );
};
