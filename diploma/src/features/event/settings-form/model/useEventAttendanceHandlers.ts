import type { Dispatch, SetStateAction } from "react";
import type { EventSettingsErrors, EventSettingsValues } from "./types";

interface UseEventAttendanceHandlersProps {
  setValues: Dispatch<SetStateAction<EventSettingsValues | null>>;
  setErrors: Dispatch<SetStateAction<EventSettingsErrors>>;
}

export const useEventAttendanceHandlers = ({
  setValues,
  setErrors,
}: UseEventAttendanceHandlersProps) => {
  const handleAttendanceToggle = (
    field:
      | "attendanceEnabled"
      | "attendanceRequiresApproval"
      | "attendanceRequiresVolunteerCheckout"
      | "qrEnabled"
      | "geoEnabled",
  ) => {
    setValues((current) =>
      current ? { ...current, [field]: !current[field] } : current,
    );
  };

  const handleRadiusChange = (value: string) => {
    setValues((current) =>
      current
        ? {
            ...current,
            attendanceRadiusMeters: value,
            clearAttendanceRadiusMeters: false,
          }
        : current,
    );
    setErrors((current) => ({ ...current, attendanceRadiusMeters: undefined }));
  };

  const handleRadiusClear = () => {
    setValues((current) =>
      current
        ? {
            ...current,
            attendanceRadiusMeters: "",
            clearAttendanceRadiusMeters: true,
          }
        : current,
    );
    setErrors((current) => ({ ...current, attendanceRadiusMeters: undefined }));
  };

  return { handleAttendanceToggle, handleRadiusChange, handleRadiusClear };
};
