interface LogoProps {
  className?: string;
  color?: string;
}

export default function Logo({ className = "", color = "#c9a84c" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Golden arc emblem */}
      <g transform="translate(8, 8)">
        <circle cx="22" cy="22" r="20" stroke={color} strokeWidth="1.5" fill="none" />
        <path d="M8 28 Q22 10 36 28" stroke={color} strokeWidth="1.5" fill="none" />
        <circle cx="22" cy="10" r="2.5" fill={color} />
        <circle cx="22" cy="34" r="1.5" fill={color} />
      </g>
      {/* PROFIT text */}
      <text
        x="60"
        y="30"
        fontFamily="'Cormorant Garamond', serif"
        fontSize="22"
        fontWeight="400"
        fill={color}
        letterSpacing="0.08em"
      >
        PROFIT
      </text>
      {/* coaching text */}
      <text
        x="60"
        y="48"
        fontFamily="'Source Sans 3', sans-serif"
        fontSize="11"
        fontWeight="400"
        fill={color}
        letterSpacing="0.15em"
      >
        coaching
      </text>
    </svg>
  );
}
