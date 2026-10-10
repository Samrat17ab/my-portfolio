/** A faint mountain ridge under the journal header, echoing the homepage hero. */
export function Ridge() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full text-white sm:h-56"
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="journal-ridge-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.06" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 170 L120 120 L210 150 L330 70 L430 130 L540 90 L640 140 L760 50 L880 120 L980 95 L1090 145 L1200 80 L1310 130 L1440 100 L1440 220 L0 220 Z"
        fill="url(#journal-ridge-fade)"
      />
      <path
        d="M0 170 L120 120 L210 150 L330 70 L430 130 L540 90 L640 140 L760 50 L880 120 L980 95 L1090 145 L1200 80 L1310 130 L1440 100"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.12"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
