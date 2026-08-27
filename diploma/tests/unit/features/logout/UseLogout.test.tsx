import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useLogout } from "@features/auth/logout/model/useLogout";

const {
  navigateMock,
  invalidateMock,
  clearUserInfoMock,
  addToastMock,
  mockLogout,
} = vi.hoisted(() => ({
  navigateMock: vi.fn(),
  invalidateMock: vi.fn(),
  clearUserInfoMock: vi.fn(),
  addToastMock: vi.fn(),
  mockLogout: vi.fn(),
}));

vi.mock("@features/auth/logout/api/logoutApi", () => ({
  logout: (...args: any[]) => mockLogout(...args),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("@heroui/react", async (importOriginal) => {
  const actual = await importOriginal();
  return { ...(actual as object), addToast: addToastMock };
});

vi.mock("@entities/user", async (importOriginal) => {
  const actual = await importOriginal();
  const mockStore = {
    persist: {
      clearStorage: vi.fn(),
    },
  };
  return {
    ...(actual as object),
    useAuthStore: Object.assign(() => ({}), mockStore),
    useUserStore: Object.assign(
      () => ({ clearUserInfo: clearUserInfoMock }),
      mockStore,
    ),
    useUserProfileStore: Object.assign(() => ({}), mockStore),
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
    mockLogout.mockResolvedValue(undefined);

    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.handleLogout();
    });

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
    });
  });

  it("invalidates router on success", async () => {
    mockLogout.mockResolvedValue(undefined);

    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.handleLogout();
    });

    await waitFor(() => {
      expect(invalidateMock).toHaveBeenCalled();
    });
  });

  it("navigates to auth root on success", async () => {
    mockLogout.mockResolvedValue(undefined);

    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.handleLogout();
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith({ to: "/auth" });
    });
  });

  it("shows success toast on logout success when showToast is true", async () => {
    mockLogout.mockResolvedValue(undefined);

    const { result } = renderHook(() => useLogout(undefined, true), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.handleLogout();
    });

    await waitFor(() => {
      expect(addToastMock).toHaveBeenCalledWith(
        expect.objectContaining({ color: "success" }),
      );
    });
  });

  it("does not show success toast when showToast is false", async () => {
    mockLogout.mockResolvedValue(undefined);

    const { result } = renderHook(() => useLogout(undefined, false), {
      wrapper: createWrapper(),
    });

    act(() => {
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
    mockLogout.mockResolvedValue(undefined);
    const onSuccessCallback = vi.fn();

    const { result } = renderHook(() => useLogout(onSuccessCallback), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.handleLogout();
    });

    await waitFor(() => {
      expect(onSuccessCallback).toHaveBeenCalled();
    });
  });

  it("shows error toast on logout failure", async () => {
    mockLogout.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.handleLogout();
    });

    await waitFor(() => {
      expect(addToastMock).toHaveBeenCalledWith(
        expect.objectContaining({ color: "danger" }),
      );
    });
  });

  it("sets errorMessage on logout failure", async () => {
    mockLogout.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.handleLogout();
    });

    await waitFor(() => {
      expect(result.current.errorMessage).toBe("Network error");
    });
  });

  it("does not call onSuccessCallback on failure", async () => {
    mockLogout.mockRejectedValue(new Error("Network error"));
    const onSuccessCallback = vi.fn();

    const { result } = renderHook(() => useLogout(onSuccessCallback), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.handleLogout();
    });

    await waitFor(() => {
      expect(result.current.errorMessage).toBe("Network error");
    });

    expect(onSuccessCallback).not.toHaveBeenCalled();
  });
});
