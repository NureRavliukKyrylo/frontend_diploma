import {
  CheckCircle2,
  ClipboardCheck,
  LogOut,
  MapPin,
  QrCode,
  Users,
} from "lucide-react";
import type {
  EventSettingsErrors,
  EventSettingsValues,
} from "@features/event";
import { useTranslation } from "react-i18next";
import { AttendanceToggleRow } from "./attendance-tab/AttendanceToggleRow";
import styles from "./AttendanceTab.module.scss";

interface AttendanceTabProps {
  values: EventSettingsValues;
  errors: EventSettingsErrors;
  onToggle: (
    field:
      | "attendanceEnabled"
      | "attendanceRequiresApproval"
      | "attendanceRequiresVolunteerCheckout"
      | "qrEnabled"
      | "geoEnabled",
  ) => void;
  onRadiusChange: (value: string) => void;
  onRadiusClear: () => void;
}

export const AttendanceTab = ({
  values,
  errors,
  onToggle,
  onRadiusChange,
  onRadiusClear,
}: AttendanceTabProps) => {
  const { t } = useTranslation("event");
  const attendanceDisabled = !values.attendanceEnabled;
  const radiusVisible = values.geoEnabled;

  return (
    <div className={styles.sectionsContainer}>
      <section className={styles.section}>
        <h2 className={styles.sectionLabel}>
          {t("settings.attendance.title")}
        </h2>
        <p className={styles.sectionDescription}>
          {t("settings.attendance.text")}
        </p>

        <div className={styles.toggleList}>
          <AttendanceToggleRow
            icon={Users}
            title={t("settings.attendance.track")}
            description={t("settings.attendance.trackText")}
            checked={values.attendanceEnabled}
            onToggle={() => onToggle("attendanceEnabled")}
          />
          <AttendanceToggleRow
            icon={ClipboardCheck}
            title={t("settings.attendance.approval")}
            description={t("settings.attendance.approvalText")}
            checked={values.attendanceRequiresApproval}
            disabled={attendanceDisabled}
            onToggle={() => onToggle("attendanceRequiresApproval")}
          />
          <AttendanceToggleRow
            icon={LogOut}
            title={t("settings.attendance.checkout")}
            description={t("settings.attendance.checkoutText")}
            checked={values.attendanceRequiresVolunteerCheckout}
            disabled={attendanceDisabled}
            onToggle={() => onToggle("attendanceRequiresVolunteerCheckout")}
          />
          <AttendanceToggleRow
            icon={QrCode}
            title={t("settings.attendance.qrTitle")}
            description={t("settings.attendance.qrText")}
            checked={values.qrEnabled}
            disabled={attendanceDisabled}
            onToggle={() => onToggle("qrEnabled")}
          />
          <AttendanceToggleRow
            icon={MapPin}
            title={t("settings.attendance.geo")}
            description={t("settings.attendance.geoText")}
            checked={values.geoEnabled}
            disabled={attendanceDisabled}
            onToggle={() => onToggle("geoEnabled")}
          />
        </div>

        {radiusVisible ? (
          <div
            className={`${styles.radiusBlock} ${
              attendanceDisabled ? styles.radiusBlockDisabled : ""
            }`}
          >
            <div className={styles.radiusLabelRow}>
              <span>{t("settings.attendance.radius")}</span>
              <button
                type="button"
                disabled={attendanceDisabled}
                onClick={onRadiusClear}
              >
                {t("settings.attendance.clearRadius")}
              </button>
            </div>
            <input
              type="number"
              min={10}
              max={10000}
              value={values.attendanceRadiusMeters}
              placeholder="100"
              disabled={attendanceDisabled}
              aria-invalid={Boolean(errors.attendanceRadiusMeters)}
              onChange={(event) => onRadiusChange(event.target.value)}
            />
            {errors.attendanceRadiusMeters ? (
              <small>{errors.attendanceRadiusMeters}</small>
            ) : (
              <em>
                <CheckCircle2 size={14} />
                {t("settings.attendance.range")}
              </em>
            )}
          </div>
        ) : null}
      </section>
    </div>
  );
};
