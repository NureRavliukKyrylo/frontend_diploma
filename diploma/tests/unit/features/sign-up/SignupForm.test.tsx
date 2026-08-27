import { SignUpForm } from "@features/auth";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const setSignUpEmailMock = vi.fn();
const setSignUpPasswordMock = vi.fn();
const setSignFirstNameMock = vi.fn();
const setSignLastNameMock = vi.fn();
const setAgreementMock = vi.fn();

const { registrationMock } = vi.hoisted(() => ({
  registrationMock: {
    formik: {
      values: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        agreement: false,
      },
      errors: {} as Record<string, string>,
      submitCount: 0,
      handleChange: vi.fn(),
      handleSubmit: vi.fn((e) => e.preventDefault()),
    },
    isLoading: false,
    errorMessage: null as string | null,
  },
}));

vi.mock("@features/auth/signup-form/model/useRegistration", () => ({
  useRegistration: () => registrationMock,
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "register.title": "Create an account",
        "register.firstNamePlaceholder": "Enter first name",
        "register.lastNamePlaceholder": "Enter last name",
        "register.submit": "Create an account",
      };
      return translations[key] || key;
    },
  }),
}));

vi.mock("@entities/user", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useAuthStore: (selector?: (s: any) => any) => {
      const state = {
        setSignUpEmail: setSignUpEmailMock,
        setSignUpPassword: setSignUpPasswordMock,
        setSignFirstName: setSignFirstNameMock,
        setSignLastName: setSignLastNameMock,
        setAgreement: setAgreementMock,
      };
      return selector ? selector(state) : state;
    },
  };
});

vi.mock("@shared/ui/inputs", () => ({
  BaseInput: ({ value, onChange, error, label }: any) => (
    <div>
      <label>{label}</label>
      <input data-testid={`input-${label}`} value={value} onChange={onChange} />
      {error && <span data-testid={`error-${label}`}>{error}</span>}
    </div>
  ),
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
  Checkbox: ({ children, onChange, checked, error }: any) => (
    <div>
      <label>
        <input
          data-testid="agreement-checkbox"
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        {children}
      </label>
      {error && <span data-testid="agreement-error">{error}</span>}
    </div>
  ),
}));

vi.mock("@shared/ui/buttons", () => ({
  BaseButtonWrapper: ({ children, loading }: any) => (
    <button data-testid="submit-button" disabled={loading} type="submit">
      {loading ? "Loading..." : children}
    </button>
  ),
}));

describe("SignUpForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    registrationMock.isLoading = false;
    registrationMock.errorMessage = null;
    registrationMock.formik.submitCount = 0;
    registrationMock.formik.errors = {};
    registrationMock.formik.handleChange = vi.fn();
    registrationMock.formik.handleSubmit = vi.fn((e) => e.preventDefault());
  });

  it("renders heading", () => {
    render(<SignUpForm />);
    expect(
      screen.getByRole("heading", { name: "Create an account" }),
    ).toBeInTheDocument();
  });

  it("renders first name input", () => {
    render(<SignUpForm />);
    expect(screen.getByTestId("input-Enter first name")).toBeInTheDocument();
  });

  it("renders last name input", () => {
    render(<SignUpForm />);
    expect(screen.getByTestId("input-Enter last name")).toBeInTheDocument();
  });

  it("renders email input", () => {
    render(<SignUpForm />);
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
  });

  it("renders password input", () => {
    render(<SignUpForm />);
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
  });

  it("renders agreement checkbox", () => {
    render(<SignUpForm />);
    expect(screen.getByTestId("agreement-checkbox")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<SignUpForm />);
    expect(screen.getByTestId("submit-button")).toHaveTextContent(
      "Create an account",
    );
  });

  it("calls handleSubmit on form submit", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);
    await user.click(screen.getByTestId("submit-button"));
    expect(registrationMock.formik.handleSubmit).toHaveBeenCalled();
  });

  it("shows loading state on submit button", () => {
    registrationMock.isLoading = true;
    render(<SignUpForm />);
    expect(screen.getByTestId("submit-button")).toBeDisabled();
  });

  it("does not show error message when errorMessage is null", () => {
    render(<SignUpForm />);
    expect(screen.queryByText(/errorMessage/)).not.toBeInTheDocument();
  });

  it("shows error message when errorMessage is set", () => {
    registrationMock.errorMessage = "Email already exists";
    render(<SignUpForm />);
    expect(screen.getByText("Email already exists")).toBeInTheDocument();
  });

  it("shows first name validation error after submit", () => {
    registrationMock.formik.submitCount = 1;
    registrationMock.formik.errors = { firstName: "First name is required" };
    render(<SignUpForm />);
    expect(screen.getByTestId("error-Enter first name")).toBeInTheDocument();
  });

  it("shows last name validation error after submit", () => {
    registrationMock.formik.submitCount = 1;
    registrationMock.formik.errors = { lastName: "Last name is required" };
    render(<SignUpForm />);
    expect(screen.getByTestId("error-Enter last name")).toBeInTheDocument();
  });

  it("shows email validation error after submit", () => {
    registrationMock.formik.submitCount = 1;
    registrationMock.formik.errors = { email: "Email is required" };
    render(<SignUpForm />);
    expect(screen.getByTestId("email-error")).toBeInTheDocument();
  });

  it("shows password validation error after submit", () => {
    registrationMock.formik.submitCount = 1;
    registrationMock.formik.errors = { password: "Password is required" };
    render(<SignUpForm />);
    expect(screen.getByTestId("password-error")).toBeInTheDocument();
  });

  it("shows agreement validation error after submit", () => {
    registrationMock.formik.submitCount = 1;
    registrationMock.formik.errors = {
      agreement: "You must agree to the terms",
    };
    render(<SignUpForm />);
    expect(screen.getByTestId("agreement-error")).toBeInTheDocument();
  });
});
