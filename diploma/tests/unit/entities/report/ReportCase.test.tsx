import { ReportCaseItem, type ReportCase } from "@entities/report";
import { render, screen } from "@testing-library/react";

vi.mock("@shared/ui", () => ({
  Avatar: ({ fallback, src }: { fallback?: string; src?: string }) => (
    <img src={src} alt={fallback} />
  ),
}));
vi.mock("@shared/assets/icons/info", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    OnlineIcon: ({ className }: { className?: string }) => (
      <span data-testid="status-icon" className={className} />
    ),
  };
});

vi.mock("@entities/user", () => ({
  getFullName: (first: string, last: string) => `${first} ${last}`,
}));

vi.mock("@shared/libs/text", () => ({
  capitalize: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
}));

const makeReportCase = (overrides: Partial<ReportCase> = {}): ReportCase => ({
  id: "case-1",
  status: "open",
  subjectType: "user",
  reporterUser: {
    id: "user-1",
    firstName: "John",
    lastName: "Doe",
    avatarUrl: "https://example.com/avatar.png",
  },
  relatedReported: {
    id: "user-2",
    firstName: "Jane",
    lastName: "Smith",
    avatarUrl: "https://example.com/avatar2.png",
  },
  createdAt: "2024-01-01T10:00:00Z",
  reason: "spam",
  subjectId: "subject-1",
  details: "This is spam content",
  resolvedAt: "",
  ...overrides,
});

describe("ReportCaseItem", () => {
  it("renders reporter full name", () => {
    render(<ReportCaseItem reportCase={makeReportCase()} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders avatar with correct src and fallback", () => {
    render(<ReportCaseItem reportCase={makeReportCase()} />);
    const avatar = screen.getByAltText("John Doe");
    expect(avatar).toHaveAttribute("src", "https://example.com/avatar.png");
  });

  it("renders reason pill", () => {
    render(
      <ReportCaseItem reportCase={makeReportCase({ reason: "harassment" })} />,
    );
    expect(screen.getByText("Harassment")).toBeInTheDocument();
  });

  it("renders subjectType pill", () => {
    render(
      <ReportCaseItem
        reportCase={makeReportCase({ subjectType: "organization" })}
      />,
    );
    expect(screen.getByText("organization")).toBeInTheDocument();
  });

  it("renders details text", () => {
    render(
      <ReportCaseItem
        reportCase={makeReportCase({ details: "Repeated spam posts" })}
      />,
    );
    expect(screen.getByText("Repeated spam posts")).toBeInTheDocument();
  });

  it("renders status icon", () => {
    render(<ReportCaseItem reportCase={makeReportCase()} />);
    expect(screen.getByTestId("status-icon")).toBeInTheDocument();
  });

  it("renders capitalized open status", () => {
    render(<ReportCaseItem reportCase={makeReportCase({ status: "open" })} />);
    expect(screen.getByText("Open")).toBeInTheDocument();
  });

  it("renders capitalized resolved status", () => {
    render(
      <ReportCaseItem reportCase={makeReportCase({ status: "resolved" })} />,
    );
    expect(screen.getByText("Resolved")).toBeInTheDocument();
  });

  it("renders capitalized rejected status", () => {
    render(
      <ReportCaseItem reportCase={makeReportCase({ status: "rejected" })} />,
    );
    expect(screen.getByText("Rejected")).toBeInTheDocument();
  });

  it("applies status class to wrapper for open", () => {
    const { container } = render(
      <ReportCaseItem reportCase={makeReportCase({ status: "open" })} />,
    );
    expect(container.firstChild).toHaveClass("open");
  });

  it("applies status class to wrapper for resolved", () => {
    const { container } = render(
      <ReportCaseItem reportCase={makeReportCase({ status: "resolved" })} />,
    );
    expect(container.firstChild).toHaveClass("resolved");
  });

  it("applies status class to wrapper for rejected", () => {
    const { container } = render(
      <ReportCaseItem reportCase={makeReportCase({ status: "rejected" })} />,
    );
    expect(container.firstChild).toHaveClass("rejected");
  });

  it("applies status class to status pill", () => {
    const { container } = render(
      <ReportCaseItem reportCase={makeReportCase({ status: "resolved" })} />,
    );
    expect(container.querySelector('[class*="statusPill"]')).toHaveClass(
      "resolved",
    );
  });
});
