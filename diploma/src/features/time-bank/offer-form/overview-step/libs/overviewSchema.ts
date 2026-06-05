import * as Yup from "yup";

export const overviewSchema = Yup.object({
  title: Yup.string()
    .max(30, "Max 30 characters")
    .required("Title is required"),
  description: Yup.string()
    .max(150, "Max 150 characters")
    .required("Description is required"),
  priceMinutes: Yup.number()
    .typeError("Must be a number")
    .min(0, "Price can't be negative")
    .required("Price is required"),
  startAt: Yup.string().nullable().required("Start date is required"),
  endAt: Yup.string().nullable().required("End date is required"),
  isOnline: Yup.boolean().required(),
});

export type OverviewFormValues = Yup.InferType<typeof overviewSchema>;
