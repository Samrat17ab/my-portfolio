"use client";

import * as React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

import {
  generateTearLine,
  pointsToPath,
  generateFibreWidths,
  generateRidgePath,
  easeOutBack,
} from "@/lib/motion-math";

const SEED = 8823;
const VIEW_W = 1600;
const VIEW_H = 900;
const TEAR_SEGMENTS = 26;

const NAME = "SAMRAT LAMSAL";
const TAGLINE = "Product — Khalti by IME · KIIT '27";
const WELCOME_WORDS = ["Welcome", "to", "my", "portfolio."];

function useRidgePath(seed: number, baseline: number, amplitude: number, points: number) {
  return React.useMemo(
    () => generateRidgePath(seed, VIEW_W, VIEW_H, baseline, amplitude, points),
    [seed, baseline, amplitude, points],
  );
}

/** Sunrise-over-ridge title reveal. Scroll tears the name sheet in half and a
 * procedural mountain range rises into the gap. See lib/motion-math.ts for
 * the shared rng/easing primitives this reuses. */
export function SunriseReveal() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const stickyRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const crackGrowth = useTransform(scrollYProgress, [0.04, 0.32], [0, 1]);
  const tearRaw = useTransform(scrollYProgress, [0.28, 0.62], [0, 1]);
  const riseProgress = useTransform(scrollYProgress, [0.52, 0.96], [0, 1]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.06, 0.42], [1, 1, 0.18]);

  const leftX = useTransform(tearRaw, (t) => `${-easeOutBack(t) * 60}%`);
  const leftRotate = useTransform(tearRaw, (t) => -easeOutBack(t) * 9);
  const rightX = useTransform(tearRaw, (t) => `${easeOutBack(t) * 60}%`);
  const rightRotate = useTransform(tearRaw, (t) => easeOutBack(t) * 9);

  const sunY = useTransform(riseProgress, [0, 1], [VIEW_H * 0.78, VIEW_H * 0.36]);
  const sunOpacity = useTransform(riseProgress, [0, 0.3, 1], [0, 0.5, 1]);
  const rayOpacity = useTransform(riseProgress, [0.4, 1], [0, 0.7]);
  const ridgeLift = useTransform(riseProgress, [0, 1], [90, 0]);

  const tearPoints = React.useMemo(() => generateTearLine(SEED, VIEW_W, VIEW_H, TEAR_SEGMENTS), []);
  const tearPath = React.useMemo(() => pointsToPath(tearPoints), [tearPoints]);
  const fibreA = React.useMemo(
    () => pointsToPath(generateTearLine(SEED + 11, VIEW_W, VIEW_H, TEAR_SEGMENTS)),
    [],
  );
  const fibreB = React.useMemo(
    () => pointsToPath(generateTearLine(SEED + 23, VIEW_W, VIEW_H, TEAR_SEGMENTS)),
    [],
  );
  const fibreWidths = React.useMemo(() => generateFibreWidths(SEED, 3), []);

  const ridgeBack = useRidgePath(SEED + 1, VIEW_H * 0.66, 130, 9);
  const ridgeMid = useRidgePath(SEED + 2, VIEW_H * 0.74, 180, 11);
  const ridgeFront = useRidgePath(SEED + 3, VIEW_H * 0.86, 230, 13);

  const pointerX = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 55, damping: 20 });
  const backX = useTransform(springX, (v) => v * 6);
  const midX = useTransform(springX, (v) => v * 14);
  const frontX = useTransform(springX, (v) => v * 26);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !stickyRef.current) return;
    const rect = stickyRef.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
  }

  if (prefersReducedMotion) {
    return <StaticHero />;
  }

  return (
    <section id="top" ref={sectionRef} className="relative h-[320vh]">
      <div
        ref={stickyRef}
        onPointerMove={handlePointerMove}
        className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-base"
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <defs>
            <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e8a33d" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#e8a33d" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#e8a33d" stopOpacity="0" />
            </radialGradient>
          </defs>

          <motion.circle
            cx={VIEW_W / 2}
            cy={sunY}
            r={220}
            fill="url(#sun-glow)"
            style={{ opacity: sunOpacity }}
          />
          <motion.g style={{ opacity: rayOpacity }}>
            {Array.from({ length: 9 }, (_, i) => {
              const angle = (i / 8) * 140 - 70;
              return (
                <rect
                  key={i}
                  x={VIEW_W / 2 - 3}
                  y={VIEW_H * 0.36 - 320}
                  width={6}
                  height={320}
                  fill="#e8a33d"
                  opacity={0.18}
                  transform={`rotate(${angle} ${VIEW_W / 2} ${VIEW_H * 0.36})`}
                />
              );
            })}
          </motion.g>

          <motion.path
            d={ridgeBack}
            fill="rgba(127,184,196,0.16)"
            style={{ x: backX, y: ridgeLift }}
          />
          <motion.path
            d={ridgeMid}
            fill="rgba(127,184,196,0.28)"
            style={{ x: midX, y: ridgeLift }}
          />
          <motion.path
            d={ridgeFront}
            fill="#0b0f14"
            stroke="rgba(127,184,196,0.4)"
            strokeWidth={1.5}
            style={{ x: frontX, y: ridgeLift }}
          />
        </svg>

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <motion.path
            d={fibreA}
            stroke="rgba(255,255,255,0.22)"
            strokeWidth={fibreWidths[1]}
            fill="none"
            style={{ pathLength: crackGrowth }}
          />
          <motion.path
            d={fibreB}
            stroke="rgba(255,255,255,0.22)"
            strokeWidth={fibreWidths[2]}
            fill="none"
            style={{ pathLength: crackGrowth }}
          />
          <motion.path
            d={tearPath}
            stroke="rgba(255,255,255,0.55)"
            strokeWidth={fibreWidths[0]}
            fill="none"
            style={{ pathLength: crackGrowth }}
          />
        </svg>

        <h1 className="sr-only">{NAME}</h1>

        <div
          className="pointer-events-none absolute inset-x-0 top-[16%] z-20 flex flex-wrap items-center justify-center gap-x-3 px-6 text-center sm:top-[18%]"
          aria-hidden
        >
          {WELCOME_WORDS.map((word, i) => (
            <WelcomeWord key={word} index={i} total={WELCOME_WORDS.length} progress={scrollYProgress}>
              {word}
            </WelcomeWord>
          ))}
        </div>

        <div className="relative z-10 h-full w-full select-none" aria-hidden>
          <motion.div
            style={{ x: leftX, rotate: leftRotate, clipPath: "inset(0 50% 0 0)" }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-base"
          >
            <TitleSheet nameOpacity={nameOpacity} />
          </motion.div>
          <motion.div
            style={{ x: rightX, rotate: rightRotate, clipPath: "inset(0 0 0 50%)" }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-base"
          >
            <TitleSheet nameOpacity={nameOpacity} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-10 flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="h-8 w-px bg-white/30" />
        </motion.div>
      </div>
    </section>
  );
}

interface WelcomeWordProps {
  children: React.ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

/** Each word lights up in sequence over the first sliver of hero scroll,
 * then the whole line clears out before the tear sequence takes over. */
function WelcomeWord({ children, index, total, progress }: WelcomeWordProps) {
  const wordStart = (index / total) * 0.05;
  const wordEnd = ((index + 1) / total) * 0.05;
  const opacity = useTransform(progress, [wordStart, wordEnd, 0.07, 0.13], [0.08, 1, 1, 0]);
  const y = useTransform(progress, [wordStart, wordEnd], [16, 0]);
  const blur = useTransform(progress, [wordStart, wordEnd], [5, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.span
      style={{ opacity, y, filter }}
      className="font-display text-lg uppercase tracking-[0.2em] text-white/80 sm:text-2xl"
    >
      {children}
    </motion.span>
  );
}

function TitleSheet({ nameOpacity }: { nameOpacity: MotionValue<number> }) {
  return (
    <motion.div style={{ opacity: nameOpacity }} className="flex flex-col items-center px-6 text-center">
      <span className="font-display text-[clamp(2.75rem,10vw,8rem)] leading-none tracking-wide text-white">
        {NAME}
      </span>
      <span className="mt-4 text-xs uppercase tracking-[0.3em] text-glacier sm:text-sm">
        {TAGLINE}
      </span>
    </motion.div>
  );
}

function StaticHero() {
  const ridgeBack = useRidgePath(SEED + 1, VIEW_H * 0.66, 130, 9);
  const ridgeMid = useRidgePath(SEED + 2, VIEW_H * 0.74, 180, 11);
  const ridgeFront = useRidgePath(SEED + 3, VIEW_H * 0.86, 230, 13);

  return (
    <section id="top" className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-base">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <radialGradient id="sun-glow-static" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e8a33d" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#e8a33d" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#e8a33d" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={VIEW_W / 2} cy={VIEW_H * 0.36} r={220} fill="url(#sun-glow-static)" />
        <path d={ridgeBack} fill="rgba(127,184,196,0.16)" />
        <path d={ridgeMid} fill="rgba(127,184,196,0.28)" />
        <path d={ridgeFront} fill="#0b0f14" stroke="rgba(127,184,196,0.4)" strokeWidth={1.5} />
      </svg>
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <p className="font-display mb-6 text-lg uppercase tracking-[0.2em] text-white/80 sm:text-2xl">
          {WELCOME_WORDS.join(" ")}
        </p>
        <h1 className="font-display text-[clamp(2.75rem,10vw,8rem)] leading-none tracking-wide text-white">
          {NAME}
        </h1>
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-glacier sm:text-sm">{TAGLINE}</p>
      </div>
    </section>
  );
}
