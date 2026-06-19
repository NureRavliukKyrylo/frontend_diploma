export const STEPS = [
  { label: "Basics", sublabel: "Title & desc" },
  { label: "Details", sublabel: "Time & location" },
  { label: "Categories", sublabel: "Tags & topics" },
  { label: "Access", sublabel: "Policies" },
] as const;

export const STEP_HEADERS = [
  {
    eyebrow: "STEP 01 OF 04",
    title: "What needs to be done?",
    subtitle: "Give your task a clear name and description.",
  },
  {
    eyebrow: "STEP 02 OF 04",
    title: "Time & location",
    subtitle: "Set when and where this task takes place.",
  },
  {
    eyebrow: "STEP 03 OF 04",
    title: "Categories",
    subtitle: "Help people find this task. Optional.",
  },
  {
    eyebrow: "STEP 04 OF 04",
    title: "Access policies",
    subtitle: "Control how volunteers join and leave.",
  },
] as const;
