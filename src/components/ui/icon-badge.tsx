/**
 * IconBadge — circular badge used in home screen cards.
 * Figma spec: p-[6px], rounded-full, bg #b2e8d4 (green) or #ffc8be (peach)
 * Icon inside: 20×20 px
 */
import { FigmaIcon } from "./figma-icon";

interface IconBadgeProps {
  /** Icon image src */
  src: string;
  /** Badge color variant */
  variant?: "green" | "peach";
  /** Icon pixel size (default 20). Badge will be iconSize + 12 */
  iconSize?: number;
}

export function IconBadge({
  src,
  variant = "green",
  iconSize = 20,
}: IconBadgeProps) {
  const bg = variant === "green" ? "#b2e8d4" : "#ffc8be";
  const total = iconSize + 12; // 6px padding each side
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full"
      style={{ background: bg, width: total, height: total, padding: 6 }}
    >
      <FigmaIcon src={src} size={iconSize} />
    </div>
  );
}
