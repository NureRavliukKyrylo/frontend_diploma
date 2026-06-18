import { BaseInput, TextAreaForm } from "@shared/ui/inputs";
import { Switch } from "@shared/ui";
import { DateRangePicker } from "@heroui/date-picker";
import {
  today,
  getLocalTimeZone,
  parseAbsoluteToLocal,
} from "@internationalized/date";
import type { DateValue } from "@internationalized/date";
import type { RangeValue } from "@react-types/shared";
import { useOverviewForm } from "../model/useOverviewForm";
import styles from "./OverviewStep.module.scss";
import type { OfferFormData } from "@entities/offer";
import type { StepRef } from "../../main";
import { forwardRef, useImperativeHandle } from "react";
import { useTranslation } from "react-i18next";

interface OverviewStepProps {
  data: OfferFormData;
}

export const OverviewStep = forwardRef<StepRef, OverviewStepProps>(
  ({ data }, ref) => {
    const { t } = useTranslation(["timeBank"]);
    const { formik, handleDateRangeChange } = useOverviewForm({ data });

    useImperativeHandle(ref, () => ({
      submitForm: async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length === 0) {
          await formik.submitForm();
          return true;
        }
        formik.setTouched(
          Object.keys(formik.values).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {},
          ),
        );
        return false;
      },
    }));

    const dateRangeValue =
      formik.values.startAt && formik.values.endAt
        ? {
            start: parseAbsoluteToLocal(formik.values.startAt),
            end: parseAbsoluteToLocal(formik.values.endAt),
          }
        : null;

    const handleRange = (range: RangeValue<DateValue> | null) => {
      if (!range) return;
      handleDateRangeChange({
        start: range.start.toDate(getLocalTimeZone()).toISOString(),
        end: range.end.toDate(getLocalTimeZone()).toISOString(),
      });
    };

    return (
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <div className={styles.labelRow}>
            <span className={styles.label}>
              {t("timeBank:forms.labels.title")}
            </span>
          </div>
          <BaseInput
            name="title"
            label={t("timeBank:forms.labels.title")}
            activeLabel={t("timeBank:forms.labels.title")}
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title ? formik.errors.title : undefined}
          />
        </div>

        <div className={styles.field}>
          <div className={styles.labelRow}>
            <span className={styles.label}>
              {t("timeBank:forms.labels.description")}
            </span>
          </div>
          <TextAreaForm
            name="description"
            placeholder={t("timeBank:forms.labels.description")}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            maxLength={150}
            rows={4}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="errorInput">{formik.errors.description}</div>
          )}
        </div>

        <div className={styles.priceField}>
          <span className={styles.label}>
            {t("timeBank:forms.labels.reward")}
          </span>
          <div>
            <div className={styles.minutesInputWrapper}>
              <input
                className={styles.minutesInput}
                name="priceMinutes"
                type="number"
                min={1}
                placeholder={t("timeBank:units.m")}
                value={formik.values.priceMinutes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span className={styles.minutesSuffix}>
                {t("timeBank:units.m")}
              </span>
            </div>
            {formik.touched.priceMinutes && formik.errors.priceMinutes && (
              <div className="errorInput">{formik.errors.priceMinutes}</div>
            )}
          </div>
        </div>

        <div className={styles.dateRangeField}>
          <span className={styles.label}>
            {t("timeBank:forms.labels.dateRange")}
          </span>
          <div>
            <DateRangePicker
              value={dateRangeValue}
              onChange={handleRange}
              granularity="day"
              minValue={data ? undefined : today(getLocalTimeZone())}
              isInvalid={false}
              validationBehavior="aria"
              classNames={{
                base: "w-full rounded-[20px] border border-[#d4d4d8] hover:border-[#3f3f46] data-[focus-within=true]:border-[#18181b] [&_[data-type=literal]]:text-[rgba(0,0,0,0.4)] data-[focus-within=true]:[&_[data-type=literal]]:!text-[rgba(0,0,0,0.87)]",
                inputWrapper:
                  "w-full h-full rounded-[20px] shadow-none border-none !bg-white data-[hover=true]:!bg-white data-[focus=true]:!bg-white data-[focus-within=true]:!bg-white",
                segment:
                  "!text-[rgba(0,0,0,0.87)] data-[placeholder=true]:!text-[rgba(0,0,0,0.4)] data-[type=literal]:!text-[rgba(0,0,0,0.4)] text-[17px] font-[500]",
                separator: "!text-[rgba(0,0,0,0.4)]",
                selectorIcon: "text-[#71717a]",
                calendar: "!overflow-hidden [&>*]:!overflow-hidden",
              }}
            />
            {((formik.touched.startAt && formik.errors.startAt) ||
              (formik.touched.endAt && formik.errors.endAt)) && (
              <div className="errorInput">
                {formik.errors.startAt ?? formik.errors.endAt}
              </div>
            )}
          </div>
        </div>

        <div className={styles.onlineField}>
          <h1>{t("timeBank:forms.labels.setOnline")}</h1>
          <Switch
            isSelected={formik.values.isOnline}
            onChange={(e) => formik.setFieldValue("isOnline", e.target.checked)}
            classNames={{
              base: "scale-75 sm:scale-90 lg:scale-95",
              wrapper:
                "bg-[rgba(44,44,44,0.3)] group-data-[selected=true]:bg-[#8C0000]",
              thumb: "w-[20px] h-[20px]",
            }}
          />
        </div>
      </form>
    );
  },
);
