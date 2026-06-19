import { useState, type Dispatch, type SetStateAction } from "react";
import {
  validateCreateEventBasics,
  validateCreateEventLocationDates,
  validateCreateEventRecurrence,
} from "../lib/createEventValidation";
import type {
  CreateEventFormErrors,
  CreateEventFormState,
} from "./createEventFormTypes";

const MAX_STEP_INDEX = 4;

interface Params {
  values: CreateEventFormState;
  setErrors: Dispatch<SetStateAction<CreateEventFormErrors>>;
}

export const useCreateEventSteps = ({ values, setErrors }: Params) => {
  const [activeStep, setActiveStep] = useState(0);
  const validateStep = (step: number) => {
    const nextErrors =
      step === 0
        ? validateCreateEventBasics(values)
        : step === 1
          ? validateCreateEventLocationDates(values)
          : step === 2
            ? validateCreateEventRecurrence(values)
            : {};
    setErrors((current) => ({
      ...current,
      ...(step === 0 ? { title: nextErrors.title } : {}),
      ...(step === 1
        ? { startAt: nextErrors.startAt, endAt: nextErrors.endAt }
        : {}),
      ...(step === 2
        ? {
            recurrenceFrequency: nextErrors.recurrenceFrequency,
            recurrenceInterval: nextErrors.recurrenceInterval,
            recurrenceUntil: nextErrors.recurrenceUntil,
          }
        : {}),
    }));
    return Object.keys(nextErrors).length === 0;
  };
  const goNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((current) => Math.min(current + 1, MAX_STEP_INDEX));
    }
  };
  const goBack = () => setActiveStep((current) => Math.max(current - 1, 0));
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
