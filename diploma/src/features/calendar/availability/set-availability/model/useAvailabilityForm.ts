import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { calendarKeys, type AvailabilitySlot } from "@entities/user/calendar";
import { addAvailability } from "../api/addAvailabilityApi";
import { updateAvailability } from "../api/updateAvailabilityApi";
import { availabilitySchema } from "../libs/availabilitySchema";

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
  const queryClient = useQueryClient();
  const isUpdate = !!availability;

  const addMutation = useMutation({
    mutationFn: addAvailability,
    onSuccess: () => {
      addToast({
        title: "Availability added",
        description: "Time-Availability has been successfully added",
        color: "success",
      });
      queryClient.invalidateQueries({
        queryKey: calendarKeys.availabilitySlots(),
      });
      onClose();
    },
    onError: (error: unknown) => {
      addToast({
        title: "Failed",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateAvailability,
    onSuccess: () => {
      addToast({
        title: "Availability updated",
        description: "Time-Availability has been successfully updated",
        color: "success",
      });
      queryClient.invalidateQueries({
        queryKey: calendarKeys.availabilitySlots(),
      });
      onClose();
    },
    onError: (error: unknown) => {
      addToast({
        title: "Failed",
        description: getErrorMessage(error),
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
    validationSchema: availabilitySchema,
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
        updateMutation.mutate({ id: availability.id, ...base });
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
    mutation: addMutation || updateMutation,
    formik,
    isUpdate,
    isLoading: addMutation.isPending || updateMutation.isPending,
    handleAllDayToggle,
  };
};
