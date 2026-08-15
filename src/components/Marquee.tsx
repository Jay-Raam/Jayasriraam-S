import { Fragment } from 'react';

type MarqueeProps = {
    items: string[];
    className?: string;
    /** How many times the word list is duplicated for a seamless loop (min 2). */
    repeats?: number;
    /** Alternate solid / outline text for the mew-style look. */
    outlineAlternate?: boolean;
    /** Seconds per full loop. */
    speed?: number;
};

export function Marquee({
    items,
    className = '',
    repeats = 2,
    outlineAlternate = true,
    speed = 32,
}: MarqueeProps) {
    const words = Array.from({ length: repeats }, (_, r) => (
        <Fragment key={r}>
            {items.map((item, i) => {
                const outline = outlineAlternate && i % 2 === 1;
                return (
                    <span key={`${r}-${i}`} className="inline-flex items-center">
                        <span className={`inline-block whitespace-nowrap px-6 font-display text-[clamp(2.4rem,6vw,5rem)] leading-none tracking-[0.02em] ${outline ? 'text-stroke' : ''}`}>
                            {item}
                        </span>
                        <span className="inline-block text-[clamp(1.4rem,3vw,2.4rem)] text-[var(--accent2)]">
                            ✦
                        </span>
                    </span>
                );
            })}
        </Fragment>
    ));

    return (
        <div className={`marquee ${className}`}>
            <div
                className="marquee-track"
                style={{ animationDuration: `${speed}s` }}
                aria-hidden="true"
            >
                {words}
            </div>
        </div>
    );
}
