import { useState, type Dispatch, type SetStateAction } from "react";
import {
  validateCreateTaskBasics,
  validateCreateTaskDetails,
} from "../lib/createTaskValidation";
import type {
  CreateTaskFormErrors,
  CreateTaskFormState,
} from "./createTaskFormTypes";

const MAX_STEP_INDEX = 3;

interface Params {
  values: CreateTaskFormState;
  setErrors: Dispatch<SetStateAction<CreateTaskFormErrors>>;
}

export const useCreateTaskSteps = ({ values, setErrors }: Params) => {
  const [activeStep, setActiveStep] = useState(0);
  const validateStep = (step: number) => {
    const nextErrors =
      step === 0
        ? validateCreateTaskBasics(values)
        : step === 1
          ? validateCreateTaskDetails(values)
          : {};
    setErrors((current) => ({
      ...current,
      ...(step === 0 ? { title: nextErrors.title } : {}),
      ...(step === 1
        ? { startAt: nextErrors.startAt, endAt: nextErrors.endAt }
        : {}),
    }));
    return Object.keys(nextErrors).length === 0;
  };
  const goNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((current) => Math.min(current + 1, MAX_STEP_INDEX));
    }
  };
  const goBack = () =>
    setActiveStep((current) => Math.max(current - 1, 0));
  const goToStep = (step: number) => {
    if (step < 0 || step > MAX_STEP_INDEX) return;
    if (step <= activeStep) {
      setActiveStep(step);
      return;
    }
    for (let index = 0; index < step; index += 1) {
      if (!validateStep(index)) {
        setActiveStep(index);
        return;
      }
    }
    setActiveStep(step);
  };

  return { activeStep, setActiveStep, validateStep, goNext, goBack, goToStep };
};
