'use client';

import Toast from "@/components/toast";
import { createContext, ReactNode, useContext, useState } from "react";

type ToastType = "success" | "error" | "info";

interface ToastContextType {
  showToast: boolean;
  toastMessage: string;
  toastType: ToastType;
  activateToast: (message?: string, type?: ToastType) => void;
  deactivateToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<ToastType>(
    "success"
  );

  const deactivateToast = () => {
    setShowToast(false);
  };

  const activateToast = (message?: string, type?: ToastType, duration:number = 2000) => {
    setToastMessage(message ?? "");
    setToastType(type ?? 'success');
    setShowToast(true);

    const timer = setTimeout(() => {
      setTimeout(deactivateToast, 300);
    }, duration);

    return () => clearTimeout(timer);
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
        toastMessage,
        toastType,
        activateToast,
        deactivateToast,
      }}
    >
      {children}
      <Toast />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ModalProvider");
  return context;
};

    