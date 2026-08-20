import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { timeline, type TimelineEvent } from '../data/portfolio';
import { SectionHeader } from './SectionHeader';

function TimelineIcon({ icon }: { icon: TimelineEvent['icon'] }) {
    const className = 'h-5 w-5 stroke-current stroke-[1.8]';

    switch (icon) {
        case 'start':
            return (
                <svg viewBox="0 0 24 24" className={className} fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
            );
        case 'edu':
            return (
                <svg viewBox="0 0 24 24" className={className} fill="none">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
            );
        case 'work':
            return (
                <svg viewBox="0 0 24 24" className={className} fill="none">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
            );
        case 'milestone':
            return (
                <svg viewBox="0 0 24 24" className={className} fill="none">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                    <line x1="4" y1="22" x2="4" y2="15" />
                </svg>
            );
        case 'current':
            return (
                <svg viewBox="0 0 24 24" className={className} fill="none">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
                </svg>
            );
    }
}

function TimelineNode({ event, index, isLast }: { event: TimelineEvent; index: number; isLast: boolean }) {
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false
    );
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    const EASE = [0.16, 1, 0.3, 1] as const;
    const isLeft = index % 2 === 0;

    return (
        <div className={`relative flex items-stretch ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            {/* Content card */}
            <motion.div
                initial={{ x: isMobile ? 0 : (isLeft ? -40 : 40), y: isMobile ? 20 : 0, opacity: 0 }}
                whileInView={{ x: 0, y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
                className={`w-full md:w-[calc(50%-2rem)] border-2 border-[var(--black)] bg-[var(--white)] px-7 py-7 transition-colors duration-300 hover:bg-[var(--black)] hover:text-[var(--white)] group ${
                    isLeft ? 'md:mr-auto' : 'md:ml-auto'
                }`}
            >
                <div className="text-[0.58rem] font-bold uppercase tracking-[0.24em] text-[var(--accent2)]">
                    {event.year}
                </div>
                <h3 className="mt-2 font-display text-[1.4rem] leading-[1.1] tracking-[0.04em] md:text-[1.6rem]">
                    {event.title}
                </h3>
                <p className="mt-3 text-[0.7rem] leading-[1.85] text-black/75 transition-colors duration-300 group-hover:text-white/65">
                    {event.description}
                </p>
            </motion.div>

            {/* Center line + icon (desktop only) */}
            <div className="pointer-events-none absolute left-1/2 top-0 hidden -translate-x-1/2 md:flex md:flex-col md:items-center">
                {/* Dot */}
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 + 0.2, ease: EASE }}
                    className="z-10 flex h-10 w-10 items-center justify-center border-2 border-[var(--black)] bg-[var(--white)] text-[var(--black)]"
                    style={{ marginTop: '1.5rem' }}
                >
                    <TimelineIcon icon={event.icon} />
                </motion.div>

                {/* Line */}
                {!isLast && (
                    <div className="w-[2px] flex-1 bg-[var(--black)]/15" style={{ minHeight: '4rem' }} />
                )}
            </div>

            {/* Mobile dot */}
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                className="absolute -left-8 top-7 z-10 flex h-8 w-8 items-center justify-center border-2 border-[var(--black)] bg-[var(--white)] text-[var(--black)] md:hidden"
            >
                <TimelineIcon icon={event.icon} />
            </motion.div>
        </div>
    );
}

export function JourneyTimeline() {
    return (
        <section id="journey" className="border-b-2 border-[var(--black)] bg-[var(--white)] px-6 py-20 overflow-hidden md:px-12 md:py-28">
            <SectionHeader number="06" title="MY STORY" />

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-14 max-w-[520px]"
            >
                <p className="font-serif text-[0.85rem] italic leading-[1.9] text-[var(--gray)]">
                    From a curious student in Dindigul to building production apps in Chennai — here's the path that shaped me.
                </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative flex flex-col gap-6 pl-8 md:pl-0">
                {/* Vertical line (desktop) */}
                <div className="pointer-events-none absolute left-[15px] top-0 bottom-0 w-[2px] bg-[var(--black)]/10 md:left-1/2 md:-translate-x-1/2" />

                {timeline.map((event, index) => (
                    <TimelineNode
                        key={event.year}
                        event={event}
                        index={index}
                        isLast={index === timeline.length - 1}
                    />
                ))}
            </div>
        </section>
    );
}
