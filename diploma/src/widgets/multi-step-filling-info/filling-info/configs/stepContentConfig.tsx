import {
  AboutForm,
  ImageForm,
  UserLocationPicker,
  ContactsForm,
} from "@features/multi-step-filling-info";
import { type StepItem } from "@shared/config/types";
import type { TFunction } from "i18next";

export const getSteps = (t: TFunction): StepItem[] => [
  {
    title: t("filling.steps.photo.title"),
    description: t("filling.steps.photo.description"),
    message: t("filling.steps.photo.message"),
    formTitle: t("filling.steps.photo.formTitle"),
    formDescription: t("filling.steps.photo.formDescription"),
    content: <ImageForm />,
    formId: "image-filling-form",
  },
  {
    title: t("filling.steps.location.title"),
    description: t("filling.steps.location.description"),
    message: t("filling.steps.location.message"),
    formTitle: t("filling.steps.location.formTitle"),
    formDescription: t("filling.steps.location.formDescription"),
    content: <UserLocationPicker />,
    formId: "user-location-filling-form",
  },
  {
    title: t("filling.steps.about.title"),
    description: t("filling.steps.about.description"),
    message: t("filling.steps.about.message"),
    formTitle: t("filling.steps.about.formTitle"),
    formDescription: t("filling.steps.about.formDescription"),
    content: <AboutForm />,
    formId: "about-filling-form",
  },
  {
    title: t("filling.steps.contacts.title"),
    description: t("filling.steps.contacts.description"),
    message: t("filling.steps.contacts.message"),
    formTitle: t("filling.steps.contacts.formTitle"),
    formDescription: t("filling.steps.contacts.formDescription"),
    content: <ContactsForm />,
    formId: "contacts-filling-form",
  },
];
