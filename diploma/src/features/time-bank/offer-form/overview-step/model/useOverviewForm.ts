import { useFormik } from "formik";
import {
  getOverviewSchema,
  type OverviewFormValues,
} from "../libs/overviewSchema";
import { useOfferFormStore, type OfferFormData } from "@entities/offer";
import { useTranslation } from "react-i18next";

interface UseOverviewFormProps {
  data: OfferFormData;
}

export const useOverviewForm = ({ data }: UseOverviewFormProps) => {
  const setData = useOfferFormStore((s) => s.setData);
  const { t } = useTranslation(["timeBank"]);
  const formik = useFormik<
    Omit<OverviewFormValues, "startAt" | "endAt"> & {
      startAt: string | null;
      endAt: string | null;
    }
  >({
    initialValues: {
      title: data.title,
      description: data.description,
      priceMinutes: data.priceMinutes as number,
      startAt: data.startAt,
      endAt: data.endAt,
      isOnline: data.isOnline,
    },
    validationSchema: getOverviewSchema(t),
    onSubmit: (values) => setData(values),
  });

  const handleDateRangeChange = (
    range: { start: string; end: string } | null,
  ) => {
    if (!range) return;
    formik.setValues((prev) => ({
      ...prev,
      startAt: range.start,
      endAt: range.end,
    }));
  };

  return { formik, handleDateRangeChange };
};
