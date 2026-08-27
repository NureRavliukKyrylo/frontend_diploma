import type { OfferFormData } from "@entities/offer";
import { OverviewStep } from "../../overview-step";
import { LocationStep } from "../../location-step";
import { CategoriesStep } from "../../categories-step";
import { SkillsStep } from "../../skills-step";
import type { RefObject } from "react";

export const OFFER_STEPS = {
  OVERVIEW: 0,
  LOCATION: 1,
  CATEGORIES: 2,
  REVIEW: 3,
} as const;

export interface StepRef {
  submitForm: () => Promise<boolean>;
}

export type OfferStepKey = (typeof OFFER_STEPS)[keyof typeof OFFER_STEPS];

interface GetOfferFormStepsProps {
  data: OfferFormData;
  ref: RefObject<StepRef | null>;
}

export const getOfferFormSteps = (
  props: GetOfferFormStepsProps,
): Record<OfferStepKey, React.ReactNode> => ({
  [OFFER_STEPS.OVERVIEW]: <OverviewStep ref={props.ref} data={props.data} />,
  [OFFER_STEPS.LOCATION]: <LocationStep ref={props.ref} data={props.data} />,
  [OFFER_STEPS.CATEGORIES]: (
    <CategoriesStep ref={props.ref} data={props.data} />
  ),
  [OFFER_STEPS.REVIEW]: <SkillsStep ref={props.ref} data={props.data} />,
});
