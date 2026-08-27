import {
  BadgeCard,
  TierColors,
  badgesQuery,
  type AdminBadgeListItem,
  type BadgeMetricType,
  type BadgeScopeEntityType,
  type Tier,
} from "@entities/badge";
import { Skeleton } from "@heroui/react";
import { parseDateTime } from "@internationalized/date";
import { useQuery } from "@tanstack/react-query";
import { SortDropDown } from "@shared/ui/drop-down";
import { DatePickerInput } from "@shared/ui/inputs";
import { BaseModal } from "@shared/ui/modals";
import {
  Archive,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronUp,
  ImagePlus,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { FormikErrors, FormikTouched } from "formik";
import {
  badgeMetricOptions,
  badgeScopeOptions,
  badgeTierOptions,
  getMetricLabel,
} from "../../lib/badgeAdminOptions";
import { badgePlaceholderIcon } from "../../lib/badgeCardAdapter";
import {
  getEmptyBadgeRule,
  type BadgeRuleFormValues,
} from "../libs/badgeFormSchema";
import { useBadgeForm } from "../model/useBadgeForm";
import styles from "./BadgeFormModal.module.scss";

interface BadgeFormModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  badge?: AdminBadgeListItem | null;
  onClose: () => void;
}

export const BadgeFormModal = ({
  isOpen,
  mode,
  badge,
  onClose,
}: BadgeFormModalProps) => {
  const { t } = useTranslation("admin");
  const iconInputRef = useRef<HTMLInputElement>(null);
  const [localizationOpen, setLocalizationOpen] = useState(false);
  const detailsQuery = useQuery({
    ...badgesQuery.adminDetails(badge?.id ?? ""),
    enabled: isOpen && mode === "edit" && Boolean(badge?.id),
  });
  const activeBadge = detailsQuery.data ?? badge ?? null;
  const { formik, iconError, iconPreview, isSubmitting, selectIcon, submitError } =
    useBadgeForm({
      mode,
      badge: activeBadge,
      onSuccess: onClose,
    });
  const previewBadge = {
    id: activeBadge?.id ?? "preview",
    title: formik.values.title || t("badges.form.previewTitle"),
    iconUrl: iconPreview || activeBadge?.iconUrl || badgePlaceholderIcon,
    rank: { name: formik.values.rank },
    isUnlocked: true,
  };
  const title =
    mode === "create"
      ? t("badges.form.createTitle")
      : t("badges.form.editTitle");
  const subtitle =
    mode === "create"
      ? t("badges.form.createSubtitle")
      : t("badges.form.editSubtitle");
  const needsScopeId = formik.values.scopeEntityType !== "platform";
  const rulesError =
    typeof formik.errors.rules === "string" && formik.submitCount > 0
      ? formik.errors.rules
      : null;
  const scopeOptions = badgeScopeOptions.map((option) => ({
    value: option.value,
    label: t(option.labelKey),
  }));
  const metricOptions = badgeMetricOptions.map((option) => ({
    value: option.value,
    label: t(option.labelKey),
  }));
  const isEntityRuleScope = (value: string) =>
    value === "organization" ||
    value === "project" ||
    value === "event" ||
    value === "task";
  const safelyParseDateTime = (value: string) => {
    if (!value) {
      return undefined;
    }

    try {
      return parseDateTime(value);
    } catch {
      return undefined;
    }
  };
  const dateTimePickerClassNames = {
    base: styles.datePickerBase,
    inputWrapper: styles.datePickerInput,
    input: styles.datePickerText,
    segment: styles.datePickerSegment,
    selectorIcon: styles.datePickerIcon,
    calendar: styles.datePickerCalendar,
    popoverContent: styles.dateTimePopover,
  };
  const minimumAvailableTo = safelyParseDateTime(
    formik.values.availableFromUtc,
  );
  const availableFromError =
    formik.submitCount > 0 && typeof formik.errors.availableFromUtc === "string"
      ? formik.errors.availableFromUtc
      : null;
  const availableToError =
    formik.submitCount > 0 && typeof formik.errors.availableToUtc === "string"
      ? formik.errors.availableToUtc
      : null;

  useEffect(() => {
    if (formik.values.autoAwardEnabled && formik.values.rules.length === 0) {
      formik.setFieldValue("rules", [getEmptyBadgeRule()], false);
    }
  }, [formik.values.autoAwardEnabled, formik.values.rules.length]);

  const getRuleFieldError = <K extends keyof BadgeRuleFormValues>(
    index: number,
    key: K,
  ) => {
    if (!Array.isArray(formik.errors.rules) || !Array.isArray(formik.touched.rules)) {
      return null;
    }

    const ruleErrors = formik.errors.rules[index] as
      | FormikErrors<BadgeRuleFormValues>
      | undefined;
    const ruleTouched = formik.touched.rules[index] as
      | FormikTouched<BadgeRuleFormValues>
      | undefined;
    const error = ruleErrors?.[key];

    return ruleTouched?.[key] && typeof error === "string" ? error : null;
  };

  const updateRule = <K extends keyof BadgeRuleFormValues>(
    index: number,
    key: K,
    value: BadgeRuleFormValues[K],
  ) => {
    const nextRules = formik.values.rules.map((rule, ruleIndex) =>
      ruleIndex === index ? { ...rule, [key]: value } : rule,
    );
    formik.setFieldValue("rules", nextRules);
  };

  const updateBadgeScope = (value: BadgeScopeEntityType | "platform") => {
    formik.setFieldValue("scopeEntityType", value);

    if (value === "platform") {
      formik.setFieldValue("scopeEntityId", "");
    }
  };

  const updateRuleScope = (
    index: number,
    value: BadgeScopeEntityType | "platform",
  ) => {
    const nextRules = formik.values.rules.map((rule, ruleIndex) =>
      ruleIndex === index
        ? {
            ...rule,
            relatedEntityType: value,
            relatedEntityId: value === "platform" ? "" : rule.relatedEntityId,
            relatedEntityKey: value === "platform" ? "" : rule.relatedEntityKey,
          }
        : rule,
    );
    formik.setFieldValue("rules", nextRules);
  };

  const removeRule = (index: number) => {
    formik.setFieldValue(
      "rules",
      formik.values.rules.filter((_, ruleIndex) => ruleIndex !== index),
    );
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="1080px"
      showClosed={false}
    >
      <form className={styles.modalWrapper} onSubmit={formik.handleSubmit}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label={t("badges.form.close")}
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className={styles.hero}>
          <div className={styles.previewColumn}>
            <div className={styles.previewCard}>
              <BadgeCard badge={previewBadge} />
            </div>
            <button
              type="button"
              className={styles.uploadButton}
              onClick={() => iconInputRef.current?.click()}
            >
              <ImagePlus size={15} aria-hidden="true" />
              {t("badges.form.uploadIcon")}
            </button>
            <span className={styles.uploadHint}>
              {t("badges.form.uploadHint")}
            </span>
            {iconError && <span className={styles.fieldError}>{iconError}</span>}
            <input
              ref={iconInputRef}
              type="file"
              accept="image/*"
              className={styles.hiddenInput}
              onChange={(event) => {
                selectIcon(event.currentTarget.files?.[0] ?? null);
                event.currentTarget.value = "";
              }}
            />
          </div>

          <div className={styles.heroContent}>
            <h2 className={styles.modalTitle}>{title}</h2>
            <p className={styles.modalSubtitle}>{subtitle}</p>

            {detailsQuery.isLoading && mode === "edit" ? (
              <Skeleton className={styles.formSkeleton} />
            ) : (
              <>
                <label className={styles.field}>
                  <span className={styles.fieldLabel}>
                    {t("badges.form.title")}{" "}
                    <span className={styles.fieldRequired}>*</span>
                  </span>
                  <input
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={styles.fieldInput}
                    maxLength={100}
                  />
                  {formik.touched.title && formik.errors.title && (
                    <span className={styles.fieldError}>
                      {formik.errors.title}
                    </span>
                  )}
                </label>

                <div className={styles.field}>
                  <span className={styles.fieldLabel}>
                    {t("badges.form.rank")}{" "}
                    <span className={styles.fieldRequired}>*</span>
                  </span>
                  <div className={styles.rankGrid}>
                    {badgeTierOptions.map((rank) => (
                      <button
                        key={rank}
                        type="button"
                        className={`${styles.rankChip} ${
                          formik.values.rank === rank
                            ? styles.rankChipActive
                            : ""
                        }`}
                        style={{
                          borderColor: TierColors[rank],
                          background:
                            formik.values.rank === rank
                              ? TierColors[rank]
                              : undefined,
                          color:
                            formik.values.rank === rank
                              ? "#ffffff"
                              : TierColors[rank],
                        }}
                        onClick={() =>
                          formik.setFieldValue("rank", rank as Tier)
                        }
                      >
                        {rank}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>
            {t("badges.form.description")}
          </span>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.fieldTextarea}
            maxLength={1000}
          />
          <div className={styles.fieldMeta}>
            <span className={styles.charCount}>
              {formik.values.description.length} / 1000
            </span>
          </div>
        </label>

        <button
          type="button"
          className={styles.localizationDisclosure}
          onClick={() => setLocalizationOpen((current) => !current)}
        >
          {localizationOpen ? (
            <ChevronUp size={14} aria-hidden="true" />
          ) : (
            <ChevronDown size={14} aria-hidden="true" />
          )}
          {t("badges.form.localization")}
        </button>

        {localizationOpen && (
          <div className={styles.localizationGrid}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>
                {t("badges.form.ukrainianTitle")}
              </span>
              <input
                name="titleLocalizedUk"
                value={formik.values.titleLocalizedUk}
                onChange={formik.handleChange}
                className={styles.fieldInput}
                maxLength={100}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>
                {t("badges.form.englishTitle")}
              </span>
              <input
                name="titleLocalizedEn"
                value={formik.values.titleLocalizedEn}
                onChange={formik.handleChange}
                className={styles.fieldInput}
                maxLength={100}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>
                {t("badges.form.ukrainianDescription")}
              </span>
              <textarea
                name="descriptionLocalizedUk"
                value={formik.values.descriptionLocalizedUk}
                onChange={formik.handleChange}
                className={styles.fieldTextarea}
                maxLength={1000}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>
                {t("badges.form.englishDescription")}
              </span>
              <textarea
                name="descriptionLocalizedEn"
                value={formik.values.descriptionLocalizedEn}
                onChange={formik.handleChange}
                className={styles.fieldTextarea}
                maxLength={1000}
              />
            </label>
          </div>
        )}

        <div className={`${styles.sectionCard} ${styles.scopeCard}`}>
          <div className={styles.sectionTitle}>{t("badges.form.scope")}</div>
          <p className={styles.sectionText}>{t("badges.form.scopeHint")}</p>
          <div className={styles.splitGrid}>
            <div className={styles.dropdownShell}>
              <SortDropDown<BadgeScopeEntityType | "platform">
                options={scopeOptions}
                value={formik.values.scopeEntityType}
                onSelect={updateBadgeScope}
                selectedLabelOnly
              />
            </div>
            {needsScopeId && (
              <label className={styles.fieldCompact}>
                <span className={styles.fieldLabel}>
                  {t("badges.form.scopeId")}
                </span>
                <input
                  name="scopeEntityId"
                  value={formik.values.scopeEntityId}
                  onChange={formik.handleChange}
                  className={styles.fieldInput}
                  placeholder={t("badges.form.objectIdPlaceholder")}
                />
                {formik.touched.scopeEntityId &&
                  formik.errors.scopeEntityId && (
                    <span className={styles.fieldError}>
                      {formik.errors.scopeEntityId}
                    </span>
                  )}
              </label>
            )}
          </div>
        </div>

        <div className={`${styles.sectionCard} ${styles.availabilityCard}`}>
          <div className={styles.sectionTitle}>
            <CalendarDays size={16} aria-hidden="true" />
            {t("badges.form.availability")}
          </div>
          <div className={styles.availabilityGrid}>
            <label className={styles.fieldCompact}>
              <span className={styles.fieldLabel}>
                {t("badges.form.availableFrom")}
              </span>
              <DatePickerInput
                aria-label={t("badges.form.availableFrom")}
                name="availableFromUtc"
                value={formik.values.availableFromUtc}
                granularity="minute"
                hourCycle={24}
                classNames={dateTimePickerClassNames}
                onChange={(value) =>
                  formik.setFieldValue("availableFromUtc", value ?? "")
                }
              />
              {availableFromError && (
                <span className={styles.fieldError}>{availableFromError}</span>
              )}
            </label>
            <label className={styles.fieldCompact}>
              <span className={styles.fieldLabel}>
                {t("badges.form.availableTo")}
              </span>
              <DatePickerInput
                aria-label={t("badges.form.availableTo")}
                name="availableToUtc"
                value={formik.values.availableToUtc}
                minValue={minimumAvailableTo}
                granularity="minute"
                hourCycle={24}
                classNames={dateTimePickerClassNames}
                onChange={(value) =>
                  formik.setFieldValue("availableToUtc", value ?? "")
                }
              />
              {availableToError && (
                <span className={styles.fieldError}>{availableToError}</span>
              )}
            </label>
          </div>
        </div>

        <div className={styles.switchGrid}>
          <label className={styles.switchCard}>
            <input
              type="checkbox"
              name="autoAwardEnabled"
              checked={formik.values.autoAwardEnabled}
              onChange={formik.handleChange}
            />
            <span className={styles.switchVisual} />
            <div>
              <strong>{t("badges.form.autoAward")}</strong>
              <span>{t("badges.form.autoAwardDescription")}</span>
            </div>
          </label>
          <label className={styles.switchCard}>
            <input
              type="checkbox"
              name="isRequestable"
              checked={formik.values.isRequestable}
              onChange={formik.handleChange}
            />
            <span className={styles.switchVisual} />
            <div>
              <strong>{t("badges.form.isRequestable")}</strong>
              <span>{t("badges.form.isRequestableDescription")}</span>
            </div>
          </label>
          {mode === "edit" && (
            <label className={`${styles.switchCard} ${styles.archiveSwitchCard}`}>
              <input
                type="checkbox"
                name="isArchived"
                checked={formik.values.isArchived}
                onChange={formik.handleChange}
              />
              <span className={styles.switchVisual} />
              <div>
                <strong>{t("badges.form.archiveBadge")}</strong>
                <span>{t("badges.form.archiveBadgeDescription")}</span>
              </div>
              <Archive size={18} aria-hidden="true" />
            </label>
          )}
        </div>

        <div className={styles.rulesHeader}>
          <div>
            <div className={styles.sectionTitle}>
              {t("badges.form.rules")}
              <span className={styles.rulesCount}>
                {formik.values.rules.length}
              </span>
            </div>
          </div>
          <button
            type="button"
            className={styles.addRuleButton}
            onClick={() =>
              formik.setFieldValue("rules", [
                ...formik.values.rules,
                getEmptyBadgeRule(),
              ])
            }
          >
            <Plus size={15} aria-hidden="true" />
            {t("badges.form.addRule")}
          </button>
        </div>

        <div className={styles.rulesList}>
          {formik.values.rules.map((rule, index) => (
            <div key={index} className={styles.ruleEditor}>
              <div className={styles.ruleEditorHeader}>
                <div>
                  <span className={styles.ruleKicker}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <strong>{rule.label || t("badges.form.ruleLabel")}</strong>
                    <small>{getMetricLabel(rule.metric, t)}</small>
                  </span>
                </div>
                <button
                  type="button"
                  className={styles.removeRuleButton}
                  onClick={() => removeRule(index)}
                  disabled={
                    formik.values.autoAwardEnabled &&
                    formik.values.rules.length === 1
                  }
                  aria-label={t("badges.form.removeRule")}
                >
                  <Trash2 size={15} aria-hidden="true" />
                </button>
              </div>
              <label className={`${styles.fieldCompact} ${styles.ruleNameField}`}>
                <span className={styles.fieldLabel}>
                  {t("badges.form.ruleLabel")}
                </span>
                <input
                  value={rule.label}
                  onChange={(event) =>
                    updateRule(index, "label", event.currentTarget.value)
                  }
                  className={styles.fieldInput}
                  maxLength={100}
                />
                {getRuleFieldError(index, "label") && (
                  <span className={styles.fieldError}>
                    {getRuleFieldError(index, "label")}
                  </span>
                )}
              </label>
              <div className={styles.ruleGrid}>
                <div className={styles.fieldCompact}>
                  <span className={styles.fieldLabel}>
                    {t("badges.form.ruleMetric")}
                  </span>
                  <div className={styles.dropdownShell}>
                    <SortDropDown<BadgeMetricType>
                      options={metricOptions}
                      value={rule.metric}
                      onSelect={(value) => updateRule(index, "metric", value)}
                      selectedLabelOnly
                    />
                  </div>
                  {getRuleFieldError(index, "metric") && (
                    <span className={styles.fieldError}>
                      {getRuleFieldError(index, "metric")}
                    </span>
                  )}
                </div>
                <label className={styles.fieldCompact}>
                  <span className={styles.fieldLabel}>
                    {t("badges.form.ruleThreshold")}
                  </span>
                  <input
                    type="number"
                    min={0.1}
                    step={0.1}
                    value={rule.threshold}
                    onChange={(event) =>
                      updateRule(
                        index,
                        "threshold",
                        Number(event.currentTarget.value),
                      )
                    }
                    className={styles.fieldInput}
                  />
                  {getRuleFieldError(index, "threshold") && (
                    <span className={styles.fieldError}>
                      {getRuleFieldError(index, "threshold")}
                    </span>
                  )}
                </label>
                <label className={styles.fieldCompact}>
                  <span className={styles.fieldLabel}>
                    {t("badges.form.ruleWeight")}
                  </span>
                  <input
                    type="number"
                    min={0.1}
                    step={0.1}
                    value={rule.weight}
                    onChange={(event) =>
                      updateRule(
                        index,
                        "weight",
                        Number(event.currentTarget.value),
                      )
                    }
                    className={styles.fieldInput}
                  />
                  {getRuleFieldError(index, "weight") && (
                    <span className={styles.fieldError}>
                      {getRuleFieldError(index, "weight")}
                    </span>
                  )}
                </label>
                <div className={styles.fieldCompact}>
                  <span className={styles.fieldLabel}>
                    {t("badges.form.ruleScope")}
                  </span>
                  <div className={styles.dropdownShell}>
                    <SortDropDown<BadgeScopeEntityType | "platform">
                      options={scopeOptions}
                      value={rule.relatedEntityType}
                      onSelect={(value) => updateRuleScope(index, value)}
                      selectedLabelOnly
                    />
                  </div>
                </div>
              </div>
              {rule.relatedEntityType !== "platform" && (
              <div className={styles.ruleScopeDetails}>
                {isEntityRuleScope(rule.relatedEntityType) && (
                  <label className={styles.fieldCompact}>
                    <span className={styles.fieldLabel}>
                      {t("badges.form.ruleScopeId")}
                    </span>
                    <span className={styles.fieldHint}>
                      {t("badges.form.ruleScopeIdHint")}
                    </span>
                    <input
                      value={rule.relatedEntityId}
                      onChange={(event) =>
                        updateRule(
                          index,
                          "relatedEntityId",
                          event.currentTarget.value,
                        )
                      }
                      className={styles.fieldInput}
                      placeholder={t("badges.form.objectIdPlaceholder")}
                    />
                      {getRuleFieldError(index, "relatedEntityId") && (
                        <span className={styles.fieldError}>
                          {getRuleFieldError(index, "relatedEntityId")}
                        </span>
                      )}
                    </label>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        {rulesError && <span className={styles.rulesError}>{rulesError}</span>}
        {submitError && (
          <div className={styles.submitError}>{submitError}</div>
        )}

        <div className={styles.modalFooter}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
          >
            {t("common.actions.cancel")}
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting || detailsQuery.isLoading}
          >
            {mode === "create" ? (
              <Plus size={16} aria-hidden="true" />
            ) : (
              <Check size={16} aria-hidden="true" />
            )}
            {mode === "create"
              ? t("badges.form.createTitle")
              : t("badges.form.saveChanges")}
          </button>
        </div>
      </form>
    </BaseModal>
  );
};
