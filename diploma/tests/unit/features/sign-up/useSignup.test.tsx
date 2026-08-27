import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useRegistration } from "@features/auth/signup-form/model/useRegistration";

const {
  navigateMock,
  clearSignupFormMock,
  setUserIdMock,
  setFirstNameMock,
  setLastNameMock,
  setEmailMock,
  setIsAuthenticatedMock,
  setRoleMock,
  addToastMock,
  mockRegister,
} = vi.hoisted(() => ({
  navigateMock: vi.fn(),
  clearSignupFormMock: vi.fn(),
  setUserIdMock: vi.fn(),
  setFirstNameMock: vi.fn(),
  setLastNameMock: vi.fn(),
  setEmailMock: vi.fn(),
  setIsAuthenticatedMock: vi.fn(),
  setRoleMock: vi.fn(),
  addToastMock: vi.fn(),
  mockRegister: vi.fn(),
}));

vi.mock("@features/auth/signup-form/api/signUpApi", () => ({
  register: (...args: any[]) => mockRegister(...args),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "common:validation.firstNameRequired": "First name is required",
        "common:validation.lastNameRequired": "Last name is required",
        "common:validation.emailRequired": "Email is required",
        "common:validation.invalidEmail": "Please enter a valid email address",
        "common:validation.passwordRequired": "Password is required",
        "common:validation.agreementRequired": "You must agree to the terms",
      };
      return translations[key] || key;
    },
  }),
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
        signUpEmail: "john@example.com",
        signUpPassword: "Password1@",
        signUpFirstName: "John",
        signUpLastName: "Doe",
        signFirstName: "John",
        signLastName: "Doe",
        agreement: true,
        clearSignupForm: clearSignupFormMock,
        setSignUpEmail: vi.fn(),
        setSignUpPassword: vi.fn(),
        setSignFirstName: vi.fn(),
        setSignLastName: vi.fn(),
        setAgreement: vi.fn(),
      };
      return selector ? selector(state) : state;
    },
    useUserStore: (selector?: (s: any) => any) => {
      const state = {
        setUserId: setUserIdMock,
        setFirstName: setFirstNameMock,
        setLastName: setLastNameMock,
        setEmail: setEmailMock,
        setIsAuthenticated: setIsAuthenticatedMock,
        setRole: setRoleMock,
      };
      return selector ? selector(state) : state;
    },
  };
});

vi.mock("@tanstack/react-router", () => ({
  useRouter: () => ({
    navigate: navigateMock,
  }),
}));

vi.mock("@shared/routes", () => ({
  AuthRoutes: {
    verification: { email: "/auth/verify-email" },
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

describe("useRegistration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("initializes formik with values from auth store", () => {
    const { result } = renderHook(() => useRegistration(), {
      wrapper: createWrapper(),
    });
    expect(result.current.formik.values.email).toBe("john@example.com");
    expect(result.current.formik.values.firstName).toBe("John");
    expect(result.current.formik.values.lastName).toBe("Doe");
    expect(result.current.formik.values.password).toBe("Password1@");
    expect(result.current.formik.values.agreement).toBe(true);
  });

  it("isLoading is false initially", () => {
    const { result } = renderHook(() => useRegistration(), {
      wrapper: createWrapper(),
    });
    expect(result.current.isLoading).toBe(false);
  });

  it("errorMessage is null initially", () => {
    const { result } = renderHook(() => useRegistration(), {
      wrapper: createWrapper(),
    });
    expect(result.current.errorMessage).toBeNull();
  });

  it("shows validation error when firstName is empty", async () => {
    const { result } = renderHook(() => useRegistration(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.setFieldValue("firstName", "");
    });
    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(result.current.formik.errors.firstName).toBe(
        "First name is required",
      );
    });
  });

  it("shows validation error when lastName is empty", async () => {
    const { result } = renderHook(() => useRegistration(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.setFieldValue("lastName", "");
    });
    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(result.current.formik.errors.lastName).toBe(
        "Last name is required",
      );
    });
  });

  it("shows validation error when email is empty", async () => {
    const { result } = renderHook(() => useRegistration(), {
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

  it("shows validation error when email is invalid", async () => {
    const { result } = renderHook(() => useRegistration(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.setFieldValue("email", "bad-email");
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
    const { result } = renderHook(() => useRegistration(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.setFieldValue("password", "");
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

  it("shows validation error when agreement is false", async () => {
    const { result } = renderHook(() => useRegistration(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.setFieldValue("agreement", false);
    });
    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(result.current.formik.errors.agreement).toBe(
        "You must agree to the terms",
      );
    });
  });

  it("calls register mutation on valid submit", async () => {
    mockRegister.mockResolvedValue({ userId: "user-1", role: "user" });

    const { result } = renderHook(() => useRegistration(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        email: "john@example.com",
        firstName: "John",
        lastName: "Doe",
        password: "Password1@",
      });
    });
  });

  it("calls setEmail on valid submit", async () => {
    mockRegister.mockResolvedValue({ userId: "user-1", role: "user" });

    const { result } = renderHook(() => useRegistration(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(setEmailMock).toHaveBeenCalledWith("john@example.com");
    });
  });

  it("calls setFirstName and setLastName on valid submit", async () => {
    mockRegister.mockResolvedValue({ userId: "user-1", role: "user" });

    const { result } = renderHook(() => useRegistration(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(setFirstNameMock).toHaveBeenCalledWith("John");
      expect(setLastNameMock).toHaveBeenCalledWith("Doe");
    });
  });

  it("navigates to email verification on success", async () => {
    mockRegister.mockResolvedValue({ userId: "user-1", role: "user" });

    const { result } = renderHook(() => useRegistration(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith({ to: "/auth/verify-email" });
    });
  });

  it("clears signup form on success", async () => {
    mockRegister.mockResolvedValue({ userId: "user-1", role: "user" });

    const { result } = renderHook(() => useRegistration(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(clearSignupFormMock).toHaveBeenCalled();
    });
  });

  it("shows success toast on register success", async () => {
    mockRegister.mockResolvedValue({ userId: "user-1", role: "user" });

    const { result } = renderHook(() => useRegistration(), {
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

  it("shows error toast on register failure", async () => {
    mockRegister.mockRejectedValue(new Error("Email already exists"));

    const { result } = renderHook(() => useRegistration(), {
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

  it("sets errorMessage on register failure", async () => {
    mockRegister.mockRejectedValue(new Error("Email already exists"));

    const { result } = renderHook(() => useRegistration(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(result.current.errorMessage).toBe("Email already exists");
    });
  });
});
