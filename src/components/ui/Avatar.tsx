interface AvatarProps {
  firstName?: string;
  lastName?: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
}

export function Avatar({ firstName = "", lastName = "", size = 40, color = "#0a0f1c", backgroundColor = "#d4a94f" }: AvatarProps) {
  const initials =
    firstName &&
    lastName
      ? `${firstName.charAt(0)}${lastName.charAt(0)}`
      : firstName?.charAt(0) || "?";

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "9999px",
        background: `linear-gradient(135deg, ${backgroundColor}, ${backgroundColor}dd)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color,
        fontWeight: 700,
        fontSize: Math.round(size * 0.36),
        letterSpacing: "0.02em",
        boxShadow: `0 6px 14px -6px ${backgroundColor}55`,
      }}
    >
      {initials}
    </div>
  );
}
