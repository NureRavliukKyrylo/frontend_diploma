import type { FormikProps } from "formik";
import type { FeedbackFormValues } from "../model/useFeedbackForm";
import { Stars } from "@shared/ui/stars";
import { BaseButtonWrapper } from "@shared/ui/buttons";

interface FeedbackFormProps {
  formik: FormikProps<FeedbackFormValues>;
  isLoading: boolean;
  buttonText: string;
}

export const FeedbackForm = ({
  formik,
  isLoading,
  buttonText,
}: FeedbackFormProps) => (
  <form onSubmit={formik.handleSubmit}>
    <Stars
      value={formik.values.rating}
      onChange={(val) => formik.setFieldValue("rating", val)}
    />
    <textarea
      name="comment"
      value={formik.values.comment}
      onChange={formik.handleChange}
    />
    <BaseButtonWrapper type="submit" disabled={isLoading}>
      {buttonText}
    </BaseButtonWrapper>
  </form>
);
