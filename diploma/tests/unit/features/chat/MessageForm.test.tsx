import { MessageForm } from "@features/chat";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const { formMock } = vi.hoisted(() => ({
  formMock: {
    formik: {
      values: { body: "" },
      errors: {} as Record<string, string>,
      submitCount: 0,
      handleSubmit: vi.fn((e) => e?.preventDefault()),
      handleChange: vi.fn(),
      handleBlur: vi.fn(),
    },
    isLoading: false,
  },
}));

vi.mock("@features/chat/message-form/model/useMessageForm", () => ({
  useMessageForm: () => formMock,
}));

vi.mock("@features/chat/message-form/ui/mention-button/MentionButton", () => ({
  MentionButton: ({ mentionIds }: any) => (
    <button data-testid="mention-button" type="button">
      Mention ({mentionIds.length})
    </button>
  ),
}));

vi.mock("@entities/user", () => ({
  getFullName: (first: string, last: string) => `${first} ${last}`,
}));

vi.mock("@shared/config/constants", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    getMentionColor: () => "#ccc",
  };
});

vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get:
        (_target, tag) =>
        ({ children, ...props }: any) => {
          const Tag = tag as string;
          return <Tag {...props}>{children}</Tag>;
        },
    },
  ),
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

vi.mock("@shared/assets/icons/actions", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    RejectIcon: () => <span data-testid="reject-icon" />,
    SendMessageIcon: () => <span data-testid="send-icon" />,
  };
});

const defaultProps = {
  chatId: "chat-1",
  participants: [],
  hideMentionButton: false,
};

describe("MessageForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    formMock.isLoading = false;
    formMock.formik.values = { body: "" };
    formMock.formik.errors = {};
    formMock.formik.submitCount = 0;
    formMock.formik.handleSubmit = vi.fn((e) => e?.preventDefault());
    formMock.formik.handleChange = vi.fn();
    formMock.formik.handleBlur = vi.fn();
  });

  it("renders textarea", () => {
    render(<MessageForm {...defaultProps} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders mention button", () => {
    render(<MessageForm {...defaultProps} />);
    expect(screen.getByTestId("mention-button")).toBeInTheDocument();
  });

  it("shows send message placeholder when not editing", () => {
    render(<MessageForm {...defaultProps} />);
    expect(
      screen.getByPlaceholderText("chat:form.placeholderSend"),
    ).toBeInTheDocument();
  });

  it("shows edit message placeholder when editing", () => {
    render(
      <MessageForm
        {...defaultProps}
        editingMessage={{ id: "msg-1", content: "Old text" }}
      />,
    );
    expect(
      screen.getByPlaceholderText("chat:form.placeholderEdit"),
    ).toBeInTheDocument();
  });

  it("shows reply banner when replyToMessage is set", () => {
    render(
      <MessageForm
        {...defaultProps}
        replyToMessage={{
          id: "msg-1",
          content: "Original",
          sender: "Alice",
        }}
      />,
    );
    expect(screen.getByText("chat:banners.replying")).toBeInTheDocument();
  });

  it("shows editing banner when editingMessage is set", () => {
    render(
      <MessageForm
        {...defaultProps}
        editingMessage={{ id: "msg-1", content: "Old text" }}
      />,
    );
    expect(screen.getByText("chat:banners.editing")).toBeInTheDocument();
  });

  it("does not show banner when neither replying nor editing", () => {
    render(<MessageForm {...defaultProps} />);
    expect(screen.queryByText("chat:banners.editing")).not.toBeInTheDocument();
    expect(screen.queryByText("chat:banners.replying")).not.toBeInTheDocument();
  });

  it("calls onCancel when banner close is clicked", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();
    render(
      <MessageForm
        {...defaultProps}
        replyToMessage={{ id: "msg-1", content: "Hi", sender: "Bob" }}
        onCancel={onCancel}
      />,
    );
    const closeButtons = screen.getAllByTestId("reject-icon");
    await user.click(closeButtons[0].closest("button")!);
    expect(onCancel).toHaveBeenCalled();
  });

  it("calls handleSubmit on Enter key without Shift", () => {
    formMock.formik.values = { body: "Hello" };
    render(<MessageForm {...defaultProps} />);
    const textarea = screen.getByRole("textbox");
    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: false });
    expect(formMock.formik.handleSubmit).toHaveBeenCalled();
  });

  it("does not submit on Shift+Enter", () => {
    formMock.formik.values = { body: "Hello" };
    render(<MessageForm {...defaultProps} />);
    const textarea = screen.getByRole("textbox");
    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: true });
    expect(formMock.formik.handleSubmit).not.toHaveBeenCalled();
  });

  it("does not submit on Enter when body is blank", () => {
    formMock.formik.values = { body: "   " };
    render(<MessageForm {...defaultProps} />);
    const textarea = screen.getByRole("textbox");
    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: false });
    expect(formMock.formik.handleSubmit).not.toHaveBeenCalled();
  });

  it("renders mentioned participant tags", () => {
    render(
      <MessageForm
        {...defaultProps}
        participants={[
          {
            id: "u1",
            firstName: "Alice",
            lastName: "Smith",
            roleName: "Member",
          },
        ]}
        mentionedUserIds={["u1"]}
      />,
    );
    expect(screen.getByText("@Alice Smith")).toBeInTheDocument();
  });

  it("removes mention tag on click", async () => {
    const user = userEvent.setup();
    render(
      <MessageForm
        {...defaultProps}
        participants={[
          {
            id: "u1",
            firstName: "Alice",
            lastName: "Smith",
            roleName: "Member",
          },
        ]}
        mentionedUserIds={["u1"]}
      />,
    );
    const removeButtons = screen.getAllByTestId("reject-icon");
    await user.click(
      removeButtons[removeButtons.length - 1].closest("button")!,
    );
    expect(screen.queryByText("@Alice Smith")).not.toBeInTheDocument();
  });
});
