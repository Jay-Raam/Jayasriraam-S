import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type PreloaderProps = {
    onComplete: () => void;
};

const NAME = 'JAYASRIRAM';

function LetterRow({
    text,
    delay,
    className,
}: {
    text: string;
    delay: number;
    className?: string;
}) {
    return (
        <span aria-label={text} className={`inline-flex overflow-hidden ${className ?? ''}`}>
            {text.split('').map((char, i) => (
                <span key={i} aria-hidden className="inline-block overflow-hidden">
                    <motion.span
                        className="inline-block"
                        initial={{ y: '110%' }}
                        animate={{ y: '0%' }}
                        transition={{
                            duration: 0.7,
                            delay: delay + i * 0.035,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        {char}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}

export function Preloader({ onComplete }: PreloaderProps) {
    const [done, setDone] = useState(false);
    const [count, setCount] = useState(0);

    // Fake counter 0 → 100
    useEffect(() => {
        const start = performance.now();
        const duration = 1400;
        let raf = 0;
        const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.round(eased * 100));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, []);

    // Finish sequence
    useEffect(() => {
        const t1 = window.setTimeout(() => setDone(true), 1750);
        const t2 = window.setTimeout(() => onComplete(), 2450);
        return () => {
            window.clearTimeout(t1);
            window.clearTimeout(t2);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    className="fixed inset-0 z-[120] overflow-hidden bg-[var(--black)] text-[var(--white)]"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    aria-hidden="true"
                >
                    {/* Giant ghost JS mark */}
                    <motion.div
                        className="pointer-events-none absolute bottom-[-4rem] left-[-1rem] font-display text-[clamp(14rem,40vw,34rem)] leading-none text-white/[0.04]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        JS
                    </motion.div>

                    {/* Center content */}
                    <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            className="text-[0.6rem] font-bold uppercase tracking-[0.45em] text-[var(--accent2)]"
                        >
                            Full Stack Developer
                        </motion.div>

                        <div className="font-display text-[clamp(2.6rem,9vw,7rem)] leading-[0.92] tracking-[0.04em]">
                            <LetterRow text={NAME} delay={0.25} />
                        </div>
                        <div className="font-display text-[clamp(1.6rem,5vw,3.6rem)] leading-[0.92] tracking-[0.28em]">
                            <LetterRow text="S" delay={0.25 + NAME.length * 0.035} className="text-[var(--accent2)]" />
                        </div>

                        {/* progress */}
                        <div className="mt-4 flex w-full max-w-[240px] items-center gap-4">
                            <div className="relative h-[2px] flex-1 overflow-hidden bg-white/10">
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-[var(--accent2)]"
                                    style={{ width: `${count}%` }}
                                    transition={{ ease: 'linear' }}
                                />
                            </div>
                            <span className="text-[0.62rem] tabular-nums tracking-[0.2em] text-white/40">
                                {count}%
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
