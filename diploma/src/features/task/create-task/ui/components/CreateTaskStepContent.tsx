import type { useCreateTaskForm } from "../../model/useCreateTaskForm";
import { AccessStep } from "../steps/AccessStep";
import { BasicsStep } from "../steps/BasicsStep";
import { CategoriesStep } from "../steps/CategoriesStep";
import { DetailsStep } from "../steps/DetailsStep";

type CreateTaskForm = ReturnType<typeof useCreateTaskForm>;

interface CreateTaskStepContentProps {
  form: CreateTaskForm;
}

export const CreateTaskStepContent = ({ form }: CreateTaskStepContentProps) => {
  if (form.activeStep === 0) {
    return (
      <BasicsStep
        values={form.values}
        errors={form.errors}
        onChange={form.updateField}
      />
    );
  }

  if (form.activeStep === 1) {
    return (
      <DetailsStep
        values={form.values}
        errors={form.errors}
        onLocationChange={form.updateLocation}
        onChange={form.updateField}
      />
    );
  }

  if (form.activeStep === 2) {
    return (
      <CategoriesStep
        selectedIds={form.values.categoryIds}
        onToggle={form.toggleCategory}
      />
    );
  }

  return <AccessStep values={form.values} onChange={form.updateField} />;
};
