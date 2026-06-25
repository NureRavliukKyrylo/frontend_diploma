import { Avatar } from "@shared/ui";
import { render, screen } from "@testing-library/react";

vi.mock("@shared/libs/avatar", () => ({
  getAvatarColor: vi.fn(() => ({ bg: "#ff0000", text: "#ffffff" })),
}));

vi.mock("@shared/assets/images/user", () => ({
  DefaultAvatar: "/default-avatar.png",
}));

vi.mock("./Avatar.module.scss", () => ({
  default: {
    avatar: "avatar",
    circle: "circle",
    rounded: "rounded",
    square: "square",
    initialsVariant: "initialsVariant",
    image: "image",
    initials: "initials",
  },
}));

describe("Avatar", () => {
  describe("image variant", () => {
    it("renders image when src is provided", () => {
      render(<Avatar src="/photo.jpg" fallback="John Doe" />);
      const img = screen.getByRole("img");
      expect(img).toHaveAttribute("src", "/photo.jpg");
    });

    it("uses fallback as alt text when src and fallback are provided", () => {
      render(<Avatar src="/photo.jpg" fallback="John Doe" />);
      expect(screen.getByRole("img")).toHaveAttribute("alt", "John Doe");
    });

    it("uses 'avatar' as alt text when src is provided without fallback", () => {
      render(<Avatar src="/photo.jpg" />);
      expect(screen.getByRole("img")).toHaveAttribute("alt", "avatar");
    });

    it("does not render initials when src is provided", () => {
      render(<Avatar src="/photo.jpg" fallback="John Doe" />);
      expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });

    it("does not render default avatar when src is provided", () => {
      render(<Avatar src="/photo.jpg" />);
      expect(screen.getByRole("img")).not.toHaveAttribute(
        "src",
        "/default-avatar.png",
      );
    });
  });

  describe("initials variant", () => {
    it("renders initials when fallback is provided without src", () => {
      render(<Avatar fallback="John Doe" />);
      expect(screen.getByRole("heading")).toHaveTextContent("JD");
    });

    it("renders single initial for single word fallback", () => {
      render(<Avatar fallback="John" />);
      expect(screen.getByRole("heading")).toHaveTextContent("J");
    });

    it("renders only first two initials for multi-word fallback", () => {
      render(<Avatar fallback="John Michael Doe" />);
      expect(screen.getByRole("heading")).toHaveTextContent("JM");
    });

    it("renders initials in uppercase", () => {
      render(<Avatar fallback="john doe" />);
      expect(screen.getByRole("heading")).toHaveTextContent("JD");
    });

    it("applies background color from getAvatarColor", () => {
      render(<Avatar fallback="John Doe" />);
      const wrapper = screen.getByRole("heading").parentElement;
      expect(wrapper).toHaveStyle({ backgroundColor: "#ff0000" });
    });

    it("applies text color from getAvatarColor to initials", () => {
      render(<Avatar fallback="John Doe" />);
      expect(screen.getByRole("heading")).toHaveStyle({ color: "#ffffff" });
    });

    it("does not render image element", () => {
      render(<Avatar fallback="John Doe" />);
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it("trims whitespace from fallback before computing initials", () => {
      render(<Avatar fallback="   Jane Doe   " />);
      expect(screen.getByRole("heading")).toHaveTextContent("JD");
    });
  });

  describe("default avatar variant", () => {
    it("renders default avatar when neither src nor fallback is provided", () => {
      render(<Avatar />);
      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        "/default-avatar.png",
      );
    });

    it("renders default avatar when fallback is empty string", () => {
      render(<Avatar fallback="" />);
      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        "/default-avatar.png",
      );
    });

    it("renders placeholder initials heading when fallback is only whitespace", () => {
      render(<Avatar fallback="   " />);
      expect(screen.getByRole("heading")).toHaveTextContent("?");
    });

    it("does not render initials on true default value", () => {
      render(<Avatar />);
      expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });
  });

  describe("shape prop", () => {
    it("applies circle class by default", () => {
      const { container } = render(<Avatar />);
      expect(container.firstChild).toHaveClass("circle");
    });

    it("applies rounded class when shape is rounded", () => {
      const { container } = render(<Avatar shape="rounded" />);
      expect(container.firstChild).toHaveClass("rounded");
    });

    it("applies square class when shape is square", () => {
      const { container } = render(<Avatar shape="square" />);
      expect(container.firstChild).toHaveClass("square");
    });
  });

  describe("className prop", () => {
    it("applies custom className to wrapper", () => {
      const { container } = render(<Avatar className="my-custom-class" />);
      expect(container.firstChild).toHaveClass("my-custom-class");
    });

    it("combines custom className with base classes", () => {
      const { container } = render(<Avatar className="extra" />);
      expect(container.firstChild).toHaveClass("avatar");
      expect(container.firstChild).toHaveClass("extra");
    });
  });

  describe("children prop", () => {
    it("renders children inside wrapper", () => {
      render(
        <Avatar>
          <span data-testid="badge">99</span>
        </Avatar>,
      );
      expect(screen.getByTestId("badge")).toBeInTheDocument();
    });

    it("renders children alongside image", () => {
      render(
        <Avatar src="/photo.jpg">
          <span data-testid="overlay">online</span>
        </Avatar>,
      );
      expect(screen.getByTestId("overlay")).toBeInTheDocument();
      expect(screen.getByRole("img")).toBeInTheDocument();
    });
  });
});
