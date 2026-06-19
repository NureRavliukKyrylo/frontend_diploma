export const PROJECT_CREATE_STEPS = [
  { label: "Basics", sublabel: "Name & description" },
  { label: "Location & dates", sublabel: "Where and when" },
  { label: "Categories", sublabel: "Tags & topics" },
  { label: "Access", sublabel: "Join & leave policies" },
] as const;

export const PROJECT_CREATE_STEP_HEADERS = [
  {
    eyebrow: "Step 01 of 04",
    title: "Tell us about your project",
    subtitle:
      "Give it a clear name and description so volunteers know exactly what to expect.",
  },
  {
    eyebrow: "Step 02 of 04",
    title: "Where and when?",
    subtitle: "Set the location and timeline for your project.",
  },
  {
    eyebrow: "Step 03 of 04",
    title: "Choose categories",
    subtitle:
      "Help people find your project by selecting relevant categories. This step is optional.",
  },
  {
    eyebrow: "Step 04 of 04",
    title: "Access policies",
    subtitle: "Control how volunteers join and leave your project.",
  },
] as const;
