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

import { generateTearLine, pointsToPath, smooth } from "@/lib/motion-math";

const SEED = 8823;
const VIEW_W = 1600;
const VIEW_H = 900;
const HORIZON = VIEW_H * 0.62;
const TEAR_SEGMENTS = 22;

const NAME = "Samrat Lamsal";
const TAGLINE = "Product — KIIT '27";
const WELCOME_WORDS = ["Welcome", "to", "my", "portfolio."];

/** The dawn sky the name sits on: blue above, a warm sunrise glow low behind the headline. */
const SKY_SHEET =
  "radial-gradient(55% 42% at 50% 76%, rgba(246,193,119,0.55) 0%, rgba(255,158,128,0.22) 38%, rgba(255,233,216,0) 72%), " +
  "linear-gradient(to bottom, var(--color-dawn-sky) 0%, #e9f4f9 46%, var(--color-dawn-peach) 100%)";

/** A smooth swell across the full width, filled down to the bottom edge. */
function wavePath(baseline: number, amplitude: number, wavelength: number, phase = 0) {
  const half = wavelength / 2;
  let d = `M ${-wavelength + phase} ${baseline}`;
  for (let x = -wavelength + phase; x < VIEW_W + wavelength; x += wavelength) {
    d += ` Q ${x + half / 2} ${baseline - amplitude} ${x + half} ${baseline}`;
    d += ` Q ${x + half * 1.5} ${baseline + amplitude} ${x + wavelength} ${baseline}`;
  }
  return `${d} L ${VIEW_W + wavelength} ${VIEW_H} L ${-wavelength} ${VIEW_H} Z`;
}

const WAVE_BACK = wavePath(HORIZON + 26, 5, 260, 40);
const WAVE_MID = wavePath(HORIZON + 92, 9, 380, 120);
const WAVE_FRONT = wavePath(HORIZON + 190, 14, 520, 0);

/** Sea, sun and its trail of light on the water. Shared by the animated and static heroes. */
function OceanScene({
  sunY,
  sunOpacity,
  glitterOpacity,
  backX,
  midX,
  frontX,
  waveLift,
}: {
  sunY: MotionValue<number> | number;
  sunOpacity: MotionValue<number> | number;
  glitterOpacity: MotionValue<number> | number;
  backX?: MotionValue<number>;
  midX?: MotionValue<number>;
  frontX?: MotionValue<number>;
  waveLift?: MotionValue<number>;
}) {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-dawn-sky)" />
          <stop offset="60%" stopColor="#eef6fa" />
          <stop offset="100%" stopColor="var(--color-dawn-peach)" />
        </linearGradient>
        <radialGradient id="hero-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff6e6" />
          <stop offset="45%" stopColor="var(--color-gold)" />
          <stop offset="100%" stopColor="var(--color-coral)" />
        </radialGradient>
        <radialGradient id="hero-sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.55" />
          <stop offset="45%" stopColor="var(--color-coral)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--color-dawn-peach)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hero-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-shallow)" />
          <stop offset="55%" stopColor="var(--color-tide)" />
          <stop offset="100%" stopColor="var(--color-ocean)" />
        </linearGradient>
      </defs>

      <rect width={VIEW_W} height={HORIZON + 4} fill="url(#hero-sky)" />
      <motion.circle cx={VIEW_W / 2} cy={sunY} r={420} fill="url(#hero-sun-glow)" style={{ opacity: sunOpacity }} />
      <motion.circle cx={VIEW_W / 2} cy={sunY} r={92} fill="url(#hero-sun)" style={{ opacity: sunOpacity }} />

      {/* The sea is drawn after the sun, so the sun rises out of it. */}
      <rect y={HORIZON} width={VIEW_W} height={VIEW_H - HORIZON} fill="url(#hero-sea)" />
      <line x1={0} x2={VIEW_W} y1={HORIZON} y2={HORIZON} stroke="#ffffff" strokeOpacity="0.7" strokeWidth={1.5} />

      <motion.g style={{ opacity: glitterOpacity }}>
        {Array.from({ length: 14 }, (_, i) => {
          const y = HORIZON + 14 + i * i * 1.9 + i * 6;
          const w = 60 + i * 15 - (i % 3) * 18;
          return (
            <rect
              key={i}
              x={VIEW_W / 2 - w / 2 + ((i * 37) % 23) - 11}
              y={y}
              width={w}
              height={2.5 + i * 0.25}
              rx={2}
              fill="#fff3dc"
              opacity={0.75 - i * 0.04}
            />
          );
        })}
      </motion.g>

      <motion.path d={WAVE_BACK} fill="var(--color-shallow)" fillOpacity={0.45} style={{ x: backX, y: waveLift }} />
      <motion.path d={WAVE_MID} fill="var(--color-tide)" fillOpacity={0.35} style={{ x: midX, y: waveLift }} />
      <motion.path d={WAVE_FRONT} fill="var(--color-ocean)" fillOpacity={0.35} style={{ x: frontX, y: waveLift }} />
    </svg>
  );
}

/** Sunrise-over-the-sea title reveal. Scroll gently parts the dawn sky the name is
 * written on, and the sun rises out of the ocean behind it. */
