import type { TFunction } from "i18next";
import { getSendGiftSchema } from "@features/time-bank/gift/libs/sendGiftSchema";

const t = ((key: string) => {
  const messages: Record<string, string> = {
    "timeBank:gifts.validation.amountRequired": "Amount is required",
    "timeBank:gifts.validation.amountTypeError": "Amount must be a number",
    "timeBank:gifts.validation.amountPositive": "Amount must be positive",
    "timeBank:gifts.validation.amountInteger": "Amount must be a whole number",
    "timeBank:gifts.validation.messageRequired": "Message is required",
    "timeBank:gifts.validation.messageMax":
      "Message must be at most 70 characters",
  };

  return messages[key] ?? key;
}) as TFunction;

const sendGiftSchema = getSendGiftSchema(t);

const validData = {
  amountMinutes: 10,
  message: "Happy gifting!",
};

describe("sendGiftSchema", () => {
  it("passes with valid data", async () => {
    await expect(sendGiftSchema.validate(validData)).resolves.toBeTruthy();
  });

  it("fails when amountMinutes is missing", async () => {
    const { amountMinutes, ...rest } = validData;
    await expect(sendGiftSchema.validate(rest)).rejects.toThrow(
      "Amount is required",
    );
  });

  it("fails when amountMinutes is not a number", async () => {
    await expect(
      sendGiftSchema.validate({ ...validData, amountMinutes: "abc" }),
    ).rejects.toThrow("Amount must be a number");
  });

  it("fails when amountMinutes is zero", async () => {
    await expect(
      sendGiftSchema.validate({ ...validData, amountMinutes: 0 }),
    ).rejects.toThrow("Amount must be positive");
  });

  it("fails when amountMinutes is negative", async () => {
    await expect(
      sendGiftSchema.validate({ ...validData, amountMinutes: -5 }),
    ).rejects.toThrow("Amount must be positive");
  });

  it("fails when amountMinutes is a decimal", async () => {
    await expect(
      sendGiftSchema.validate({ ...validData, amountMinutes: 1.5 }),
    ).rejects.toThrow("Amount must be a whole number");
  });

  it("fails when message is missing", async () => {
    const { message, ...rest } = validData;
    await expect(sendGiftSchema.validate(rest)).rejects.toThrow(
      "Message is required",
    );
  });

  it("fails when message is empty string", async () => {
    await expect(
      sendGiftSchema.validate({ ...validData, message: "" }),
    ).rejects.toThrow("Message is required");
  });

  it("fails when message is only whitespace", async () => {
    await expect(
      sendGiftSchema.validate({ ...validData, message: "   " }),
    ).rejects.toThrow("Message is required");
  });

  it("fails when message exceeds 70 characters", async () => {
    await expect(
      sendGiftSchema.validate({ ...validData, message: "a".repeat(71) }),
    ).rejects.toThrow("Message must be at most 70 characters");
  });

  it("passes when message is exactly 70 characters", async () => {
    await expect(
      sendGiftSchema.validate({ ...validData, message: "a".repeat(70) }),
    ).resolves.toBeTruthy();
  });
});
