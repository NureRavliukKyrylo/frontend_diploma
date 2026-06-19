import type { TFunction } from "i18next";
import { getOverviewSchema } from "@features/time-bank/offer-form/overview-step/libs/overviewSchema";

const t = ((key: string) => {
  const messages: Record<string, string> = {
    "timeBank:validation.titleRequired": "Title is required",
    "timeBank:validation.titleMax": "Max 30 characters",
    "timeBank:validation.descriptionRequired": "Description is required",
    "timeBank:validation.descriptionMax": "Max 150 characters",
    "timeBank:validation.priceRequired": "Price is required",
    "timeBank:validation.priceTypeError": "Must be a number",
    "timeBank:validation.priceNegative": "Price can't be negative",
    "timeBank:validation.startDateRequired": "Start date is required",
    "timeBank:validation.startDateInPast": "Start date cannot be in the past",
    "timeBank:validation.endDateRequired": "End date is required",
  };

  return messages[key] ?? key;
}) as TFunction;

const overviewSchema = getOverviewSchema(t);

const validData = {
  title: "Help with moving",
  description: "I need help moving furniture",
  priceMinutes: 30,
  startAt: new Date(Date.now() + 86400000).toISOString(),
  endAt: new Date(Date.now() + 172800000).toISOString(),
  isOnline: false,
};

describe("overviewSchema", () => {
  it("passes with valid data", async () => {
    await expect(overviewSchema.validate(validData)).resolves.toBeTruthy();
  });

  it("fails when title is missing", async () => {
    const { title, ...rest } = validData;
    await expect(overviewSchema.validate(rest)).rejects.toThrow(
      "Title is required",
    );
  });

  it("fails when title exceeds 30 characters", async () => {
    await expect(
      overviewSchema.validate({ ...validData, title: "a".repeat(31) }),
    ).rejects.toThrow("Max 30 characters");
  });

  it("fails when description is missing", async () => {
    const { description, ...rest } = validData;
    await expect(overviewSchema.validate(rest)).rejects.toThrow(
      "Description is required",
    );
  });

  it("fails when description exceeds 150 characters", async () => {
    await expect(
      overviewSchema.validate({ ...validData, description: "a".repeat(151) }),
    ).rejects.toThrow("Max 150 characters");
  });

  it("fails when priceMinutes is missing", async () => {
    const { priceMinutes, ...rest } = validData;
    await expect(overviewSchema.validate(rest)).rejects.toThrow(
      "Price is required",
    );
  });

  it("fails when priceMinutes is not a number", async () => {
    await expect(
      overviewSchema.validate({ ...validData, priceMinutes: "abc" }),
    ).rejects.toThrow("Must be a number");
  });

  it("fails when priceMinutes is negative", async () => {
    await expect(
      overviewSchema.validate({ ...validData, priceMinutes: -1 }),
    ).rejects.toThrow("Price can't be negative");
  });

  it("passes when priceMinutes is 0", async () => {
    await expect(
      overviewSchema.validate({ ...validData, priceMinutes: 0 }),
    ).resolves.toBeTruthy();
  });

  it("fails when startAt is missing", async () => {
    await expect(
      overviewSchema.validate({ ...validData, startAt: null }),
    ).rejects.toThrow("Start date is required");
  });

  it("fails when startAt is in the past", async () => {
    await expect(
      overviewSchema.validate({
        ...validData,
        startAt: new Date(Date.now() - 86400000).toISOString(),
      }),
    ).rejects.toThrow("Start date cannot be in the past");
  });

  it("fails when endAt is missing", async () => {
    await expect(
      overviewSchema.validate({ ...validData, endAt: null }),
    ).rejects.toThrow("End date is required");
  });
});
