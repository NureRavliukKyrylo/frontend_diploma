import * as Yup from "yup";

export const messageSchema = Yup.object({
  body: Yup.string().max(500, "Message must be at most 500 characters"),
});
