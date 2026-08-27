import { LoginForm } from "@features/auth";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const setLoginEmailMock = vi.fn();
const setLoginPasswordMock = vi.fn();
const setRememberMeMock = vi.fn();

const { loginMock } = vi.hoisted(() => ({
  loginMock: {
    formik: {
      values: { email: "", password: "", rememberMe: false },
      errors: {} as Record<string, string>,
      submitCount: 0,
      handleChange: vi.fn(),
      handleSubmit: vi.fn((e) => e.preventDefault()),
    },
    isLoading: false,
    errorMessage: null as string | null,
  },
}));

vi.mock("@features/auth/login-form/model/useLogin", () => ({
  useLogin: () => loginMock,
}));

vi.mock("@entities/user", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useAuthStore: (selector?: (s: any) => any) => {
      const state = {
        setLoginEmail: setLoginEmailMock,
        setLoginPassword: setLoginPasswordMock,
        setRememberMe: setRememberMeMock,
      };
      return selector ? selector(state) : state;
    },
  };
});

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

vi.mock("@shared/routes", () => ({
  AuthRoutes: {
    forgotPassword: { root: "/auth/forgot-password" },
  },
}));

vi.mock("@shared/ui/inputs", () => ({
  EmailInput: ({ value, onChange, error, label }: any) => (
    <div>
      <label>{label}</label>
      <input data-testid="email-input" value={value} onChange={onChange} />
      {error && <span data-testid="email-error">{error}</span>}
    </div>
  ),
  PasswordInput: ({ value, onChange, error, label }: any) => (
    <div>
      <label>{label}</label>
      <input
        data-testid="password-input"
        type="password"
        value={value}
        onChange={onChange}
      />
      {error && <span data-testid="password-error">{error}</span>}
    </div>
  ),
  Checkbox: ({ children, onChange, checked }: any) => (
    <label>
      <input
        data-testid="remember-me"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      {children}
    </label>
  ),
}));

vi.mock("@shared/ui/buttons", () => ({
  BaseButtonWrapper: ({ children, loading }: any) => (
    <button data-testid="submit-button" disabled={loading} type="submit">
      {loading ? "Loading..." : children}
    </button>
  ),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    loginMock.isLoading = false;
    loginMock.errorMessage = null;
    loginMock.formik.submitCount = 0;
    loginMock.formik.errors = {};
    loginMock.formik.handleChange = vi.fn();
    loginMock.formik.handleSubmit = vi.fn((e) => e.preventDefault());
  });

  it("renders heading", () => {
    render(<LoginForm />);
    expect(screen.getByText("login.title")).toBeInTheDocument();
  });

  it("renders email input", () => {
    render(<LoginForm />);
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
  });

  it("renders password input", () => {
    render(<LoginForm />);
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
  });

  it("renders remember me checkbox", () => {
    render(<LoginForm />);
    expect(screen.getByTestId("remember-me")).toBeInTheDocument();
  });

  it("renders forgot password link", () => {
    render(<LoginForm />);
    expect(screen.getByText("login.forgotPassword")).toHaveAttribute(
      "href",
      "/auth/forgot-password",
    );
  });

  it("renders submit button", () => {
    render(<LoginForm />);
    expect(screen.getByTestId("submit-button")).toHaveTextContent(
      "login.signIn",
    );
  });

  it("calls handleSubmit on form submit", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    await user.click(screen.getByTestId("submit-button"));
    expect(loginMock.formik.handleSubmit).toHaveBeenCalled();
  });

  it("shows loading state on submit button", () => {
    loginMock.isLoading = true;
    render(<LoginForm />);
    expect(screen.getByTestId("submit-button")).toBeDisabled();
  });

  it("does not show error message when errorMessage is null", () => {
    render(<LoginForm />);
    expect(screen.queryByText(/errorMessage/)).not.toBeInTheDocument();
  });

  it("shows email validation error after submit", () => {
    loginMock.formik.submitCount = 1;
    loginMock.formik.errors = { email: "Email is required" };
    render(<LoginForm />);
    expect(screen.getByTestId("email-error")).toBeInTheDocument();
  });

  it("shows password validation error after submit", () => {
    loginMock.formik.submitCount = 1;
    loginMock.formik.errors = { password: "Password is required" };
    render(<LoginForm />);
    expect(screen.getByTestId("password-error")).toBeInTheDocument();
  });
});
