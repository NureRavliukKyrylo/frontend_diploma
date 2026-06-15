import { locationSchema } from "@features/time-bank/offer-form/location-step/libs/locationSchema";

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
