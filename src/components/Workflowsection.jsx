/**
 * WorkflowSection.jsx
 *
 * Drop-in replacement for the "WORKFLOW / PROCESS" <section> in App.tsx.
 * Requires: framer-motion (already in most React setups; add via `npm i framer-motion`)
 *
 * Usage in App.tsx:
 *   import { WorkflowSection } from './components/WorkflowSection';
 *   // replace the entire <section id="process" …> block with:
 *   <WorkflowSection />
 *
 * processSteps data shape expected from './data/portfolio':
 *   { step: '01', title: string, text: string }[]
 *
 * Image paths: /1.png /2.jpg /3.jpg /4.jpg  (same as original)
 */

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { processSteps } from "../data/portfolio";

/* ─── CONFIG ────────────────────────────────────────────────────────────── */

const VISUALS = ["/1.png", "/2.jpg", "/3.jpg", "/4.jpg"];

/** How many viewport-heights the sticky section pins for. Larger = slower scroll per step. */
const PIN_MULTIPLIER = 1.8; // total scroll = PIN_MULTIPLIER × steps

/* ─── TINY HELPERS ──────────────────────────────────────────────────────── */

function clamp(v, lo, hi) {
  return Math.min(Math.max(v, lo), hi);
}

/** Returns a spring-smoothed motion value derived from a source. */
function useSmooth(raw, cfg = { stiffness: 80, damping: 20 }) {
  return useSpring(raw, cfg);
}

/* ─── SPLIT TEXT (word-level) ───────────────────────────────────────────── */