export function SunriseReveal() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const stickyRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const seamGrowth = useTransform(scrollYProgress, [0.04, 0.3, 1], [0, 1, 1]);
  const seamOpacity = useTransform(scrollYProgress, [0.3, 0.5, 1], [1, 0, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.06, 1], [1, 0, 0]);
  const partRaw = useTransform(scrollYProgress, [0.26, 0.64], [0, 1]);
  const riseProgress = useTransform(scrollYProgress, [0.46, 0.96], [0, 1]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.08, 0.46], [1, 1, 0.22]);

  const leftX = useTransform(partRaw, (t) => `${-smooth(t) * 58}%`);
  const leftRotate = useTransform(partRaw, (t) => -smooth(t) * 4);
  const rightX = useTransform(partRaw, (t) => `${smooth(t) * 58}%`);
  const rightRotate = useTransform(partRaw, (t) => smooth(t) * 4);

  const sunY = useTransform(riseProgress, [0, 1], [HORIZON + 70, HORIZON - 120]);
  const sunOpacity = useTransform(riseProgress, [0, 0.25, 1], [0.35, 0.85, 1]);
  const glitterOpacity = useTransform(riseProgress, [0.3, 1], [0, 1]);
  const waveLift = useTransform(riseProgress, [0, 1], [40, 0]);

  const seam = React.useMemo(() => pointsToPath(generateTearLine(SEED, VIEW_W, VIEW_H, TEAR_SEGMENTS)), []);

  const pointerX = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 30, damping: 20 });
  const backX = useTransform(springX, (v) => v * 8);
  const midX = useTransform(springX, (v) => v * 18);
  const frontX = useTransform(springX, (v) => v * 30);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !stickyRef.current) return;
    const rect = stickyRef.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
  }

  if (prefersReducedMotion) return <StaticHero />;

  return (
    <section id="top" ref={sectionRef} className="relative h-[320vh]">
      <div
        ref={stickyRef}
        onPointerMove={handlePointerMove}
        className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-page"
      >
        <OceanScene
          sunY={sunY}
          sunOpacity={sunOpacity}
          glitterOpacity={glitterOpacity}
          backX={backX}
          midX={midX}
          frontX={frontX}
          waveLift={waveLift}
        />

        <h1 className="sr-only">{NAME}</h1>

        <div
          className="pointer-events-none absolute inset-x-0 top-[17%] z-20 flex flex-wrap items-center justify-center gap-x-3 px-6 text-center"
          aria-hidden
        >
          {WELCOME_WORDS.map((word, i) => (
            <WelcomeWord key={word} index={i} total={WELCOME_WORDS.length} progress={scrollYProgress}>
              {word}
            </WelcomeWord>
          ))}
        </div>

        <div className="relative z-10 h-full w-full select-none" aria-hidden>
          {(["left", "right"] as const).map((side) => (
            <motion.div
              key={side}
              style={{
                x: side === "left" ? leftX : rightX,
                rotate: side === "left" ? leftRotate : rightRotate,
                clipPath: side === "left" ? "inset(0 50% 0 0)" : "inset(0 0 0 50%)",
                backgroundImage: SKY_SHEET,
              }}
              className="hero-sky-drift absolute inset-0 flex flex-col items-center justify-center shadow-lift"
            >
              <TitleSheet nameOpacity={nameOpacity} />
            </motion.div>
          ))}
        </div>

        {/* A soft seam that runs across the sky just before it parts. */}
        <svg
          className="pointer-events-none absolute inset-0 z-10 h-full w-full"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <motion.path d={seam} stroke="var(--color-heading)" strokeOpacity={0.18} strokeWidth={1.2} fill="none" style={{ pathLength: seamGrowth, opacity: seamOpacity }} />
        </svg>

        <motion.div style={{ opacity: cueOpacity }} className="absolute bottom-10 z-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1.2 }}
            className="flex flex-col items-center gap-2 text-body"
          >
            <span className="text-[11px] uppercase tracking-[0.3em]">Scroll</span>
            <span className="h-8 w-px bg-ocean/40" />
          </motion.div>
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
 * then the whole line clears out before the sky parts. */
function WelcomeWord({ children, index, total, progress }: WelcomeWordProps) {
  const wordStart = (index / total) * 0.05;
  const wordEnd = ((index + 1) / total) * 0.05;
  const opacity = useTransform(progress, [wordStart, wordEnd, 0.07, 0.13, 1], [0.15, 1, 1, 0, 0]);
  const y = useTransform(progress, [wordStart, wordEnd], [12, 0]);
  const blur = useTransform(progress, [wordStart, wordEnd], [4, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.span style={{ opacity, y, filter }} className="font-display text-xl italic text-heading sm:text-2xl">
      {children}
    </motion.span>
  );
}

function TitleSheet({ nameOpacity }: { nameOpacity: MotionValue<number> }) {
  return (
    <motion.div style={{ opacity: nameOpacity }} className="flex flex-col items-center px-6 text-center">
      <span className="font-display text-[clamp(3rem,10vw,8rem)] font-light leading-[1.02] tracking-[-0.02em] text-heading">
        {NAME}
      </span>
      <span className="mt-5 text-xs font-medium uppercase tracking-[0.32em] text-ocean-deep sm:text-sm">{TAGLINE}</span>
    </motion.div>
  );
}

function StaticHero() {
  return (
    <section id="top" className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-page">
      <OceanScene sunY={HORIZON - 120} sunOpacity={1} glitterOpacity={1} />
      <div
        className="absolute inset-x-0 top-0 h-[60%]"
        style={{ backgroundImage: "linear-gradient(to bottom, rgba(214,236,247,0.9), rgba(250,248,244,0))" }}
        aria-hidden
      />
      <div className="relative z-10 -mt-[18vh] flex flex-col items-center px-6 text-center">
        <p className="font-display mb-6 text-xl italic text-heading sm:text-2xl">{WELCOME_WORDS.join(" ")}</p>
        <h1 className="font-display text-[clamp(3rem,10vw,8rem)] font-light leading-[1.02] tracking-[-0.02em] text-heading">
          {NAME}
        </h1>
        <p className="mt-5 text-xs font-medium uppercase tracking-[0.32em] text-ocean-deep sm:text-sm">{TAGLINE}</p>
      </div>
    </section>
  );
}
