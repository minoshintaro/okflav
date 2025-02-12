type ColorProps = {
  startColor: string;
  endColor: string;
};

export function Color({ startColor, endColor }: ColorProps) {
  return (
    <svg
      id="superellipse"
      className="aspect-square"
      viewBox="-1.2 -1.2 2.4 2.4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0" y1="1" x2="0" y2="-1">
          <stop offset="0%" stopColor={startColor} />
          <stop offset="100%" stopColor={endColor} />
        </linearGradient>
      </defs>
      <path
        d="M 1 0
          C 1 0.6 0.6 1 0 1
          C -0.6 1 -1 0.6 -1 0
          C -1 -0.6 -0.6 -1 0 -1
          C 0.6 -1 1 -0.6 1 0
          Z"
        fill="url(#gradient)"
      />
    </svg>
  );
}
