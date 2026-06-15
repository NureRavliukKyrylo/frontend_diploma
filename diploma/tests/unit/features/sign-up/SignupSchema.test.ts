import { registerSchema } from "@features/auth/signup-form/libs/signUpSchema";

const validData = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  password: "Password1@",
  agreement: true,
};

describe("registerSchema", () => {
  it("passes with valid data", async () => {
    await expect(registerSchema.validate(validData)).resolves.toBeTruthy();
  });

  it("fails when firstName is missing", async () => {
    const { firstName, ...rest } = validData;
    await expect(registerSchema.validate(rest)).rejects.toThrow(
      "First name is required",
    );
  });

  it("fails when firstName is too short", async () => {
    await expect(
      registerSchema.validate({ ...validData, firstName: "J" }),
    ).rejects.toThrow("First name is too short");
  });

  it("fails when firstName is too long", async () => {
    await expect(
      registerSchema.validate({ ...validData, firstName: "J".repeat(51) }),
    ).rejects.toThrow("First name is too long");
  });

  it("fails when firstName contains invalid characters", async () => {
    await expect(
      registerSchema.validate({ ...validData, firstName: "John123" }),
    ).rejects.toThrow("Please enter a valid full name");
  });

  it("passes firstName with Cyrillic characters", async () => {
    await expect(
      registerSchema.validate({ ...validData, firstName: "Іван" }),
    ).resolves.toBeTruthy();
  });

  it("passes firstName with hyphen", async () => {
    await expect(
      registerSchema.validate({ ...validData, firstName: "Mary-Jane" }),
    ).resolves.toBeTruthy();
  });

  it("fails when lastName is missing", async () => {
    const { lastName, ...rest } = validData;
    await expect(registerSchema.validate(rest)).rejects.toThrow(
      "Last name is required",
    );
  });

  it("fails when lastName is too short", async () => {
    await expect(
      registerSchema.validate({ ...validData, lastName: "D" }),
    ).rejects.toThrow("Last name is too short");
  });

  it("fails when lastName is too long", async () => {
    await expect(
      registerSchema.validate({ ...validData, lastName: "D".repeat(51) }),
    ).rejects.toThrow("Last name is too long");
  });

  it("fails when lastName contains invalid characters", async () => {
    await expect(
      registerSchema.validate({ ...validData, lastName: "Doe123" }),
    ).rejects.toThrow("Please enter a valid full name");
  });

  it("fails when email is missing", async () => {
    const { email, ...rest } = validData;
    await expect(registerSchema.validate(rest)).rejects.toThrow(
      "Email is required",
    );
  });

  it("fails when email is invalid", async () => {
    await expect(
      registerSchema.validate({ ...validData, email: "not-an-email" }),
    ).rejects.toThrow("Please enter a valid email address");
  });

  it("fails when password is missing", async () => {
    const { password, ...rest } = validData;
    await expect(registerSchema.validate(rest)).rejects.toThrow(
      "Password is required",
    );
  });

  it("fails when password is too short", async () => {
    await expect(
      registerSchema.validate({ ...validData, password: "Ab1@" }),
    ).rejects.toThrow("Password must be at least 8 characters");
  });

  it("fails when password has no uppercase letter", async () => {
    await expect(
      registerSchema.validate({ ...validData, password: "password1@" }),
    ).rejects.toThrow("Password must contain at least one uppercase letter");
  });

  it("fails when password has no lowercase letter", async () => {
    await expect(
      registerSchema.validate({ ...validData, password: "PASSWORD1@" }),
    ).rejects.toThrow("Password must contain at least one lowercase letter");
  });

  it("fails when password has no number", async () => {
    await expect(
      registerSchema.validate({ ...validData, password: "Password@" }),
    ).rejects.toThrow("Password must contain at least one number");
  });

  it("fails when password has no special character", async () => {
    await expect(
      registerSchema.validate({ ...validData, password: "Password1" }),
    ).rejects.toThrow("Password must contain at least one special character");
  });

  it("fails when agreement is false", async () => {
    await expect(
      registerSchema.validate({ ...validData, agreement: false }),
    ).rejects.toThrow("You must agree to the terms");
  });

  it("fails when agreement is missing", async () => {
    const { agreement, ...rest } = validData;
    await expect(registerSchema.validate(rest)).rejects.toThrow();
  });
});
