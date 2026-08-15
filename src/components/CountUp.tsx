import { useEffect, useRef } from 'react';
import {
    animate,
    motion,
    useInView,
    useMotionValue,
    useTransform,
} from 'framer-motion';

type CountUpProps = {
    value: number;
    suffix?: string;
    duration?: number;
    className?: string;
};

export function CountUp({ value, suffix = '', duration = 1.6, className }: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    const mv = useMotionValue(0);
    const display = useTransform(mv, (v) => Math.round(v).toString());

    useEffect(() => {
        if (!inView) return;
        const controls = animate(mv, value, {
            duration,
            ease: [0.16, 1, 0.3, 1],
        });
        return () => controls.stop();
    }, [inView, value, duration, mv]);

    return (
        <span ref={ref} className={className}>
            <motion.span className="tabular-nums">{display}</motion.span>
            {suffix}
        </span>
    );
}
