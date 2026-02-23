import type { SVGProps } from "react";

const TailwindCSS = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 256 154" preserveAspectRatio="xMidYMid">
    <defs>
      <linearGradient x1="-2.778%" y1="32%" x2="100%" y2="67.556%" id="tailwind-gradient">
        <stop stopColor="#2298BD" offset="0%" />
        <stop stopColor="#0ED7B5" offset="100%" />
      </linearGradient>
    </defs>
    <path
      d="M128 0Q76.8 0 64 51.2 83.2 25.6 108.8 32c14.629 3.656 25.088 14.272 36.672 26.048C163.885 76.808 185.07 99.2 230.4 99.2q51.2 0 64-51.2-19.2 25.6-44.8 19.2c-14.629-3.656-25.088-14.272-36.672-26.048C194.515 22.392 173.33 0 128 0ZM25.6 76.8Q-25.6 76.8-38.4 128q19.2-25.6 44.8-19.2c14.629 3.656 25.088 14.272 36.672 26.048C61.485 153.608 82.67 176 128 176q51.2 0 64-51.2-19.2 25.6-44.8 19.2c-14.629-3.656-25.088-14.272-36.672-26.048C92.115 99.192 70.93 76.8 25.6 76.8Z"
      fill="url(#tailwind-gradient)"
      transform="translate(38.4, -11)"
    />
  </svg>
);

export { TailwindCSS };
