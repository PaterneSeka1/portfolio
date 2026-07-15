import Image from "next/image"

const VARIANTS = {
  icon: { tile: "#0D1B2A", accent: "#2563EB", mark: "#2563EB", text: "#0D1B2A" },
  white: { tile: "transparent", accent: "#FFFFFF", mark: "#FFFFFF", text: "#FFFFFF" },
  navy: { tile: "#0D1B2A", accent: "#2563EB", mark: "#2563EB", text: "#0D1B2A" },
};

function Mark({ variant = "icon", className = "", logoUrl }) {
  if (logoUrl) {
    return (
      <span className={`relative inline-block ${className}`}>
        <Image src={logoUrl} alt="Paterne SEKA" fill className="object-contain" />
      </span>
    )
  }

  const { tile, mark } = VARIANTS[variant] ?? VARIANTS.icon;
  const hasTile = tile !== "transparent";

  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label="Paterne SEKA"
    >
      {hasTile && <rect width="40" height="40" rx="10" fill={tile} />}
      {hasTile && (
        <polygon points="0,40 14,40 0,26" fill="#133A7C" opacity="0.5" />
      )}
      <text
        x="20"
        y="27"
        textAnchor="middle"
        fontFamily="var(--font-heading, Sora), Arial, sans-serif"
        fontWeight="800"
        fontSize="17"
        letterSpacing="-0.5"
        fill={mark}
      >
        PS
      </text>
    </svg>
  );
}

export default function Logo({ variant = "icon", withWordmark = false, className = "h-10 w-10", logoUrl }) {
  const { text } = VARIANTS[variant] ?? VARIANTS.icon;

  if (!withWordmark) {
    return <Mark variant={variant} className={className} logoUrl={logoUrl} />;
  }

  return (
    <span className="inline-flex items-center gap-3">
      <Mark variant={variant} className={className} logoUrl={logoUrl} />
      <span
        className="font-heading font-bold text-lg leading-none"
        style={{ color: text }}
      >
        Paterne SEKA
      </span>
    </span>
  );
}
