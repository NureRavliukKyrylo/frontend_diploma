import {
  AboutForm,
  ImageForm,
  UserLocationPicker,
  ContactsForm,
} from "@features/multi-step-filling-info";

import { type StepItem } from "@shared/config/types";

export const steps: StepItem[] = [
  {
    title: "Profile photo",
    description: "Which photo would you like to upload?",
    message: "Don’t worry, you can always change your photo later",
    formTitle: "Upload your profile photo",
    formDescription:
      "Adding your photo is a required step. It helps others recognize you and builds trust within the platform",
    content: <ImageForm />,
    formId: "image-filling-form",
  },
  {
    title: "Location",
    description: "Where are you now?",
    message: "Don’t worry, you can update your location anytime",
    formTitle: "Share your location",
    formDescription:
      "Adding your location is an essential part of our platform. It allows us to connect you with nearby volunteers and projects in your area",
    content: <UserLocationPicker />,
    formId: "user-location-filling-form",
  },
  {
    title: "About you",
    description: "How would you describe yourself?",
    message: "Don’t worry, you can edit your bio whenever you like",
    formTitle: "Tell us more about you",
    formDescription:
      "Please add your date of birth and a short bio. This information makes your profile complete and helps others get to know you better",
    content: <AboutForm />,
    formId: "about-filling-form",
  },
  {
    title: "Contacts & social links",
    description: "How can people reach you?",
    message: "Don’t worry, you can hide or update your contacts anytime",
    formTitle: "Connect your contacts",
    formDescription:
      "Add your phone and social profiles to stay connected. You’re in control — this info can be hidden from other users",
    content: <ContactsForm />,
    formId: "contacts-filling-form",
  },
];
