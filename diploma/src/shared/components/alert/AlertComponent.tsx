import { Alert } from "@heroui/react";
import { useAlertStore } from "../../stores";
import { useEffect } from "react";

export function AlertComponent() {
  const {
    title,
    description,
    messageType,
    variant,
    endContent,
    isVisible,
    hideAlert,
  } = useAlertStore();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(hideAlert, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, hideAlert]);

  if (!isVisible || !messageType) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <Alert
        color={messageType}
        title={title || ""}
        description={description || ""}
        variant={variant || "faded"}
        radius="md"
        endContent={endContent}
        hideIcon
        isClosable
      />
    </div>
  );
}
