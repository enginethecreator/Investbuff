import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createPortal } from "react-dom";
import { cn } from "../../utils/helpers";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastStore {
  toasts: ToastMessage[];
  addToast: (type: ToastType, message: string) => string;
  removeToast: (id: string) => void;
}

let toastId = 0;

export const useToast = create<ToastStore>()(
  persist(
    (set) => ({
      toasts: [],
      addToast: (type, message) => {
        const id = `toast_${++toastId}`;
        set((state) => ({
          toasts: [...state.toasts, { id, type, message }],
        }));
        return id;
      },
      removeToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        })),
    }),
    { name: "investbuff-toasts" }
  )
);

const toastStyles: Record<ToastType, { bg: string; border: string }> = {
  success: { bg: "rgba(16,185,129,0.12)", border: "#10b981" },
  error: { bg: "rgba(239,68,68,0.12)", border: "#ef4444" },
  info: { bg: "rgba(59,130,246,0.12)", border: "#3b82f6" },
  warning: { bg: "rgba(217,119,6,0.12)", border: "#d97706" },
};

export interface ToastProps {
  type: ToastType;
  message: string;
  onDismiss: () => void;
}

export function Toast({ type, message, onDismiss }: ToastProps) {
  const [exiting, setExiting] = useState(false);
  const style = toastStyles[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onDismiss, 200);
    }, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border shadow-lg px-4 py-3.5 backdrop-blur-sm transition-all duration-200",
        exiting ? "opacity-0 translate-y-2" : "opacity-100"
      )}
      style={{
        backgroundColor: style.bg,
        borderColor: style.border,
      }}
      role="status"
      aria-live="polite"
    >
      <span className="text-white font-medium text-sm flex-1">{message}</span>
      <button
        type="button"
        onClick={() => {
          setExiting(true);
          setTimeout(onDismiss, 200);
        }}
        className="text-white/60 hover:text-white transition-colors"
        aria-label="Dismiss"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return createPortal(
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3 max-w-sm">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onDismiss={() => removeToast(toast.id)}
        />
      ))}
    </div>,
    document.body
  );
}
