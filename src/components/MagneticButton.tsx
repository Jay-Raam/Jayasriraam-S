import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '../lib/prefersReducedMotion';

type MagneticButtonProps = {
    children: ReactNode;
    className?: string;
    strength?: number;
};

/** Wraps a button/link so it pulls gently toward the cursor within its bounds; no-op on touch/reduced-motion. */
export function MagneticButton({ children, className = '', strength = 0.35 }: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const reducedMotion = usePrefersReducedMotion();

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
    const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        if (reducedMotion || event.pointerType !== 'mouse') return;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * strength);
        y.set((event.clientY - rect.top - rect.height / 2) * strength);
    };

    const handlePointerLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            style={{ x: springX, y: springY }}
            className={`inline-block ${className}`}
        >
            {children}
        </motion.div>
    );
}
