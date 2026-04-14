import { EXERCISM_ICONS, EXERCISM_BADGES, EXERCISM_GRAPHICS,
         EXERCISM_TRACKS, EXERCISM_NAV, getExerciseIconUrl } from "@/lib/exercismAssets";
import { cn } from "@/lib/utils";

// ── ExIcon — UI icon ─────────────────────────────────────────────────
interface ExIconProps {
  name: keyof typeof EXERCISM_ICONS;
  size?: number;
  className?: string;
  alt?: string;
  filter?: "purple" | "muted" | "white" | "none";
}

const FILTER_CLASSES: Record<string, string> = {
  purple: "filter-[invert(22%)_sepia(99%)_saturate(3072%)_hue-rotate(257deg)_brightness(77%)_contrast(130%)]",
  muted:  "opacity-50",
  white:  "brightness-0 invert",
  none:   "",
};

export function ExIcon({ name, size = 20, className, alt = "", filter = "none" }: ExIconProps) {
  return (
    <img
      src={EXERCISM_ICONS[name]}
      alt={alt}
      width={size}
      height={size}
      className={cn("inline-block shrink-0", FILTER_CLASSES[filter], className)}
    />
  );
}

// ── ExBadgeIcon — badge icon ─────────────────────────────────────────
interface ExBadgeIconProps {
  name: keyof typeof EXERCISM_BADGES;
  size?: number;
  className?: string;
}

export function ExBadgeIcon({ name, size = 20, className }: ExBadgeIconProps) {
  return (
    <img
      src={EXERCISM_BADGES[name]}
      alt={name}
      width={size}
      height={size}
      className={cn("inline-block shrink-0", className)}
    />
  );
}

// ── ExGraphic — illustration ─────────────────────────────────────────
interface ExGraphicProps {
  name: keyof typeof EXERCISM_GRAPHICS;
  className?: string;
  alt?: string;
}

export function ExGraphic({ name, className, alt = "" }: ExGraphicProps) {
  return (
    <img
      src={EXERCISM_GRAPHICS[name]}
      alt={alt}
      className={cn("block", className)}
    />
  );
}

// ── ExTrackIcon — hexagonal programming language icon ─────────────────
interface ExTrackIconProps {
  slug: string;  // "prolog", "python", etc.
  size?: number;
  className?: string;
  alt?: string;
}

export function ExTrackIcon({ slug, size = 48, className, alt }: ExTrackIconProps) {
  const src = EXERCISM_TRACKS[slug as keyof typeof EXERCISM_TRACKS]
    ?? `https://assets.exercism.org/tracks/${slug}.svg`;

  return (
    <img
      src={src}
      alt={alt ?? slug}
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      onError={(e) => {
        (e.target as HTMLImageElement).src =
          "https://assets.exercism.org/assets/graphics/missing-track-e3d861058d4702c1dc4036617689249659b8d37d.svg";
      }}
    />
  );
}

// ── ExExerciseIcon — exercise icon by slug ────────────────────────────
interface ExExerciseIconProps {
  slug: string;  // "anagram", "hello-world", etc.
  size?: number;
  className?: string;
}

export function ExExerciseIcon({ slug, size = 40, className }: ExExerciseIconProps) {
  return (
    <img
      src={getExerciseIconUrl(slug)}
      alt={slug}
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      onError={(e) => {
        (e.target as HTMLImageElement).src =
          "https://assets.exercism.org/assets/icons/editor-f3dbecf27d40b9fe69cc3d72364d6376cf9e8710.svg";
      }}
    />
  );
}
