import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useResendCode } from "@features/verification/resend-code/model/useResendCode";
import { OtpType } from "@shared/config/types";

const { addToastMock } = vi.hoisted(() => ({
  addToastMock: vi.fn(),
}));

vi.mock("@features/verification/resend-code/api/resendCodeApi", () => ({
  resendEmailVerification: vi.fn(),
  resendTwoFactor: vi.fn(),
  resendPasswordReset: vi.fn(),
}));

vi.mock("@heroui/react", async (importOriginal) => {
  const actual = await importOriginal();
  return { ...(actual as object), addToast: addToastMock };
});

vi.mock("@shared/libs/error-message", () => ({
  getErrorMessage: (e: unknown) =>
    e instanceof Error ? e.message : "Something went wrong. Please try again",
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useResendCode", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("isLoadingResend is false initially", () => {
    const { result } = renderHook(
      () => useResendCode({ type: OtpType.EmailVerification, userId: "u1" }),
      { wrapper: createWrapper() },
    );
    expect(result.current.isLoadingResend).toBe(false);
  });

  it("resendErrorMessage is null initially", () => {
    const { result } = renderHook(
      () => useResendCode({ type: OtpType.EmailVerification, userId: "u1" }),
      { wrapper: createWrapper() },
    );
    expect(result.current.resendErrorMessage).toBeNull();
  });

  it("calls resendEmailVerification with userId for EmailVerification type", async () => {
    const { resendEmailVerification } =
      await import("@features/verification/resend-code/api/resendCodeApi");
    vi.mocked(resendEmailVerification).mockResolvedValue(undefined);

    const { result } = renderHook(
      () => useResendCode({ type: OtpType.EmailVerification, userId: "u1" }),
      { wrapper: createWrapper() },
    );

    await act(async () => {
      await result.current.resend();
    });

    await waitFor(() => {
      expect(resendEmailVerification).toHaveBeenCalledWith("u1");
    });
  });

  it("calls resendTwoFactor for TwoFactor type", async () => {
    const { resendTwoFactor } =
      await import("@features/verification/resend-code/api/resendCodeApi");
    vi.mocked(resendTwoFactor).mockResolvedValue(undefined);

    const { result } = renderHook(
      () => useResendCode({ type: OtpType.TwoFactor }),
      { wrapper: createWrapper() },
    );

    await act(async () => {
      await result.current.resend();
    });

    await waitFor(() => {
      expect(resendTwoFactor).toHaveBeenCalled();
    });
  });

  it("calls resendPasswordReset with email for PasswordReset type", async () => {
    const { resendPasswordReset } =
      await import("@features/verification/resend-code/api/resendCodeApi");
    vi.mocked(resendPasswordReset).mockResolvedValue(undefined);

    const { result } = renderHook(
      () =>
        useResendCode({
          type: OtpType.PasswordReset,
          email: "user@example.com",
        }),
      { wrapper: createWrapper() },
    );

    await act(async () => {
      await result.current.resend();
    });

    await waitFor(() => {
      expect(resendPasswordReset).toHaveBeenCalledWith("user@example.com");
    });
  });

  it("shows success toast on resend success", async () => {
    const { resendEmailVerification } =
      await import("@features/verification/resend-code/api/resendCodeApi");
    vi.mocked(resendEmailVerification).mockResolvedValue(undefined);

    const { result } = renderHook(
      () => useResendCode({ type: OtpType.EmailVerification, userId: "u1" }),
      { wrapper: createWrapper() },
    );

    await act(async () => {
      await result.current.resend();
    });

    await waitFor(() => {
      expect(addToastMock).toHaveBeenCalledWith(
        expect.objectContaining({ color: "success" }),
      );
    });
  });

  it("shows error toast on resend failure", async () => {
    const { resendEmailVerification } =
      await import("@features/verification/resend-code/api/resendCodeApi");
    vi.mocked(resendEmailVerification).mockRejectedValue(
      new Error("Too many requests"),
    );

    const { result } = renderHook(
      () => useResendCode({ type: OtpType.EmailVerification, userId: "u1" }),
      { wrapper: createWrapper() },
    );

    await act(async () => {
      try {
        await result.current.resend();
      } catch {}
    });

    await waitFor(() => {
      expect(addToastMock).toHaveBeenCalledWith(
        expect.objectContaining({ color: "danger" }),
      );
    });
  });

  it("sets resendErrorMessage on failure", async () => {
    const { resendEmailVerification } =
      await import("@features/verification/resend-code/api/resendCodeApi");
    vi.mocked(resendEmailVerification).mockRejectedValue(
      new Error("Too many requests"),
    );

    const { result } = renderHook(
      () => useResendCode({ type: OtpType.EmailVerification, userId: "u1" }),
      { wrapper: createWrapper() },
    );

    await act(async () => {
      try {
        await result.current.resend();
      } catch {}
    });

    await waitFor(() => {
      expect(result.current.resendErrorMessage).toBe("Too many requests");
    });
  });
});
