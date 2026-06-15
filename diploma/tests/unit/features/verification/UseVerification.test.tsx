import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useVerification } from "@features/verification/verification-base-form";

const { navigateMock, addToastMock } = vi.hoisted(() => ({
  navigateMock: vi.fn(),
  addToastMock: vi.fn(),
}));

const apiFnMock = vi.fn();
const confirmFnMock = vi.fn();
const onSuccessMock = vi.fn();

vi.mock("@heroui/react", async (importOriginal) => {
  const actual = await importOriginal();
  return { ...(actual as object), addToast: addToastMock };
});

vi.mock("@entities/user", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useUserStore: (selector?: (s: any) => any) => {
      const state = { userId: "user-1" };
      return selector ? selector(state) : state;
    },
  };
});

vi.mock("@entities/user/profile", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    profileQuery: {
      all: () => ({ queryKey: ["profile"], queryFn: vi.fn() }),
    },
  };
});
vi.mock("@tanstack/react-router", () => ({
  useRouter: () => ({ navigate: navigateMock }),
}));

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

describe("useVerification", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes formik with empty code", () => {
    const { result } = renderHook(() => useVerification({ apiFn: apiFnMock }), {
      wrapper: createWrapper(),
    });
    expect(result.current.formik.values.code).toBe("");
  });

  it("initializes formik with userId from store", () => {
    const { result } = renderHook(() => useVerification({ apiFn: apiFnMock }), {
      wrapper: createWrapper(),
    });
    expect(result.current.formik.values.userId).toBe("user-1");
  });

  it("isLoading is false initially", () => {
    const { result } = renderHook(() => useVerification({ apiFn: apiFnMock }), {
      wrapper: createWrapper(),
    });
    expect(result.current.isLoading).toBe(false);
  });

  it("errorMessage is null initially", () => {
    const { result } = renderHook(() => useVerification({ apiFn: apiFnMock }), {
      wrapper: createWrapper(),
    });
    expect(result.current.errorMessage).toBeNull();
  });

  it("initializes formik with extraFields", () => {
    const { result } = renderHook(
      () =>
        useVerification({
          apiFn: apiFnMock,
          extraFields: { email: "test@example.com" },
        }),
      { wrapper: createWrapper() },
    );
    expect((result.current.formik.values as any).email).toBe(
      "test@example.com",
    );
  });

  it("shows validation error when code is empty on submit", async () => {
    const { result } = renderHook(() => useVerification({ apiFn: apiFnMock }), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(result.current.formik.errors.code).toBeTruthy();
    });
  });

  it("calls apiFn on valid submit", async () => {
    apiFnMock.mockResolvedValue({});

    const { result } = renderHook(() => useVerification({ apiFn: apiFnMock }), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.setFieldValue("code", "123456");
    });
    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(apiFnMock).toHaveBeenCalledWith(
        expect.objectContaining({ code: "123456", userId: "user-1" }),
      );
    });
  });

  it("calls confirmFn after apiFn on success", async () => {
    apiFnMock.mockResolvedValue({});
    confirmFnMock.mockResolvedValue(undefined);

    const { result } = renderHook(
      () => useVerification({ apiFn: apiFnMock, confirmFn: confirmFnMock }),
      { wrapper: createWrapper() },
    );

    await act(async () => {
      await result.current.formik.setFieldValue("code", "123456");
    });
    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(confirmFnMock).toHaveBeenCalled();
    });
  });

  it("navigates to successRedirect on success", async () => {
    apiFnMock.mockResolvedValue({});

    const { result } = renderHook(
      () =>
        useVerification({
          apiFn: apiFnMock,
          successRedirect: "/success",
        }),
      { wrapper: createWrapper() },
    );

    await act(async () => {
      await result.current.formik.setFieldValue("code", "123456");
    });
    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith({ to: "/success" });
    });
  });

  it("does not navigate when successRedirect is not provided", async () => {
    apiFnMock.mockResolvedValue({});

    const { result } = renderHook(() => useVerification({ apiFn: apiFnMock }), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.setFieldValue("code", "123456");
    });
    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(addToastMock).toHaveBeenCalled();
    });

    expect(navigateMock).not.toHaveBeenCalled();
  });

  it("calls onSuccess callback on success", async () => {
    apiFnMock.mockResolvedValue({});

    const { result } = renderHook(
      () => useVerification({ apiFn: apiFnMock, onSuccess: onSuccessMock }),
      { wrapper: createWrapper() },
    );

    await act(async () => {
      await result.current.formik.setFieldValue("code", "123456");
    });
    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(onSuccessMock).toHaveBeenCalled();
    });
  });

  it("shows success toast with custom message", async () => {
    apiFnMock.mockResolvedValue({});

    const { result } = renderHook(
      () =>
        useVerification({
          apiFn: apiFnMock,
          successMessage: "Email verified successfully",
        }),
      { wrapper: createWrapper() },
    );

    await act(async () => {
      await result.current.formik.setFieldValue("code", "123456");
    });
    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(addToastMock).toHaveBeenCalledWith(
        expect.objectContaining({
          color: "success",
          description: "Email verified successfully",
        }),
      );
    });
  });

  it("shows error toast on failure", async () => {
    apiFnMock.mockRejectedValue(new Error("Invalid code"));

    const { result } = renderHook(() => useVerification({ apiFn: apiFnMock }), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.setFieldValue("code", "123456");
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

  it("sets errorMessage on failure", async () => {
    apiFnMock.mockRejectedValue(new Error("Invalid code"));

    const { result } = renderHook(() => useVerification({ apiFn: apiFnMock }), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.setFieldValue("code", "123456");
    });
    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(result.current.errorMessage).toBe("Invalid code");
    });
  });
});