function SplitWords({ text, isActive, baseDelay = 0 }) {
  const words = text.split(" ");
  return (
    <span aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden"
          style={{ marginRight: "0.25em" }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={
              isActive ? { y: "0%", opacity: 1 } : { y: "60%", opacity: 0 }
            }
            transition={{
              duration: 0.55,
              delay: baseDelay + i * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ─── DESCRIPTION LINES ─────────────────────────────────────────────────── */

function AnimatedLines({ text, isActive, baseDelay = 0.25 }) {
  // Split on ". " to get sentence-level lines; fallback to raw text
  const lines = text.match(/[^.!?]+[.!?]*/g) ?? [text];
  return (
    <>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={isActive ? { y: 0, opacity: 1 } : { y: 12, opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: baseDelay + i * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-[0.72rem] leading-[1.9] text-white/60"
          >
            {line.trim()}
          </motion.div>
        </div>
      ))}
    </>
  );
}

/* ─── SINGLE CARD ───────────────────────────────────────────────────────── */

function WorkflowCard({ step, index, activeIndex, totalSteps }) {
  const isActive = index === activeIndex;
  const dist = Math.abs(index - activeIndex);

  // Positional offset so non-active cards peek out from either side
  const offset = (index - activeIndex) * 60; // px shift on desktop

  return (
    <motion.article
      aria-label={`Step ${step.step}: ${step.title}`}
      className="absolute top-0 left-0 w-full h-full"
      style={{ zIndex: isActive ? 10 : 10 - dist }}
      animate={{
        x: offset,
        scale: isActive ? 1 : 0.88 - dist * 0.04,
        opacity: isActive ? 1 : Math.max(0, 0.35 - dist * 0.12),
        filter: isActive ? "blur(0px)" : `blur(${Math.min(dist * 2, 6)}px)`,
      }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Glow behind active card */}
      {isActive && (
        <motion.div
          className="absolute inset-0 -z-10 rounded-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            boxShadow: "0 0 80px 20px rgba(255,255,255,0.07)",
          }}
        />
      )}

      {/* Card shell */}
      <div
        className={`
                    relative h-full border overflow-hidden transition-all duration-700
                    ${
                      isActive
                        ? "border-white/25 bg-white/[0.06]"
                        : "border-white/8 bg-white/[0.03]"
                    }
                `}
        style={{
          backdropFilter: isActive ? "blur(12px)" : "none",
          boxShadow: isActive
            ? "0 24px 80px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.1) inset"
            : "none",
        }}
      >
        {/* ── Image ── */}
        <div className="relative h-[48%] overflow-hidden">
          <motion.img
            src={VISUALS[index % VISUALS.length]}
            alt={step.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ willChange: "transform" }}
            animate={{
              scale: isActive ? 1.06 : 1.0,
              filter: isActive ? "grayscale(0%)" : "grayscale(100%)",
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {/* Clip-path reveal on image — slides up from bottom */}
          <motion.div
            className="absolute inset-0 bg-black origin-bottom"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: isActive ? 0 : 1 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            style={{ transformOrigin: "top" }}
          />

          {/* Glassmorphism overlay on active */}
          {isActive && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          )}
        </div>

        {/* ── Text body ── */}
        <div className="px-6 pt-5 pb-6 md:px-8 md:pt-6">
          {/* Step number */}
          <div className="overflow-hidden mb-1">
            <motion.div
              className="font-display text-[2.8rem] leading-none tracking-[0.02em] md:text-[3.4rem]"
              style={{
                color: isActive
                  ? "rgba(255,255,255,1)"
                  : "rgba(255,255,255,0.2)",
              }}
              animate={{ y: isActive ? 0 : 12, opacity: isActive ? 1 : 0.3 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {step.step}
            </motion.div>
          </div>

          {/* Title */}
          <div className="mt-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white/90">
            <SplitWords
              text={step.title}
              isActive={isActive}
              baseDelay={0.08}
            />
          </div>

          {/* Description */}
          <div className="mt-3">
            <AnimatedLines
              text={step.text}
              isActive={isActive}
              baseDelay={0.18}
            />
          </div>

          {/* Progress pip */}
          <motion.div
            className="mt-5 h-[1px] bg-white/10 relative overflow-hidden"
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 bg-white/60"
              initial={{ width: "0%" }}
              animate={{ width: isActive ? "100%" : "0%" }}
              transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
            />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── MAIN SECTION ──────────────────────────────────────────────────────── */

export function WorkflowSection() {
  const total = processSteps.length;
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sectionComplete, setSectionComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* Detect mobile */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /**
   * Scroll the page so that the sticky section shows the requested step.
   *
   * The section's total scrollable distance maps like this:
   *   0%   → top of section (header entry zone, first ~15% of progress)
   *   100% → bottom of section
   *
   * We want step `idx` to sit at progress P where:
   *   cardProgress = (P - 0.15) / 0.80  →  P = 0.15 + idx/(total-1) * 0.80
   *
   * Then: scrollY = sectionTop + P * scrollableHeight
   *   where scrollableHeight = sectionHeight - viewportHeight
   */
  const scrollToStep = (idx) => {
    const el = sectionRef.current;
    if (!el) return;
    const sectionTop = el.getBoundingClientRect().top + window.scrollY;
    const sectionHeight = el.offsetHeight;
    const vh = window.innerHeight;
    const scrollable = sectionHeight - vh;
    const progress = 0.15 + (idx / Math.max(total - 1, 1)) * 0.8;
    const targetY = sectionTop + progress * scrollable;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  /* ── Scroll tracking ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* Header reveal uses top-of-section scroll */
  const { scrollYProgress: entryProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "start 30%"],
  });

  /* Smoothed progress for card transitions */
  const smoothProgress = useSmooth(scrollYProgress, {
    stiffness: 60,
    damping: 18,
  });

  /* Drive active step from scroll */
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      if (v >= 0.98) {
        setSectionComplete(true);
      } else {
        setSectionComplete(false);
      }
      // Reserve first ~15% for header entry; last ~5% for exit
      const cardProgress = clamp((v - 0.15) / 0.8, 0, 1);
      const idx = Math.min(Math.round(cardProgress * (total - 1)), total - 1);
      setActiveIndex(idx);
    });
    return unsub;
  }, [scrollYProgress, total]);

  /* ── Header animations from entryProgress ── */
  const lineWidth = useTransform(entryProgress, [0, 1], ["0%", "100%"]);
  const titleY = useTransform(entryProgress, [0, 1], [40, 0]);
  const titleOpacity = useTransform(entryProgress, [0, 0.6], [0, 1]);
  const subtitleY = useTransform(entryProgress, [0.2, 1], [24, 0]);
  const subtitleOpacity = useTransform(entryProgress, [0.2, 1], [0, 1]);

  /* Mobile: simple vertical stack, no sticky */
  if (isMobile) {
    return (
      <section
        id="process"
        className="border-b-2 border-[var(--black)] bg-[var(--black)] px-6 py-20 text-[var(--white)]"
      >
        <SectionHeader number="05" title="WORKFLOW / PROCESS" inverted />
        <p className="reveal mb-10 max-w-[640px] text-[0.72rem] leading-[1.9] text-white/55">
          A visual run-through of how I move from clarity to shipment. Each card
          highlights one stage in the delivery sequence.
        </p>
        <div className="flex flex-col gap-6">
          {processSteps.map((step, index) => (
            <article
              key={step.step}
              className="border border-white/15 bg-white/5"
            >
              <div className="overflow-hidden">
                <img
                  src={VISUALS[index % VISUALS.length]}
                  alt={step.title}
                  loading="lazy"
                  className="h-[180px] w-full object-cover grayscale"
                />
              </div>
              <div className="px-5 py-5">
                <div className="font-display text-[3rem] leading-none tracking-[0.02em] text-white/90">
                  {step.step}
                </div>
                <div className="mt-2 text-[0.58rem] font-bold uppercase tracking-[0.16em] text-white/80">
                  {step.title}
                </div>
                <p className="mt-2 text-[0.68rem] leading-[1.8] text-white/55">
                  {step.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  /* ── Desktop: sticky scroll experience ── */
  return (
    <section
      id="process"
      ref={sectionRef}
      className="border-b-2 border-[var(--black)] bg-[var(--black)] text-[var(--white)]"
      style={{
        /* The outer section is tall so the sticky inner can pin */
        minHeight: `${total * PIN_MULTIPLIER * 100}vh`,
        position: "relative",
      }}
    >
      {/* ── Sticky wrapper ── */}
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ willChange: "transform" }}
      >
        {/* Background subtle grain texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
            opacity: 0.6,
            zIndex: 0,
          }}
        />

        <div className="relative z-10 h-full flex flex-col px-6 md:px-12">
          {/* ── Section header (animated on entry) ── */}
          <div className="pt-12 pb-6 flex-shrink-0">
            {/* Section number + line */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[0.58rem] font-bold uppercase tracking-[0.3em] text-white/30">
                05
              </span>
              <div className="flex-1 h-[1px] bg-white/10 relative overflow-hidden max-w-[180px]">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-white/40"
                  style={{ width: lineWidth }}
                />
              </div>
            </div>

            <div className="overflow-hidden">
              <motion.h2
                className="font-display text-[2.2rem] leading-none tracking-[0.06em] md:text-[3.2rem]"
                style={{ y: titleY, opacity: titleOpacity }}
              >
                WORKFLOW / PROCESS
              </motion.h2>
            </div>

            <motion.p
              className="mt-3 max-w-[500px] text-[0.68rem] leading-[1.9] text-white/45"
              style={{ y: subtitleY, opacity: subtitleOpacity }}
            >
              A visual run-through of how I move from clarity to shipment. Each
              step becomes the hero before handing off to the next.
            </motion.p>
          </div>

          {/* ── Cards stage ── */}
          <div className="flex-1 flex items-center justify-center relative">
            {/* Cards container — cards are absolutely positioned inside */}
            <div
              className="relative w-full"
              style={{
                maxWidth: "420px",
                height: "min(62vh, 560px)",
              }}
            >
              {processSteps.map((step, index) => (
                <WorkflowCard
                  key={step.step}
                  step={step}
                  index={index}
                  activeIndex={activeIndex}
                  totalSteps={total}
                />
              ))}
            </div>

            {/* ── Step indicators (right side) — clickable ── */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-3 items-end">
              {processSteps.map((step, index) => {
                const isActive = index === activeIndex;
                const isPast = index < activeIndex;
                return (
                  <button
                    key={step.step}
                    type="button"
                    aria-label={`Go to step ${step.step}: ${step.title}`}
                    onClick={() => scrollToStep(index)}
                    className="flex items-center gap-3 group"
                    style={{
                      background: "none",
                      border: "none",
                      padding: "4px 0",
                      cursor: "pointer",
                    }}
                  >
                    <motion.span
                      className="text-[0.55rem] uppercase tracking-[0.2em] transition-colors duration-200"
                      animate={{
                        opacity: isActive ? 0.9 : isPast ? 0.3 : 0.15,
                        x: isActive ? 0 : 6,
                      }}
                      whileHover={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                      style={{ color: "white" }}
                    >
                      {step.title.split(" ")[0]}
                    </motion.span>
                    <motion.div
                      animate={{
                        width: isActive ? 20 : 6,
                        height: 2,
                        opacity: isActive ? 1 : isPast ? 0.4 : 0.15,
                        backgroundColor: isActive
                          ? "rgba(255,255,255,1)"
                          : "rgba(255,255,255,0.4)",
                      }}
                      whileHover={{
                        width: 14,
                        opacity: 0.7,
                        backgroundColor: "rgba(255,255,255,0.8)",
                      }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="rounded-full"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Bottom step counter ── */}
          <div className="flex-shrink-0 pb-8 flex items-center gap-6">
            <div className="flex gap-2">
              {processSteps.map((step, i) => (
                <motion.button
                  key={i}
                  type="button"
                  aria-label={`Go to step ${step.step}: ${step.title}`}
                  onClick={() => scrollToStep(i)}
                  className="rounded-full"
                  style={{ border: "none", padding: 0, cursor: "pointer" }}
                  animate={{
                    width: i === activeIndex ? 24 : 6,
                    height: 6,
                    backgroundColor:
                      i === activeIndex
                        ? "rgba(255,255,255,0.9)"
                        : i < activeIndex
                          ? "rgba(255,255,255,0.35)"
                          : "rgba(255,255,255,0.12)",
                  }}
                  whileHover={{
                    backgroundColor: "rgba(255,255,255,0.6)",
                    width: i === activeIndex ? 24 : 10,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              ))}
            </div>
            <span className="text-[0.55rem] uppercase tracking-[0.2em] text-white/25">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>

            {/* Completion brightness surge */}
            <AnimatePresence>
              {sectionComplete && (
                <motion.span
                  className="text-[0.55rem] uppercase tracking-[0.2em] text-white/60 ml-auto"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                >
                  All steps complete ↓
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Brightness surge on last step ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none bg-white"
          animate={{ opacity: sectionComplete ? 0.03 : 0 }}
          transition={{ duration: 1.2 }}
        />
      </div>
    </section>
  );
}

export default WorkflowSection;
