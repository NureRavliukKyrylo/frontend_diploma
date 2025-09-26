import type { ReactNode } from "react";

export interface StepItem {
  title: string;
  description: string;
  message: string;
  formTitle: string;
  formDescription: string;
  content: ReactNode;
}

export const steps: StepItem[] = [
  {
    title: "Profile photo",
    description: "Which photo would you like to upload?",
    message: "Don’t worry, you can always change your photo later",
    formTitle: "Upload your profile photo",
    formDescription:
      "Adding your photo is a required step. It helps others recognize you and builds trust within the platform",
    content: <div>Step 1 form fields go here</div>,
  },
  {
    title: "Location",
    description: "Where are you now?",
    message: "Don’t worry, you can update your location anytime",
    formTitle: "Share your location",
    formDescription:
      "Adding your location is an essential part of our platform. It allows us to connect you with nearby volunteers and projects in your area",
    content: <div>Step 2 more details go here</div>,
  },
  {
    title: "About you",
    description: "How would you describe yourself?",
    message: "Don’t worry, you can edit your bio whenever you like",
    formTitle: "Tell us more about you",
    formDescription:
      "Please add your date of birth and a short bio. This information makes your profile complete and helps others get to know you better",
    content: <div>Step 3 final review here</div>,
  },
  {
    title: "Contacts & social links",
    description: "How can people reach you?",
    message: "Don’t worry, you can hide or update your contacts anytime",
    formTitle: "Connect your contacts",
    formDescription:
      "Add your phone and social profiles to stay connected. You’re in control — this info can be hidden from other users",
    content: <div>Step 3 final review here</div>,
  },
];
