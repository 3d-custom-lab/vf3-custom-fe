import { useState, useCallback } from "react";

export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "info", duration = 3000) => {
    setToast({ message, type, duration });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return {
    toast,
    showToast,
    hideToast,
    showSuccess: useCallback((message, duration) => showToast(message, "success", duration), [showToast]),
    showError: useCallback((message, duration) => showToast(message, "error", duration), [showToast]),
    showInfo: useCallback((message, duration) => showToast(message, "info", duration), [showToast]),
  };
}
