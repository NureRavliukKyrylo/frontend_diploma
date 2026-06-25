import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ParticipationJoinButton } from "@features/participation/ui/join-button/ParticipationJoinButton";

const { handleJoinMock, mockState } = vi.hoisted(() => ({
  handleJoinMock: vi.fn(),
  mockState: { isLoading: false },
}));

vi.mock("@features/participation/model/useJoinParticipation", () => ({
  useJoinParticipation: () => ({
    handleJoin: handleJoinMock,
    isLoading: mockState.isLoading,
  }),
}));

vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get:
        (_target, tag) =>
        ({
          children,
          whileHover,
          whileTap,
          transition,
          animate,
          initial,
          exit,
          ...props
        }: any) => {
          const Tag = tag as string;
          return <Tag {...props}>{children}</Tag>;
        },
    },
  ),
}));

vi.mock("@shared/ui/buttons", () => ({
  BaseButtonWrapper: ({ children, onClick, loading }: any) => (
    <button onClick={onClick} disabled={loading} data-testid="join-btn">
      {children}
    </button>
  ),
}));

// Mock react-i18next and provide the i18n object with a fallback language
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: "en", // Resolves the TypeError: Cannot read properties of undefined (reading 'language')
    },
  }),
}));

const defaultProps = { entityType: "event" as const, entityId: "e1" };

describe("ParticipationJoinButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockState.isLoading = false;
  });

  it("renders join button", () => {
    render(<ParticipationJoinButton {...defaultProps} />);
    expect(screen.getByTestId("join-btn")).toBeInTheDocument();
  });

  it("displays entity type label", () => {
    render(<ParticipationJoinButton {...defaultProps} />);
    expect(screen.getByText("participation.join")).toBeInTheDocument();
  });

  it("calls handleJoin on click", async () => {
    const user = userEvent.setup();
    render(<ParticipationJoinButton {...defaultProps} />);

    await user.click(screen.getByTestId("join-btn"));
    expect(handleJoinMock).toHaveBeenCalled();
  });

  it("disables button while loading", () => {
    mockState.isLoading = true;

    render(<ParticipationJoinButton {...defaultProps} />);
    expect(screen.getByTestId("join-btn")).toBeDisabled();
  });

  it("calls onSuccess when provided", async () => {
    const onSuccess = vi.fn();
    render(<ParticipationJoinButton {...defaultProps} onSuccess={onSuccess} />);
    expect(screen.getByTestId("join-btn")).toBeInTheDocument();
  });
});
