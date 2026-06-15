import { render, screen } from "@testing-library/react";
import { TRANSACTION_TYPE_CONFIG } from "@entities/offer/config/transactionTypeConfig";
import type { TimeTransaction, TransactionType } from "@entities/offer/model";
import { TransactionListItem } from "@entities/offer";

vi.mock("@shared/assets/icons/actions", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    GiftIcon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg data-testid="icon-gift" {...props} />
    ),
  };
});

vi.mock("@shared/assets/icons/info", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    AttendanceCalendarIcon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg data-testid="icon-attendance" {...props} />
    ),
    LockIcon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg data-testid="icon-lock" {...props} />
    ),
    AdminAdjustmentIcon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg data-testid="icon-admin" {...props} />
    ),
    TimeSpendIcon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg data-testid="icon-timespend" {...props} />
    ),
  };
});

const makeTransaction = (
  overrides: Partial<TimeTransaction> = {},
): TimeTransaction => ({
  id: "tx-1",
  type: "earn",
  sourceType: "eventAttendance",
  amountMinutes: 60,
  balanceAfterMinutes: 120,
  ...overrides,
});

describe("TransactionListItem — label and comment", () => {
  it("renders config label when comment is absent", () => {
    render(
      <TransactionListItem transaction={makeTransaction({ type: "earn" })} />,
    );
    expect(screen.getAllByText("Earned").length).toBeGreaterThan(0);
  });

  it("renders comment as title when provided", () => {
    render(
      <TransactionListItem
        transaction={makeTransaction({ comment: "Bonus for event" })}
      />,
    );
    expect(screen.getByText("Bonus for event")).toBeInTheDocument();
  });

  it("still renders label badge even when comment overrides title", () => {
    render(
      <TransactionListItem
        transaction={makeTransaction({ type: "earn", comment: "Bonus" })}
      />,
    );
    expect(screen.getByText("Bonus")).toBeInTheDocument();
    expect(screen.getByText("Earned")).toBeInTheDocument();
  });
});

describe("TransactionListItem — amount sign and color", () => {
  const positiveTypes: TransactionType[] = [
    "earn",
    "reservationRelease",
    "adminAdjustmentPlus",
    "giftIn",
  ];

  const negativeTypes: TransactionType[] = [
    "spend",
    "adminAdjustmentMinus",
    "giftOut",
  ];

  it.each(positiveTypes)("shows + prefix for %s", (type) => {
    render(<TransactionListItem transaction={makeTransaction({ type })} />);
    expect(screen.getByText(/^\+\d+m$/)).toBeInTheDocument();
  });

  it.each(negativeTypes)("shows - prefix for %s", (type) => {
    render(<TransactionListItem transaction={makeTransaction({ type })} />);
    expect(screen.getByText(/^-\d+m$/)).toBeInTheDocument();
  });

  it("shows - prefix for reservation", () => {
    render(
      <TransactionListItem
        transaction={makeTransaction({ type: "reservation" })}
      />,
    );
    expect(screen.getByText(/^-\d+m$/)).toBeInTheDocument();
  });

  it("applies green color for positive type", () => {
    render(
      <TransactionListItem transaction={makeTransaction({ type: "earn" })} />,
    );
    expect(screen.getByText(/^\+\d+m$/)).toHaveStyle({ color: "#3d995f" });
  });

  it("applies red color for negative type", () => {
    render(
      <TransactionListItem transaction={makeTransaction({ type: "spend" })} />,
    );
    expect(screen.getByText(/^-\d+m$/)).toHaveStyle({ color: "#a80b0b" });
  });

  it("applies amber color for reservation (neutral)", () => {
    render(
      <TransactionListItem
        transaction={makeTransaction({ type: "reservation" })}
      />,
    );
    expect(screen.getByText(/^-\d+m$/)).toHaveStyle({ color: "#b87c00" });
  });

  it("renders absolute amount regardless of sign", () => {
    render(
      <TransactionListItem
        transaction={makeTransaction({ type: "spend", amountMinutes: 30 })}
      />,
    );
    expect(screen.getByText("-30m")).toBeInTheDocument();
  });
});

describe("TransactionListItem — balance", () => {
  it("renders balance after minutes", () => {
    render(
      <TransactionListItem
        transaction={makeTransaction({ balanceAfterMinutes: 200 })}
      />,
    );
    expect(screen.getByText("Balance: 200m")).toBeInTheDocument();
  });
});

describe("TransactionListItem — source icon", () => {
  it("renders attendance icon for eventAttendance", () => {
    render(
      <TransactionListItem
        transaction={makeTransaction({ sourceType: "eventAttendance" })}
      />,
    );
    expect(screen.getByTestId("icon-attendance")).toBeInTheDocument();
  });

  it("renders lock icon for priorityReservation", () => {
    render(
      <TransactionListItem
        transaction={makeTransaction({ sourceType: "priorityReservation" })}
      />,
    );
    expect(screen.getByTestId("icon-lock")).toBeInTheDocument();
  });

  it("renders admin icon for adminAdjustment", () => {
    render(
      <TransactionListItem
        transaction={makeTransaction({ sourceType: "adminAdjustment" })}
      />,
    );
    expect(screen.getByTestId("icon-admin")).toBeInTheDocument();
  });

  it("renders gift icon for gift", () => {
    render(
      <TransactionListItem
        transaction={makeTransaction({ sourceType: "gift" })}
      />,
    );
    expect(screen.getByTestId("icon-gift")).toBeInTheDocument();
  });

  it("renders timespend icon for timeSpend", () => {
    render(
      <TransactionListItem
        transaction={makeTransaction({ sourceType: "timeSpend" })}
      />,
    );
    expect(screen.getByTestId("icon-timespend")).toBeInTheDocument();
  });
});

describe("TransactionListItem — wrapper color per type", () => {
  const types = Object.keys(TRANSACTION_TYPE_CONFIG) as TransactionType[];

  it.each(types)("applies correct wrapperColor for %s", (type) => {
    const { wrapperColor } = TRANSACTION_TYPE_CONFIG[type];
    const { container } = render(
      <TransactionListItem transaction={makeTransaction({ type })} />,
    );
    const iconWrapper = container.querySelector('[class*="iconWrapper"]');
    expect(iconWrapper).toHaveStyle({ background: wrapperColor });
  });
});
