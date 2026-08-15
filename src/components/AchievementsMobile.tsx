import { useRef, useState } from 'react';
import type { UIEvent } from 'react';
import { motion } from 'framer-motion';
import type { AchievementItem } from '../data/portfolio';
import { AchievementIcon } from './AchievementIcon';

type AchievementsMobileProps = {
    achievements: AchievementItem[];
};

/** Mobile-only: horizontal swipe-snap carousel for the Achievements section. */
export function AchievementsMobile({ achievements }: AchievementsMobileProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);

    const onSwipe = (e: UIEvent<HTMLDivElement>) => {
        const el = e.currentTarget;
        const card = el.querySelector<HTMLElement>('[data-card]');
        if (!card) return;
        const step = card.offsetWidth + 12; // gap-3
        setActive(Math.min(Math.round(el.scrollLeft / step), achievements.length - 1));
    };

    const scrollTo = (index: number) => {
        const el = trackRef.current;
        const card = el?.querySelectorAll<HTMLElement>('[data-card]')[index];
        card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    };

    return (
        <>
            <div className="mb-7 flex items-end justify-between gap-4">
                <p className="max-w-[300px] text-[0.72rem] leading-[1.9] text-black/72">
                    Quick hits from the journey so far — swipe through.
                </p>
                <span className="shrink-0 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-[var(--accent2)]">
                    Swipe →
                </span>
            </div>

            <div
                ref={trackRef}
                onScroll={onSwipe}
                className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2"
            >
                {achievements.map((achievement, index) => (
                    <motion.article
                        key={achievement.title}
                        data-card
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="relative flex w-[76vw] max-w-[300px] shrink-0 snap-center flex-col gap-4 border-2 border-[var(--black)] bg-[var(--white)] p-6"
                    >
                        <div className="pointer-events-none absolute right-3 top-1 font-display text-7xl leading-none text-black/[0.06]">
                            {String(index + 1).padStart(2, '0')}
                        </div>

                        <div className="flex h-12 w-12 items-center justify-center border-2 border-[var(--accent2)] bg-[var(--accent2)]/8 text-[var(--accent2)]">
                            <AchievementIcon icon={achievement.icon} />
                        </div>

                        <div className="font-syne text-[0.78rem] font-extrabold uppercase leading-[1.35] tracking-[0.12em]">
                            {achievement.title}
                        </div>

                        <p className="text-[0.7rem] leading-[1.8] text-black/75">{achievement.text}</p>

                        <div className="mt-auto flex items-center gap-2 pt-1">
                            <span className="h-[2px] w-8 bg-[var(--accent2)]" />
                            <span className="text-[0.55rem] uppercase tracking-[0.2em] text-black/55">
                                Achievement
                            </span>
                        </div>
                    </motion.article>
                ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
                {achievements.map((achievement, i) => (
                    <button
                        key={achievement.title}
                        type="button"
                        aria-label={`Go to achievement ${i + 1}`}
                        onClick={() => scrollTo(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === active ? 'w-7 bg-[var(--accent2)]' : 'w-1.5 bg-black/20'
                        }`}
                    />
                ))}
            </div>
        </>
    );
}
