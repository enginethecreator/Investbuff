type StatusVariant =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "active"
  | "completed"
  | "blocked"
  | "pending";

interface StatusBadgeProps {
  variant: StatusVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<StatusVariant, { bg: string; text: string; border: string }> = {
  success: { bg: "rgba(16,185,129,0.14)", text: "#34d399", border: "rgba(16,185,129,0.3)" },
  warning: { bg: "rgba(217,119,6,0.14)", text: "#fbbf24", border: "rgba(217,119,6,0.3)" },
  danger: { bg: "rgba(239,68,68,0.14)", text: "#f87171", border: "rgba(239,68,68,0.3)" },
  info: { bg: "rgba(59,130,246,0.14)", text: "#60a5fa", border: "rgba(59,130,246,0.3)" },
  active: { bg: "rgba(16,185,129,0.14)", text: "#34d399", border: "rgba(16,185,129,0.3)" },
  completed: { bg: "rgba(100,116,139,0.16)", text: "#94a3b8", border: "rgba(100,116,139,0.3)" },
  blocked: { bg: "rgba(239,68,68,0.14)", text: "#f87171", border: "rgba(239,68,68,0.3)" },
  pending: { bg: "rgba(217,119,6,0.14)", text: "#fbbf24", border: "rgba(217,119,6,0.3)" },
};

export function StatusBadge({ variant, children, className = "" }: StatusBadgeProps) {
  const style = variantStyles[variant];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase border ${className}`.trim()}
      style={{
        backgroundColor: style.bg,
        color: style.text,
        borderColor: style.border,
      }}
    >
      {children}
    </span>
  );
}
