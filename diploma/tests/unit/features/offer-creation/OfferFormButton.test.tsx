import { OfferFormButton } from "@features/time-bank";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const { storeMock } = vi.hoisted(() => ({
  storeMock: {
    isOpen: false,
    data: {
      id: null as string | null,
    },
    open: vi.fn(),
    close: vi.fn(),
  },
}));

vi.mock("@entities/offer", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useOfferFormStore: (selector?: (s: any) => any) =>
      selector ? selector(storeMock) : storeMock,
  };
});

vi.mock("@features/offer-form/main/ui/main-form/OfferFormModal", () => ({
  OfferFormModal: ({ isOpen, isEdit }: any) =>
    isOpen ? (
      <div data-testid="offer-modal">
        {isEdit ? "Edit Modal" : "Create Modal"}
      </div>
    ) : null,
}));

vi.mock("@shared/ui/buttons", () => ({
  BaseButtonWrapper: ({ children, onClick }: any) => (
    <button data-testid="offer-button" onClick={onClick}>
      {children}
    </button>
  ),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children }: any) => <div>{children}</div>,
  },
}));

vi.mock("@shared/assets/icons/actions", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    EditIcon: () => <span data-testid="edit-icon" />,
    PlusIcon: "plus-icon.svg",
  };
});

describe("OfferFormButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    storeMock.isOpen = false;
    storeMock.data = { id: null };
  });

  it("renders create button by default", () => {
    render(<OfferFormButton />);
    expect(screen.getByTestId("offer-button")).toHaveTextContent(
      "Create new offer",
    );
  });

  it("renders edit button when isEdit is true", () => {
    render(<OfferFormButton isEdit />);
    expect(screen.getByTestId("offer-button")).toHaveTextContent("Edit");
    expect(screen.getByTestId("edit-icon")).toBeInTheDocument();
  });

  it("does not show modal initially", () => {
    render(<OfferFormButton />);
    expect(screen.queryByTestId("offer-modal")).not.toBeInTheDocument();
  });

  it("calls open with initialValues on button click", async () => {
    const user = userEvent.setup();
    const initialValues = { id: "offer-1", title: "Test" };
    render(<OfferFormButton initialValues={initialValues} />);
    await user.click(screen.getByTestId("offer-button"));
    expect(storeMock.open).toHaveBeenCalledWith(initialValues);
  });

  it("shows modal when isOpen and id matches", () => {
    storeMock.isOpen = true;
    storeMock.data = { id: "offer-1" };
    render(<OfferFormButton initialValues={{ id: "offer-1" }} />);
    expect(screen.getByTestId("offer-modal")).toBeInTheDocument();
  });

  it("does not show modal when id does not match", () => {
    storeMock.isOpen = true;
    storeMock.data = { id: "offer-2" };
    render(<OfferFormButton initialValues={{ id: "offer-1" }} />);
    expect(screen.queryByTestId("offer-modal")).not.toBeInTheDocument();
  });

  it("shows create modal when no initialValues and store id is null", () => {
    storeMock.isOpen = true;
    storeMock.data = { id: null };
    render(<OfferFormButton />);
    expect(screen.getByTestId("offer-modal")).toBeInTheDocument();
  });
});
