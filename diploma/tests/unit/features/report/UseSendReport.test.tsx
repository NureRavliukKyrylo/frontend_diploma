import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useSendReport } from "@features/moderation/report/model/useSendReport";

const { addToastMock } = vi.hoisted(() => ({
  addToastMock: vi.fn(),
}));

vi.mock("@features/moderation/report/api/reportApi", () => ({
  sendReport: vi.fn(),
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

const defaultProps = {
  subjectType: "project" as any,
  subjectId: "subject-123",
  onSuccess: vi.fn(),
};

describe("useSendReport", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes formik with default values", () => {
    const { result } = renderHook(() => useSendReport(defaultProps), {
      wrapper: createWrapper(),
    });

    expect(result.current.formik.values.reason).toBe("Spam");
    expect(result.current.formik.values.details).toBe("");
  });

  it("isLoading is false initially", () => {
    const { result } = renderHook(() => useSendReport(defaultProps), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
  });

  it("shows validation error when reason is empty", async () => {
    const { result } = renderHook(() => useSendReport(defaultProps), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.setFieldValue("reason", "");
    });

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(result.current.formik.errors.reason).toBeDefined();
    });
  });

  it("calls sendReport with correct payload on valid submit", async () => {
    const { sendReport } =
      await import("@features/moderation/report/api/reportApi");
    vi.mocked(sendReport).mockResolvedValue(undefined);

    const { result } = renderHook(() => useSendReport(defaultProps), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.setFieldValue("reason", "Spam");
      await result.current.formik.setFieldValue("details", "Test details");
    });

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(sendReport).toHaveBeenCalledWith({
        subjectType: "project",
        subjectId: "subject-123",
        reason: "Spam",
        details: "Test details",
      });
    });
  });

  it("calls onSuccess callback after successful submission", async () => {
    const { sendReport } =
      await import("@features/moderation/report/api/reportApi");
    vi.mocked(sendReport).mockResolvedValue(undefined);

    const onSuccess = vi.fn();
    const { result } = renderHook(
      () => useSendReport({ ...defaultProps, onSuccess }),
      { wrapper: createWrapper() },
    );

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it("shows success toast on successful submission", async () => {
    const { sendReport } =
      await import("@features/moderation/report/api/reportApi");
    vi.mocked(sendReport).mockResolvedValue(undefined);

    const { result } = renderHook(() => useSendReport(defaultProps), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(addToastMock).toHaveBeenCalledWith(
        expect.objectContaining({ color: "success" }),
      );
    });
  });

  it("shows error toast on failed submission", async () => {
    const { sendReport } =
      await import("@features/moderation/report/api/reportApi");
    vi.mocked(sendReport).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useSendReport(defaultProps), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(addToastMock).toHaveBeenCalledWith(
        expect.objectContaining({ color: "danger" }),
      );
    });
  });

  it("shows correct error message in danger toast on failure", async () => {
    const { sendReport } =
      await import("@features/moderation/report/api/reportApi");
    vi.mocked(sendReport).mockRejectedValue(new Error("Unauthorized"));

    const { result } = renderHook(() => useSendReport(defaultProps), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(addToastMock).toHaveBeenCalledWith(
        expect.objectContaining({
          color: "danger",
          description: "Unauthorized",
        }),
      );
    });
  });

  it("does not call onSuccess on failure", async () => {
    const { sendReport } =
      await import("@features/moderation/report/api/reportApi");
    vi.mocked(sendReport).mockRejectedValue(new Error("Server error"));

    const onSuccess = vi.fn();
    const { result } = renderHook(
      () => useSendReport({ ...defaultProps, onSuccess }),
      { wrapper: createWrapper() },
    );

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(addToastMock).toHaveBeenCalledWith(
        expect.objectContaining({ color: "danger" }),
      );
    });

    expect(onSuccess).not.toHaveBeenCalled();
  });
});
