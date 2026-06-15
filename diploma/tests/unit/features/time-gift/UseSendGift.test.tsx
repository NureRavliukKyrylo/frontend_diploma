import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useSendGiftMinutes } from "@features/time-bank/gift/model/useSendGiftMinutes";

const { addToastMock } = vi.hoisted(() => ({
  addToastMock: vi.fn(),
}));

vi.mock("@features/time-bank/gift/api/sendGiftApi", () => ({
  sendGift: vi.fn(),
}));

vi.mock("@heroui/react", async (importOriginal) => {
  const actual = await importOriginal();
  return { ...(actual as object), addToast: addToastMock };
});

vi.mock("@shared/libs/error-message", () => ({
  getErrorMessage: (e: unknown) =>
    e instanceof Error ? e.message : "Something went wrong. Please try again",
}));

vi.mock("@shared/api", () => ({
  queryClient: {
    invalidateQueries: vi.fn(),
  },
}));

vi.mock("@entities/offer", () => ({
  offerKeys: {
    all: () => ["offers"],
  },
}));

const generatedUuids: string[] = [];
vi.mock("uuid", () => ({
  v4: () => {
    const id = `uuid-${generatedUuids.length + 1}`;
    generatedUuids.push(id);
    return id;
  },
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
  recipientUserId: "recipient-1",
  onSuccess: vi.fn(),
};

describe("useSendGiftMinutes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    generatedUuids.length = 0;
  });

  it("initializes formik with empty values", () => {
    const { result } = renderHook(() => useSendGiftMinutes(defaultProps), {
      wrapper: createWrapper(),
    });
    expect(result.current.formik.values.amountMinutes).toBe("");
    expect(result.current.formik.values.message).toBe("");
  });

  it("isLoading is false initially", () => {
    const { result } = renderHook(() => useSendGiftMinutes(defaultProps), {
      wrapper: createWrapper(),
    });
    expect(result.current.isLoading).toBe(false);
  });

  it("shows validation error when amountMinutes is empty", async () => {
    const { result } = renderHook(() => useSendGiftMinutes(defaultProps), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(result.current.formik.errors.amountMinutes).toBeTruthy();
    });
  });

  it("shows validation error when message is empty", async () => {
    const { result } = renderHook(() => useSendGiftMinutes(defaultProps), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.setFieldValue("amountMinutes", "10");
    });
    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(result.current.formik.errors.message).toBe("Message is required");
    });
  });

  it("calls sendGift with correct data on valid submit", async () => {
    const { sendGift } =
      await import("@features/time-bank/gift/api/sendGiftApi");
    vi.mocked(sendGift).mockResolvedValue({});

    const { result } = renderHook(() => useSendGiftMinutes(defaultProps), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.setFieldValue("amountMinutes", "10");
    });
    await act(async () => {
      await result.current.formik.setFieldValue("message", "Hello!");
    });
    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(sendGift).toHaveBeenCalledWith(
        expect.objectContaining({
          amountMinutes: 10,
          message: "Hello!",
          recipientUserId: "recipient-1",
          idempotencyKey: expect.any(String),
        }),
      );
    });
  });

  it("idempotencyKey stays the same across failed attempts", async () => {
    const { sendGift } =
      await import("@features/time-bank/gift/api/sendGiftApi");
    vi.mocked(sendGift).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useSendGiftMinutes(defaultProps), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.setFieldValue("amountMinutes", "10");
    });
    await act(async () => {
      await result.current.formik.setFieldValue("message", "Hello!");
    });

    await act(async () => {
      await result.current.formik.submitForm();
    });
    await waitFor(() => expect(addToastMock).toHaveBeenCalledTimes(1));

    const firstCallKey = vi.mocked(sendGift).mock.calls[0][0].idempotencyKey;

    await act(async () => {
      await result.current.formik.submitForm();
    });
    await waitFor(() => expect(addToastMock).toHaveBeenCalledTimes(2));

    const secondCallKey = vi.mocked(sendGift).mock.calls[1][0].idempotencyKey;

    expect(firstCallKey).toBe(secondCallKey);
  });

  it("idempotencyKey changes after successful submit", async () => {
    const { sendGift } =
      await import("@features/time-bank/gift/api/sendGiftApi");
    vi.mocked(sendGift).mockResolvedValue({});

    const onSuccess = vi.fn();
    const { result } = renderHook(
      () => useSendGiftMinutes({ ...defaultProps, onSuccess }),
      { wrapper: createWrapper() },
    );

    await act(async () => {
      await result.current.formik.setFieldValue("amountMinutes", "10");
    });
    await act(async () => {
      await result.current.formik.setFieldValue("message", "Hello!");
    });

    await act(async () => {
      await result.current.formik.submitForm();
    });
    await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));

    const firstCallKey = vi.mocked(sendGift).mock.calls[0][0].idempotencyKey;

    await act(async () => {
      await result.current.formik.setFieldValue("amountMinutes", "20");
    });
    await act(async () => {
      await result.current.formik.setFieldValue("message", "Again!");
    });
    await act(async () => {
      await result.current.formik.submitForm();
    });
    await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(2));

    const secondCallKey = vi.mocked(sendGift).mock.calls[1][0].idempotencyKey;

    expect(firstCallKey).not.toBe(secondCallKey);
  });

  it("shows success toast on success", async () => {
    const { sendGift } =
      await import("@features/time-bank/gift/api/sendGiftApi");
    vi.mocked(sendGift).mockResolvedValue({});

    const { result } = renderHook(() => useSendGiftMinutes(defaultProps), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.setFieldValue("amountMinutes", "10");
    });
    await act(async () => {
      await result.current.formik.setFieldValue("message", "Hello!");
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

  it("calls onSuccess callback on success", async () => {
    const { sendGift } =
      await import("@features/time-bank/gift/api/sendGiftApi");
    vi.mocked(sendGift).mockResolvedValue({});

    const onSuccess = vi.fn();
    const { result } = renderHook(
      () => useSendGiftMinutes({ ...defaultProps, onSuccess }),
      { wrapper: createWrapper() },
    );

    await act(async () => {
      await result.current.formik.setFieldValue("amountMinutes", "10");
    });
    await act(async () => {
      await result.current.formik.setFieldValue("message", "Hello!");
    });
    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it("invalidates offer queries on success", async () => {
    const { sendGift } =
      await import("@features/time-bank/gift/api/sendGiftApi");
    vi.mocked(sendGift).mockResolvedValue({});
    const { queryClient } = await import("@shared/api");

    const { result } = renderHook(() => useSendGiftMinutes(defaultProps), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.setFieldValue("amountMinutes", "10");
    });
    await act(async () => {
      await result.current.formik.setFieldValue("message", "Hello!");
    });
    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith(
        expect.objectContaining({ queryKey: ["offers"] }),
      );
    });
  });

  it("shows error toast on failure", async () => {
    const { sendGift } =
      await import("@features/time-bank/gift/api/sendGiftApi");
    vi.mocked(sendGift).mockRejectedValue(new Error("Insufficient balance"));

    const { result } = renderHook(() => useSendGiftMinutes(defaultProps), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.setFieldValue("amountMinutes", "10");
    });
    await act(async () => {
      await result.current.formik.setFieldValue("message", "Hello!");
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

  it("does not call onSuccess on failure", async () => {
    const { sendGift } =
      await import("@features/time-bank/gift/api/sendGiftApi");
    vi.mocked(sendGift).mockRejectedValue(new Error("Insufficient balance"));

    const onSuccess = vi.fn();
    const { result } = renderHook(
      () => useSendGiftMinutes({ ...defaultProps, onSuccess }),
      { wrapper: createWrapper() },
    );

    await act(async () => {
      await result.current.formik.setFieldValue("amountMinutes", "10");
    });
    await act(async () => {
      await result.current.formik.setFieldValue("message", "Hello!");
    });
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
