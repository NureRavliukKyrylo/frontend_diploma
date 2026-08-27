import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { calendarKeys, type AvailabilitySlot } from "@entities/user/calendar";
import { addAvailability } from "../api/addAvailabilityApi";
import {
  updateAvailability,
  type UpdateAvailabilityDto,
} from "../api/updateAvailabilityApi";
import { getAvailabilitySchema } from "../libs/availabilitySchema";
import { useTranslation } from "react-i18next";

interface UseAvailabilityFormProps {
  date: Date;
  availability?: AvailabilitySlot;
  onClose: () => void;
}

export interface AvailabilityFormValues {
  dateRange: [string, string] | null;
  startTime: string;
  endTime: string;
  allDay: boolean;
}

export const useAvailabilityForm = ({
  date,
  availability,
  onClose,
}: UseAvailabilityFormProps) => {
  const { t } = useTranslation(["calendar", "common"]);
  const queryClient = useQueryClient();
  const isUpdate = !!availability;
  const validationSchema = getAvailabilitySchema(t);

  const addMutation = useMutation({
    mutationFn: addAvailability,
    onSuccess: () => {
      addToast({
        title: t("calendar:formNotifications.addSuccessTitle"),
        description: t("calendar:formNotifications.addSuccessDescription"),
        color: "success",
      });
      queryClient.invalidateQueries({
        queryKey: calendarKeys.availabilitySlots(),
      });
      onClose();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("calendar:formNotifications.failedCreateTitle"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      slotId,
      data,
    }: {
      slotId: string;
      data: UpdateAvailabilityDto;
    }) => updateAvailability(slotId, data),
    onSuccess: () => {
      addToast({
        title: t("calendar:formNotifications.updateSuccessTitle"),
        description: t("calendar:formNotifications.updateSuccessDescription"),
        color: "success",
      });
      queryClient.invalidateQueries({
        queryKey: calendarKeys.availabilitySlots(),
      });
      onClose();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("calendar:formNotifications.failedUpdateTitle"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const formik = useFormik<AvailabilityFormValues>({
    initialValues: {
      dateRange:
        availability?.startDate && availability?.endDate
          ? [availability.startDate, availability.endDate]
          : null,
      startTime: availability?.startTime ?? "",
      endTime: availability?.endTime ?? "",
      allDay: availability?.allDay ?? false,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const hasDateRange = !!values.dateRange;

      const base = {
        date: hasDateRange ? null : date,
        startDate: hasDateRange ? new Date(values.dateRange![0]) : null,
        endDate: hasDateRange ? new Date(values.dateRange![1]) : null,
        dayOfWeek: hasDateRange ? date.getDay() : null,
        allDay: values.allDay,
        startTime: values.allDay ? null : values.startTime,
        endTime: values.allDay ? null : values.endTime,
      };

      if (isUpdate) {
        updateMutation.mutate({ slotId: availability.id, data: base });
      } else {
        addMutation.mutate(base);
      }
    },
  });

  const handleAllDayToggle = () => {
    const next = !formik.values.allDay;
    formik.setFieldValue("allDay", next);
    if (next) {
      formik.setFieldValue("startTime", "");
      formik.setFieldValue("endTime", "");
    }
  };

  return {
    mutation: isUpdate ? updateMutation : addMutation,
    formik,
    isUpdate,
    isLoading: addMutation.isPending || updateMutation.isPending,
    handleAllDayToggle,
  };
};
