import { useEffect, useRef } from "react";
import type { useCreateTaskForm } from "../../model/useCreateTaskForm";

type CreateTaskForm = ReturnType<typeof useCreateTaskForm>;

export const useCreateTaskDrawerLifecycle = (
  isOpen: boolean,
  onClose: () => void,
  form: CreateTaskForm,
) => {
  const formRef = useRef(form);
  formRef.current = form;

  useEffect(() => {
    if (!isOpen) {
      formRef.current.reset();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);
};
