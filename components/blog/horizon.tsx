/** A soft sea horizon under the blog header: two slow swells in shallow and tide blue. */
export function Horizon() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-32 overflow-hidden [mask-image:linear-gradient(to_bottom,black_45%,transparent)] sm:h-44"
      aria-hidden
    >
      <svg className="wave-drift-slow absolute bottom-0 left-0 h-full w-[200%]" viewBox="0 0 2880 160" preserveAspectRatio="none">
        <path
          d="M0 70 Q 180 40 360 70 T 720 70 T 1080 70 T 1440 70 T 1800 70 T 2160 70 T 2520 70 T 2880 70 L 2880 160 L 0 160 Z"
          fill="var(--color-shallow)"
          fillOpacity="0.45"
        />
      </svg>
      <svg className="wave-drift absolute bottom-0 left-0 h-[70%] w-[200%]" viewBox="0 0 2880 112" preserveAspectRatio="none">
        <path
          d="M0 50 Q 240 26 480 50 T 960 50 T 1440 50 T 1920 50 T 2400 50 T 2880 50 L 2880 112 L 0 112 Z"
          fill="var(--color-tide)"
          fillOpacity="0.22"
        />
      </svg>
    </div>
  );
}
