import type { TFunction } from "i18next";
import { getLocationSchema } from "@features/time-bank/offer-form/location-step/libs/locationSchema";

const t = ((key: string) => {
  const messages: Record<string, string> = {
    "timeBank:validation.locationRequired": "Please pick a location on the map",
  };

  return messages[key] ?? key;
}) as TFunction;

const locationSchema = getLocationSchema(t);

describe("locationSchema", () => {
  it("passes with valid coordinates", async () => {
    await expect(
      locationSchema.validate({
        location: { latitude: 50.4, longitude: 30.5 },
      }),
    ).resolves.toBeTruthy();
  });

  it("fails when latitude is missing", async () => {
    await expect(
      locationSchema.validate({ location: { longitude: 30.5 } }),
    ).rejects.toThrow("Please pick a location on the map");
  });

  it("fails when longitude is missing", async () => {
    await expect(
      locationSchema.validate({ location: { latitude: 50.4 } }),
    ).rejects.toThrow("Please pick a location on the map");
  });

  it("fails when location is empty object", async () => {
    await expect(locationSchema.validate({ location: {} })).rejects.toThrow(
      "Please pick a location on the map",
    );
  });
});
