import { QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { useCreateComment } from "@features/tasks/comment/create/model/useCreateComment";
import { queryClient } from "@shared/api";

const { addToastMock, createCommentMock } = vi.hoisted(() => ({
  addToastMock: vi.fn(),
  createCommentMock: vi.fn(),
}));

vi.mock("@features/tasks/comment/create/api/createCommentApi", () => ({
  createComment: createCommentMock,
}));

vi.mock("@heroui/react", async (importOriginal) => {
  const actual = await importOriginal();
  return { ...(actual as object), addToast: addToastMock };
});

const createWrapper = () => {
  queryClient.setDefaultOptions({
    queries: { retry: false, gcTime: 0 },
    mutations: { retry: false },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useCreateComment", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  it("submits a reply with its parent and recipient", async () => {
    createCommentMock.mockResolvedValue({ id: "reply-1" });
    const onSuccess = vi.fn();
    const { result } = renderHook(
      () =>
        useCreateComment(
          "task-1",
          "comment-1",
          "author-1",
          onSuccess,
        ),
      { wrapper: createWrapper() },
    );

    act(() => {
      result.current.formik.setFieldValue("body", "A useful answer");
    });
    await waitFor(() => {
      expect(result.current.formik.values.body).toBe("A useful answer");
    });
    await act(async () => {
      await result.current.formik.submitForm().catch(() => undefined);
    });

    await waitFor(() => {
      expect(createCommentMock).toHaveBeenCalledWith("task-1", {
        body: "A useful answer",
        parentCommentId: "comment-1",
        replyToUserId: "author-1",
      });
      expect(onSuccess).toHaveBeenCalledOnce();
    });
  });

  it("keeps the reply open and reports missing permission on 403", async () => {
    createCommentMock.mockRejectedValue({ response: { status: 403 } });
    const onSuccess = vi.fn();
    const { result } = renderHook(
      () =>
        useCreateComment(
          "task-1",
          "comment-1",
          "author-1",
          onSuccess,
        ),
      { wrapper: createWrapper() },
    );

    act(() => {
      result.current.formik.setFieldValue("body", "A useful answer");
    });
    await waitFor(() => {
      expect(result.current.formik.values.body).toBe("A useful answer");
    });
    await act(async () => {
      await result.current.formik.submitForm().catch(() => undefined);
    });

    await waitFor(() => {
      expect(addToastMock).toHaveBeenCalledWith(
        expect.objectContaining({
          color: "danger",
          description: expect.any(String),
        }),
      );
    });
    expect(onSuccess).not.toHaveBeenCalled();
  });
});
