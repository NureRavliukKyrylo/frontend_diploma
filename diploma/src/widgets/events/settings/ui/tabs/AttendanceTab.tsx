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
  const attendanceDisabled = !values.attendanceEnabled;
  const radiusVisible = values.geoEnabled;

  return (
    <div className={styles.sectionsContainer}>
      <section className={styles.section}>
        <h2 className={styles.sectionLabel}>Attendance</h2>
        <p className={styles.sectionDescription}>
          Configure how volunteer attendance is tracked for this event.
        </p>

        <div className={styles.toggleList}>
          <AttendanceToggleRow
            icon={Users}
            title="Track attendance"
            description="Record who actually showed up to this event"
            checked={values.attendanceEnabled}
            onToggle={() => onToggle("attendanceEnabled")}
          />
          <AttendanceToggleRow
            icon={ClipboardCheck}
            title="Require approval"
            description="An organizer must approve each attendance record"
            checked={values.attendanceRequiresApproval}
            disabled={attendanceDisabled}
            onToggle={() => onToggle("attendanceRequiresApproval")}
          />
          <AttendanceToggleRow
            icon={LogOut}
            title="Require checkout"
            description="Volunteers must check out when they leave"
            checked={values.attendanceRequiresVolunteerCheckout}
            disabled={attendanceDisabled}
            onToggle={() => onToggle("attendanceRequiresVolunteerCheckout")}
          />
          <AttendanceToggleRow
            icon={QrCode}
            title="QR code check-in"
            description="Allow volunteers to check in by scanning a QR code"
            checked={values.qrEnabled}
            disabled={attendanceDisabled}
            onToggle={() => onToggle("qrEnabled")}
          />
          <AttendanceToggleRow
            icon={MapPin}
            title="Location check-in"
            description="Allow volunteers to check in based on their location"
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
              <span>Check-in radius (meters)</span>
              <button
                type="button"
                disabled={attendanceDisabled}
                onClick={onRadiusClear}
              >
                Clear radius
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
                Accepted range is 10 to 10000 meters.
              </em>
            )}
          </div>
        ) : null}
      </section>
    </div>
  );
};
