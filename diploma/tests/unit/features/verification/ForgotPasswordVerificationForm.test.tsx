import { ForgotPasswordVerificationForm } from "@features/verification";
import { render, screen } from "@testing-library/react";

const { verificationMock } = vi.hoisted(() => ({
  verificationMock: {
    formik: {
      values: { code: "", userId: undefined },
      errors: {} as Record<string, string>,
      submitCount: 0,
      handleSubmit: vi.fn((e) => e.preventDefault()),
      setFieldValue: vi.fn(),
    },
    isLoading: false,
    errorMessage: null as string | null,
  },
}));

vi.mock(
  "@features/verification/verification-base-form",
  async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...(actual as object),
      useVerification: () => verificationMock,
      VerificationForm: ({ formik, verificationError, children }: any) => (
        <form data-testid="verification-form" onSubmit={formik.handleSubmit}>
          <input data-testid="otp-input" />
          {verificationError && (
            <span data-testid="verification-error">{verificationError}</span>
          )}
          {children}
        </form>
      ),
    };
  },
);

vi.mock("@features/verification/resend-code", () => ({
  ResendCodeButton: ({ email }: any) => (
    <button data-testid="resend-button" type="button">
      Resend ({email})
    </button>
  ),
}));

vi.mock("@entities/user", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useAuthStore: (selector?: (s: any) => any) => {
      const state = {
        otpTimers: {},
        resetOtpTimer: vi.fn(),
        decrementOtpTimer: vi.fn(),
        emailForgotPassword: "user@example.com",
      };
      return selector ? selector(state) : state;
    },
  };
});

vi.mock(
  "@features/verification/forgot-password-verification-form/api/verificationForgotPasswordApi",
  () => ({
    verificationForgotPassword: vi.fn(),
  }),
);

vi.mock("@shared/routes", () => ({
  AuthRoutes: {
    forgotPassword: { setPassword: "/auth/forgot-password/set-password" },
  },
}));

vi.mock("@shared/ui/buttons", () => ({
  BaseButtonWrapper: ({ children, loading }: any) => (
    <button data-testid="confirm-button" disabled={loading} type="submit">
      {loading ? "Loading..." : children}
    </button>
  ),
}));

describe("ForgotPasswordVerificationForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    verificationMock.isLoading = false;
    verificationMock.errorMessage = null;
    verificationMock.formik.submitCount = 0;
    verificationMock.formik.errors = {};
    verificationMock.formik.handleSubmit = vi.fn((e) => e.preventDefault());
  });

  it("renders verification form", () => {
    render(<ForgotPasswordVerificationForm />);
    expect(screen.getByTestId("verification-form")).toBeInTheDocument();
  });

  it("renders resend button with correct email", () => {
    render(<ForgotPasswordVerificationForm />);
    expect(screen.getByTestId("resend-button")).toHaveTextContent(
      "user@example.com",
    );
  });

  it("renders confirm button", () => {
    render(<ForgotPasswordVerificationForm />);
    expect(screen.getByTestId("confirm-button")).toHaveTextContent("Confirm");
  });

  it("shows loading state on confirm button", () => {
    verificationMock.isLoading = true;
    render(<ForgotPasswordVerificationForm />);
    expect(screen.getByTestId("confirm-button")).toBeDisabled();
  });

  it("shows error message when errorMessage is set", () => {
    verificationMock.errorMessage = "Invalid code";
    render(<ForgotPasswordVerificationForm />);
    expect(screen.getByTestId("verification-error")).toHaveTextContent(
      "Invalid code",
    );
  });

  it("does not show error message when errorMessage is null", () => {
    render(<ForgotPasswordVerificationForm />);
    expect(screen.queryByTestId("verification-error")).not.toBeInTheDocument();
  });
});
