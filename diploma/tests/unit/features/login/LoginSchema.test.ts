import { loginSchema } from "@features/auth/login-form/libs/loginSchema";

describe("loginSchema", () => {
  it("passes with valid credentials", async () => {
    await expect(
      loginSchema.validate({
        email: "volunteer@example.com",
        password: "secret123",
      }),
    ).resolves.toBeTruthy();
  });

  it("fails when email is empty", async () => {
    await expect(
      loginSchema.validate({ email: "", password: "secret123" }),
    ).rejects.toThrow("Email is required");
  });

  it("fails when email format is invalid", async () => {
    await expect(
      loginSchema.validate({ email: "not-an-email", password: "secret123" }),
    ).rejects.toThrow("Please enter a valid email address");
  });

  it("fails when password is empty", async () => {
    await expect(
      loginSchema.validate({ email: "volunteer@example.com", password: "" }),
    ).rejects.toThrow("Password is required");
  });

  it("fails when both fields are empty", async () => {
    await expect(
      loginSchema.validate({ email: "", password: "" }),
    ).rejects.toThrow();
  });
});
