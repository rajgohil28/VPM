import { cn } from "@/lib/utils";

// The VP's identity mark: an "orbit" — a central hub with an orbiting agent —
// rendered as a solid monochrome squircle. Deliberately not a sparkle/brain.
export function VpMark({
  className,
  size = 36,
  rounded = "rounded-[10px]",
}: {
  className?: string;
  size?: number;
  rounded?: string;
}) {
  return (
    <span
      className={cn("inline-grid shrink-0 place-items-center bg-primary text-primary-fg", rounded, className)}
      style={{ width: size, height: size }}
    >
      <OrbitGlyph size={Math.round(size * 0.56)} />
    </span>
  );
}

export function OrbitGlyph({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="9.2" ry="4.3" transform="rotate(-28 12 12)" />
      <circle cx="4.7" cy="14.9" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
