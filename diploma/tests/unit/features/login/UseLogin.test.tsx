import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useLogin } from "@features/auth/login-form/model/useLogin";

const {
  navigateMock,
  invalidateMock,
  clearLoginFormMock,
  setEmailMock,
  setUserIdMock,
  setIsAuthenticatedMock,
  addToastMock,
} = vi.hoisted(() => ({
  navigateMock: vi.fn(),
  invalidateMock: vi.fn(),
  clearLoginFormMock: vi.fn(),
  setEmailMock: vi.fn(),
  setUserIdMock: vi.fn(),
  setIsAuthenticatedMock: vi.fn(),
  addToastMock: vi.fn(),
}));

vi.mock("@features/auth/login-form/api/loginApi", () => ({
  login: vi.fn(),
}));

vi.mock("@heroui/react", async (importOriginal) => {
  const actual = await importOriginal();
  return { ...(actual as object), addToast: addToastMock };
});

vi.mock("@entities/user", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useAuthStore: (selector?: (s: any) => any) => {
      const state = {
        loginEmail: "volunteer@example.com",
        loginPassword: "secret123",
        rememberMe: false,
        clearLoginForm: clearLoginFormMock,
        setLoginEmail: vi.fn(),
        setLoginPassword: vi.fn(),
        setRememberMe: vi.fn(),
      };
      return selector ? selector(state) : state;
    },
    useUserStore: (selector?: (s: any) => any) => {
      const state = {
        setEmail: setEmailMock,
        setUserId: setUserIdMock,
        setIsAuthenticated: setIsAuthenticatedMock,
      };
      return selector ? selector(state) : state;
    },
  };
});

vi.mock("@tanstack/react-router", () => ({
  useRouter: () => ({
    navigate: navigateMock,
    invalidate: invalidateMock,
  }),
  useSearch: () => ({}),
}));

vi.mock("@shared/routes", () => ({
  AuthRoutes: {
    verification: { twoFactor: "/auth/2fa" },
    forgotPassword: { root: "/auth/forgot-password" },
  },
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

describe("useLogin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes formik with values from auth store", () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });
    expect(result.current.formik.values.email).toBe("volunteer@example.com");
    expect(result.current.formik.values.password).toBe("secret123");
    expect(result.current.formik.values.rememberMe).toBe(false);
  });

  it("isLoading is false initially", () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });
    expect(result.current.isLoading).toBe(false);
  });

  it("errorMessage is null initially", () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });
    expect(result.current.errorMessage).toBeNull();
  });

  it("shows validation error when submitting empty email", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.setFieldValue("email", "");
    });

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(result.current.formik.errors.email).toBe("Email is required");
    });
  });

  it("shows validation error when submitting invalid email", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.formik.setFieldValue("email", "bad-email");
    });

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(result.current.formik.errors.email).toBe(
        "Please enter a valid email address",
      );
    });
  });

  it("shows validation error when password is empty", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.formik.setFieldValue("password", "");
    });

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(result.current.formik.errors.password).toBe(
        "Password is required",
      );
    });
  });

  it("calls login mutation on valid submit", async () => {
    const { login } = await import("@features/auth/login-form/api/loginApi");
    vi.mocked(login).mockResolvedValue({
      userId: "user-1",
      requires2FA: false,
    });

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: "volunteer@example.com",
        password: "secret123",
        rememberMe: false,
      });
    });
  });

  it("calls setEmail on valid submit", async () => {
    const { login } = await import("@features/auth/login-form/api/loginApi");
    vi.mocked(login).mockResolvedValue({
      userId: "user-1",
      requires2FA: false,
    });

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(setEmailMock).toHaveBeenCalledWith("volunteer@example.com");
    });
  });

  it("navigates to projects on success without 2FA", async () => {
    const { login } = await import("@features/auth/login-form/api/loginApi");
    vi.mocked(login).mockResolvedValue({
      userId: "user-1",
      requires2FA: false,
    });

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith({ to: "/projects" });
    });
  });

  it("navigates to 2FA route when requires2FA is true", async () => {
    const { login } = await import("@features/auth/login-form/api/loginApi");
    vi.mocked(login).mockResolvedValue({ userId: "user-1", requires2FA: true });

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith({ to: "/auth/2fa" });
    });
  });

  it("clears login form on success", async () => {
    const { login } = await import("@features/auth/login-form/api/loginApi");
    vi.mocked(login).mockResolvedValue({
      userId: "user-1",
      requires2FA: false,
    });

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(clearLoginFormMock).toHaveBeenCalled();
    });
  });

  it("shows success toast on login success", async () => {
    const { login } = await import("@features/auth/login-form/api/loginApi");
    vi.mocked(login).mockResolvedValue({
      userId: "user-1",
      requires2FA: false,
    });

    const { result } = renderHook(() => useLogin(), {
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

  it("shows error toast on login failure", async () => {
    const { login } = await import("@features/auth/login-form/api/loginApi");
    vi.mocked(login).mockRejectedValue(new Error("Invalid credentials"));

    const { result } = renderHook(() => useLogin(), {
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

  it("sets errorMessage on login failure", async () => {
    const { login } = await import("@features/auth/login-form/api/loginApi");
    vi.mocked(login).mockRejectedValue(new Error("Invalid credentials"));

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(result.current.errorMessage).toBe("Invalid credentials");
    });
  });
});
