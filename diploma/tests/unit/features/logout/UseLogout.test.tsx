import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useLogout } from "@features/auth/logout/model/useLogout";

const { navigateMock, invalidateMock, clearUserInfoMock, addToastMock } =
  vi.hoisted(() => ({
    navigateMock: vi.fn(),
    invalidateMock: vi.fn(),
    clearUserInfoMock: vi.fn(),
    addToastMock: vi.fn(),
  }));

vi.mock("@features/auth/logout/api/logoutApi", () => ({
  logout: vi.fn(),
}));

vi.mock("@heroui/react", async (importOriginal) => {
  const actual = await importOriginal();
  return { ...(actual as object), addToast: addToastMock };
});

vi.mock("@entities/user", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useUserStore: (selector?: (s: any) => any) => {
      const state = { clearUserInfo: clearUserInfoMock };
      return selector ? selector(state) : state;
    },
  };
});

vi.mock("@tanstack/react-router", () => ({
  useRouter: () => ({
    navigate: navigateMock,
    invalidate: invalidateMock,
  }),
}));

vi.mock("@shared/routes", () => ({
  AuthRoutes: {
    root: "/auth",
  },
}));

vi.mock("@shared/libs/error-message", () => ({
  getErrorMessage: (e: unknown) =>
    e instanceof Error ? e.message : "Something went wrong. Please try again",
}));

vi.mock("@shared/api", () => ({
  queryClient: {
    cancelQueries: vi.fn().mockResolvedValue(undefined),
    clear: vi.fn(),
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

describe("useLogout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("isLoading is false initially", () => {
    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(),
    });
    expect(result.current.isLoading).toBe(false);
  });

  it("errorMessage is null initially", () => {
    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(),
    });
    expect(result.current.errorMessage).toBeNull();
  });

  it("calls logout api on handleLogout", async () => {
    const { logout } = await import("@features/auth/logout/api/logoutApi");
    vi.mocked(logout).mockResolvedValue(undefined);

    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.handleLogout();
    });

    await waitFor(() => {
      expect(logout).toHaveBeenCalled();
    });
  });

  it("calls clearUserInfo on success", async () => {
    const { logout } = await import("@features/auth/logout/api/logoutApi");
    vi.mocked(logout).mockResolvedValue(undefined);

    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.handleLogout();
    });

    await waitFor(() => {
      expect(clearUserInfoMock).toHaveBeenCalled();
    });
  });

  it("invalidates router on success", async () => {
    const { logout } = await import("@features/auth/logout/api/logoutApi");
    vi.mocked(logout).mockResolvedValue(undefined);

    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.handleLogout();
    });

    await waitFor(() => {
      expect(invalidateMock).toHaveBeenCalled();
    });
  });

  it("navigates to auth root on success", async () => {
    const { logout } = await import("@features/auth/logout/api/logoutApi");
    vi.mocked(logout).mockResolvedValue(undefined);

    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.handleLogout();
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith({ to: "/auth" });
    });
  });

  it("shows success toast on logout success when showToast is true", async () => {
    const { logout } = await import("@features/auth/logout/api/logoutApi");
    vi.mocked(logout).mockResolvedValue(undefined);

    const { result } = renderHook(() => useLogout(undefined, true), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.handleLogout();
    });

    await waitFor(() => {
      expect(addToastMock).toHaveBeenCalledWith(
        expect.objectContaining({ color: "success" }),
      );
    });
  });

  it("does not show success toast when showToast is false", async () => {
    const { logout } = await import("@features/auth/logout/api/logoutApi");
    vi.mocked(logout).mockResolvedValue(undefined);

    const { result } = renderHook(() => useLogout(undefined, false), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.handleLogout();
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalled();
    });

    expect(addToastMock).not.toHaveBeenCalledWith(
      expect.objectContaining({ color: "success" }),
    );
  });

  it("calls onSuccessCallback on success", async () => {
    const { logout } = await import("@features/auth/logout/api/logoutApi");
    vi.mocked(logout).mockResolvedValue(undefined);
    const onSuccessCallback = vi.fn();

    const { result } = renderHook(() => useLogout(onSuccessCallback), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.handleLogout();
    });

    await waitFor(() => {
      expect(onSuccessCallback).toHaveBeenCalled();
    });
  });

  it("shows error toast on logout failure", async () => {
    const { logout } = await import("@features/auth/logout/api/logoutApi");
    vi.mocked(logout).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.handleLogout();
    });

    await waitFor(() => {
      expect(addToastMock).toHaveBeenCalledWith(
        expect.objectContaining({ color: "danger" }),
      );
    });
  });

  it("sets errorMessage on logout failure", async () => {
    const { logout } = await import("@features/auth/logout/api/logoutApi");
    vi.mocked(logout).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.handleLogout();
    });

    await waitFor(() => {
      expect(result.current.errorMessage).toBe("Network error");
    });
  });

  it("does not call onSuccessCallback on failure", async () => {
    const { logout } = await import("@features/auth/logout/api/logoutApi");
    vi.mocked(logout).mockRejectedValue(new Error("Network error"));
    const onSuccessCallback = vi.fn();

    const { result } = renderHook(() => useLogout(onSuccessCallback), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.handleLogout();
    });

    await waitFor(() => {
      expect(result.current.errorMessage).toBe("Network error");
    });

    expect(onSuccessCallback).not.toHaveBeenCalled();
  });
});
