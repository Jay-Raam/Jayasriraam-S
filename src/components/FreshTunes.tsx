/**
 * FreshTunes — Scroll-driven cinematic song showcase
 *
 * Drop-in replacement for the existing #music section in App.tsx.
 * Requires: framer-motion (already a common dep in Vite/CRA React stacks).
 *
 * Usage:
 *   import { FreshTunes } from './components/FreshTunes';
 *   // Replace the <section id="music"> block with:
 *   <FreshTunes tracks={musicTracks} />
 */

import { useRef } from 'react';
import React from 'react';
import {
    motion,
    useScroll,
    useTransform,
    MotionValue,
} from 'framer-motion';

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
export interface MusicTrack {
    title: string;
    artist: string;
    image: string;
    link: string;
    album?: string;
    year?: string | number;
    genre?: string;
    description?: string;
}

interface FreshTunesProps {
    tracks: MusicTrack[];
}

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */

// Each song occupies this many px of scroll range
const SCROLL_PER_TRACK = 400;

/* ─────────────────────────────────────────────
   Single animated song card
───────────────────────────────────────────── */
function SongCard({
    track,
    index,
    total,
    scrollProgress,
}: {
    track: MusicTrack;
    index: number;
    total: number;
    scrollProgress: MotionValue<number>;
}) {
    // Normalise progress to this card's "slot" [0 → 1]
    // Each card occupies 1/total of the scroll range.
    // We add a small bleed so transitions feel comfortable.
    const slotSize = 1 / total;
    const start = index * slotSize;
    const end = start + slotSize;

    // 0–1 within the card's own slot
    const localProgress = useTransform(scrollProgress, [start, end], [0, 1], {
        clamp: true,
    });

    // Entry (first half of slot): 0 → 0.45
    // Exit  (second half of slot): 0.55 → 1
    const imageScale = useTransform(localProgress, [0, 0.35, 0.65, 1], [0.88, 1, 1, 0.9]);
    const imageOpacity = useTransform(localProgress, [0, 0.2, 0.7, 1], [0, 1, 1, 0]);
    const imageBlur = useTransform(localProgress, [0, 0.2, 0.7, 1], [12, 0, 0, 8]);

    const textY = useTransform(localProgress, [0, 0.35, 0.65, 1], [28, 0, 0, -20]);

    const overlayOpacity = useTransform(localProgress, [0, 0.25, 0.7, 1], [0, 1, 1, 0]);

    // Blur as a CSS string
    const filterValue = useTransform(imageBlur, (v) => `blur(${v}px)`);

    return (
        <motion.div
            style={{ opacity: imageOpacity }}
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden={true}
        >
            {/* ── Cover image ── */}
            <motion.div
                style={{ scale: imageScale, filter: filterValue }}
                className="relative"
            >
                {/* Glow behind cover */}
                <div
                    className="absolute inset-0 rounded-[2px] opacity-40 blur-2xl"
                    style={{
                        background:
                            'radial-gradient(ellipse at 50% 70%, rgba(255,255,255,0.18) 0%, transparent 70%)',
                        transform: 'scale(1.25) translateY(10%)',
                    }}
                />

                <a
                    href={track.link}
                    target="_blank"
                    rel="noreferrer"
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    tabIndex={-1}
                >
                    <div
                        className="relative overflow-hidden"
                        style={{
                            width: 'min(52vw, 420px)',
                            height: 'min(52vw, 420px)',
                            boxShadow:
                                '0 32px 96px rgba(0,0,0,0.65), 0 4px 24px rgba(0,0,0,0.45)',
                        }}
                    >
                        <img
                            src={track.image}
                            alt={track.title}
                            loading="eager"
                            className="h-full w-full object-cover"
                        />

                        {/* Subtle inner vignette */}
                        <div className="pointer-events-none absolute inset-0" style={{
                            background: 'radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(0,0,0,0.35) 100%)'
                        }} />

                        {/* Vinyl play overlay on hover */}
                        <div className="vinyl-hover-overlay absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 hover:opacity-100">
                            <div className="vinyl-disc" />
                            <svg className="absolute h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>

                        {/* Bottom-left gradient for text overlap */}
                        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-2/3" style={{
                            background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)'
                        }} />

                        {/* ── Song details overlaid on image ── */}
                        <motion.div
                            style={{ y: textY, opacity: overlayOpacity }}
                            className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-10"
                        >
                            {track.genre && (
                                <div className="mb-1.5 text-[0.52rem] font-bold uppercase tracking-[0.28em] text-white/50">
                                    {track.genre}
                                </div>
                            )}
                            <h3
                                className="font-display text-[1.35rem] leading-[1.1] tracking-[0.02em] text-white md:text-[1.7rem]"
                                style={{ textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}
                            >
                                {track.title}
                            </h3>
                            <div className="mt-1.5 flex items-center gap-2">
                                <span className="text-[0.7rem] tracking-[0.06em] text-white/70">
                                    {track.artist}
                                </span>
                                {track.album && (
                                    <>
                                        <span className="text-white/30">·</span>
                                        <span className="text-[0.65rem] text-white/45">{track.album}</span>
                                    </>
                                )}
                                {track.year && (
                                    <>
                                        <span className="text-white/30">·</span>
                                        <span className="text-[0.65rem] text-white/45">{track.year}</span>
                                    </>
                                )}
                            </div>
                            {track.description && (
                                <p className="mt-2.5 max-w-[30ch] text-[0.62rem] leading-[1.7] text-white/50">
                                    {track.description}
                                </p>
                            )}
                        </motion.div>
                    </div>
                </a>

                {/* Track number badge — outside image, top-right */}
                <div
                    className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center border border-white/12 bg-[#0a0a0a] text-[0.6rem] font-bold tracking-[0.1em] text-white/40"
                    style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                    {String(index + 1).padStart(2, '0')}
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   Progress dots — clickable, scroll to track
───────────────────────────────────────────── */
function ProgressDots({
    total,
    scrollProgress,
    containerRef,
}: {
    total: number;
    scrollProgress: MotionValue<number>;
    containerRef: React.RefObject<HTMLDivElement>;
}) {
    /**
     * Scroll the page so that track `idx` is centred in the sticky viewport.
     *
     * The section total height = tracks × SCROLL_PER_TRACK + viewportHeight.
     * Each track occupies 1/total of the scrollable range.
     * We aim for the mid-point of each slot: progress = (idx + 0.5) / total
     */
    const scrollToTrack = (idx: number) => {
        const el = containerRef.current;
        if (!el) return;
        const sectionTop = el.getBoundingClientRect().top + window.scrollY;
        const sectionHeight = el.offsetHeight;
        const vh = window.innerHeight;
        const scrollable = sectionHeight - vh;
        const progress = (idx + 0.5) / total;
        const targetY = sectionTop + progress * scrollable;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
    };

    return (
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2">
            {Array.from({ length: total }).map((_, i) => {
                const slotSize = 1 / total;
                const start = i * slotSize;
                const end = start + slotSize;

                // eslint-disable-next-line react-hooks/rules-of-hooks
                const dotScale = useTransform(
                    scrollProgress,
                    [start, start + slotSize * 0.4, end - slotSize * 0.4, end],
                    [1, 1.4, 1.4, 1]
                );
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const dotOpacity = useTransform(
                    scrollProgress,
                    [start, start + slotSize * 0.4, end - slotSize * 0.4, end],
                    [0.25, 1, 1, 0.25]
                );

                return (
                    <motion.button
                        key={i}
                        type="button"
                        aria-label={`Go to track ${i + 1}`}
                        onClick={() => scrollToTrack(i)}
                        style={{ scale: dotScale, opacity: dotOpacity }}
                        whileHover={{ scale: 1.9, opacity: 1 }}
                        transition={{ duration: 0.18 }}
                        className="h-1.5 w-1.5 rounded-full bg-white cursor-pointer border-none p-0 outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    />
                );
            })}
        </div>
    );
}

/* ─────────────────────────────────────────────
   Scroll hint arrow
───────────────────────────────────────────── */
function ScrollHint({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    const opacity = useTransform(scrollProgress, [0, 0.15], [1, 0]);
    return (
        <motion.div
            style={{ opacity }}
            className="pointer-events-none absolute bottom-16 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        >
            <span className="text-[0.5rem] uppercase tracking-[0.3em] text-white/35">Scroll</span>
            <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
                <svg className="h-4 w-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </motion.div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   Section counter / heading
───────────────────────────────────────────── */
function SectionMeta() {
    return (
        <div className="absolute left-6 top-8 flex flex-col gap-1 md:left-10">
            <div className="text-[0.52rem] mt-2.5 font-bold uppercase tracking-[0.3em] text-white/30">
                08 / Fresh Tunes
            </div>
            <div className="mt-1 text-[0.62rem] tracking-[0.05em] text-white/20">
                Tamil classics on repeat
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Main FreshTunes component
───────────────────────────────────────────── */
export function FreshTunes({ tracks }: FreshTunesProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const totalScrollHeight = tracks.length * SCROLL_PER_TRACK;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    return (
        <section
            id="music"
            ref={containerRef}
            style={{ height: `${totalScrollHeight + window.innerHeight}px` }}
            className="relative border-b-2 border-[var(--black,#0a0a0a)] bg-[#050505]"
        >
            {/* ── Sticky viewport ── */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Ambient grain overlay */}
                <div
                    className="pointer-events-none absolute inset-0 z-10 opacity-[0.035]"
                    style={{
                        backgroundImage:
                            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                        backgroundSize: '256px 256px',
                    }}
                />

                {/* Radial ambient light */}
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 100%)',
                    }}
                />

                {/* Corner decorations */}
                <div className="absolute left-4 top-4 h-8 w-8 border-l border-t border-white/10 md:left-8 md:top-8 md:h-12 md:w-12" />
                <div className="absolute right-4 top-4 h-8 w-8 border-r border-t border-white/10 md:right-8 md:top-8 md:h-12 md:w-12" />
                <div className="absolute bottom-4 left-4 h-8 w-8 border-b border-l border-white/10 md:bottom-8 md:left-8 md:h-12 md:w-12" />
                <div className="absolute bottom-4 right-4 h-8 w-8 border-b border-r border-white/10 md:bottom-8 md:right-8 md:h-12 md:w-12" />

                {/* Section label */}
                <SectionMeta />

                {/* ── Song cards stacked, all absolute ── */}
                <div className="absolute inset-0">
                    {tracks.map((track, index) => (
                        <SongCard
                            key={`${track.title}-${index}`}
                            track={track}
                            index={index}
                            total={tracks.length}
                            scrollProgress={scrollYProgress}
                        />
                    ))}
                </div>

                {/* Progress dots — clickable */}
                <ProgressDots
                    total={tracks.length}
                    scrollProgress={scrollYProgress}
                    containerRef={containerRef}
                />

                {/* Scroll hint (fades out after first song) */}
                <ScrollHint scrollProgress={scrollYProgress} />
            </div>

            {/* Inline styles for vinyl disc & hover overlay */}
            <style>{`
                .vinyl-disc {
                    width: 72px;
                    height: 72px;
                    border-radius: 50%;
                    border: 3px solid rgba(255,255,255,0.2);
                    animation: spin 2.5s linear infinite;
                }
                .vinyl-disc::before {
                    content: '';
                    display: block;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: rgba(0,0,0,0.7);
                    margin: auto;
                    margin-top: calc(50% - 9px);
                    border: 1px solid rgba(255,255,255,0.15);
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                .vinyl-hover-overlay { will-change: opacity; }
            `}</style>
        </section>
    );
}

export default FreshTunes;