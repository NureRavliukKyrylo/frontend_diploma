export const EVENT_CREATE_STEPS = [
  { label: "Basics", sublabel: "Name & description" },
  { label: "Location & dates", sublabel: "Where and when" },
  { label: "Recurring", sublabel: "Repeat schedule" },
  { label: "Categories & skills", sublabel: "Tags & requirements" },
  { label: "Access", sublabel: "Join & leave policies" },
] as const;

export const EVENT_CREATE_STEP_HEADERS = [
  {
    eyebrow: "Step 01 of 05",
    title: "Tell us about your event",
    subtitle:
      "Give it a clear name and description so volunteers know exactly what to expect.",
  },
  {
    eyebrow: "Step 02 of 05",
    title: "Where and when?",
    subtitle: "Set the location and timeline for your event.",
  },
  {
    eyebrow: "Step 03 of 05",
    title: "Set a repeat schedule",
    subtitle: "Choose whether this event repeats and how often.",
  },
  {
    eyebrow: "Step 04 of 05",
    title: "Categories & skills",
    subtitle:
      "Help people find your event by selecting relevant categories and required skills. This step is optional.",
  },
  {
    eyebrow: "Step 05 of 05",
    title: "Access policies",
    subtitle: "Control how volunteers join and leave your event.",
  },
] as const;
