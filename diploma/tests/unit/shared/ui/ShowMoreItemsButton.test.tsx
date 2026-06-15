import { ShowMoreItemsButton } from "@shared/ui/buttons";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const makeItems = (count: number) =>
  Array.from({ length: count }, (_, i) => (
    <span key={i} data-testid={`item-${i}`}>
      Item {i}
    </span>
  ));

describe("ShowMoreItemsButton", () => {
  describe("rendering", () => {
    it("renders all items when count is within initialVisibleCount", () => {
      render(
        <ShowMoreItemsButton items={makeItems(4)} initialVisibleCount={6} />,
      );
      expect(screen.getAllByTestId(/^item-/)).toHaveLength(4);
    });

    it("renders only initialVisibleCount items when there are more", () => {
      render(
        <ShowMoreItemsButton items={makeItems(10)} initialVisibleCount={6} />,
      );
      expect(screen.getAllByTestId(/^item-/)).toHaveLength(6);
    });

    it("renders all items when count equals initialVisibleCount", () => {
      render(
        <ShowMoreItemsButton items={makeItems(6)} initialVisibleCount={6} />,
      );
      expect(screen.getAllByTestId(/^item-/)).toHaveLength(6);
    });

    it("applies className to container", () => {
      const { container } = render(
        <ShowMoreItemsButton items={makeItems(2)} className="custom-wrap" />,
      );
      expect(container.firstChild).toHaveClass("showMoreContainer");
      expect(container.firstChild).toHaveClass("custom-wrap");
    });

    it("applies classNameItems to items list", () => {
      const { container } = render(
        <ShowMoreItemsButton
          items={makeItems(2)}
          classNameItems="custom-list"
        />,
      );
      expect(container.querySelector(".itemsList")).toHaveClass("custom-list");
    });
  });

  describe("show more button visibility", () => {
    it("does not render button when items fit within initialVisibleCount", () => {
      render(
        <ShowMoreItemsButton items={makeItems(3)} initialVisibleCount={6} />,
      );
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("renders button when items exceed initialVisibleCount", () => {
      render(
        <ShowMoreItemsButton items={makeItems(8)} initialVisibleCount={6} />,
      );
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("does not render button when count equals initialVisibleCount", () => {
      render(
        <ShowMoreItemsButton items={makeItems(6)} initialVisibleCount={6} />,
      );
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("hides button after it is clicked", async () => {
      const user = userEvent.setup();
      render(
        <ShowMoreItemsButton items={makeItems(8)} initialVisibleCount={6} />,
      );
      await user.click(screen.getByRole("button"));
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });

  describe("button content", () => {
    it("renders default 'Show more' text", () => {
      render(<ShowMoreItemsButton items={makeItems(8)} />);
      expect(screen.getByRole("button")).toHaveTextContent("Show more");
    });

    it("renders custom buttonContent string", () => {
      render(
        <ShowMoreItemsButton items={makeItems(8)} buttonContent="Load more" />,
      );
      expect(screen.getByRole("button")).toHaveTextContent("Load more");
    });

    it("renders custom buttonContent node", () => {
      render(
        <ShowMoreItemsButton
          items={makeItems(8)}
          buttonContent={<span data-testid="custom-btn">→ More</span>}
        />,
      );
      expect(screen.getByTestId("custom-btn")).toBeInTheDocument();
    });

    it("applies classNameButton to button", () => {
      render(
        <ShowMoreItemsButton items={makeItems(8)} classNameButton="my-btn" />,
      );
      expect(screen.getByRole("button")).toHaveClass("showMoreButton");
      expect(screen.getByRole("button")).toHaveClass("my-btn");
    });

    it("button has type='button'", () => {
      render(<ShowMoreItemsButton items={makeItems(8)} />);
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });
  });

  describe("expand interaction", () => {
    it("shows all items after clicking show more", async () => {
      const user = userEvent.setup();
      render(
        <ShowMoreItemsButton items={makeItems(10)} initialVisibleCount={4} />,
      );
      expect(screen.getAllByTestId(/^item-/)).toHaveLength(4);
      await user.click(screen.getByRole("button"));
      expect(screen.getAllByTestId(/^item-/)).toHaveLength(10);
    });

    it("does not toggle back to collapsed on a second render", async () => {
      const user = userEvent.setup();
      render(
        <ShowMoreItemsButton items={makeItems(10)} initialVisibleCount={4} />,
      );
      await user.click(screen.getByRole("button"));
      // Button is gone — all items remain visible, no way to re-collapse
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
      expect(screen.getAllByTestId(/^item-/)).toHaveLength(10);
    });
  });

  describe("buttonPosition prop", () => {
    it("renders button inside items list when position is 'inline' (default)", () => {
      const { container } = render(
        <ShowMoreItemsButton items={makeItems(8)} buttonPosition="inline" />,
      );
      const list = container.querySelector(".itemsList");
      expect(list).toContainElement(screen.getByRole("button"));
    });

    it("renders button outside items list when position is 'below'", () => {
      const { container } = render(
        <ShowMoreItemsButton items={makeItems(8)} buttonPosition="below" />,
      );
      const list = container.querySelector(".itemsList");
      expect(list).not.toContainElement(screen.getByRole("button"));
      expect(container.querySelector(".showMoreContainer")).toContainElement(
        screen.getByRole("button"),
      );
    });

    it("does not render button in list when position is 'below'", () => {
      const { container } = render(
        <ShowMoreItemsButton items={makeItems(8)} buttonPosition="below" />,
      );
      const list = container.querySelector(".itemsList");
      expect(list?.querySelector("button")).toBeNull();
    });
  });
});
