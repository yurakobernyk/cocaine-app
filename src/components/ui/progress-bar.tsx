/**
 * ProgressBar — two-layer progress indicator used in Crisis Calls and Program cards.
 *
 * Figma spec: h-[8px], rounded-[4px], full-width track, colored fill.
 */
interface ProgressBarProps {
  /** Fill percentage 0-100 */
  fillPct: number;
  /** Track background color */
  trackColor: string;
  /** Fill bar color */
  fillColor: string;
}

export function ProgressBar({ fillPct, trackColor, fillColor }: ProgressBarProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: 8, borderRadius: 4, background: trackColor }}
    >
      <div
        className="absolute inset-y-0 left-0"
        style={{
          width: `${Math.min(100, Math.max(0, fillPct))}%`,
          background: fillColor,
          borderRadius: 4,
        }}
      />
    </div>
  );
}
