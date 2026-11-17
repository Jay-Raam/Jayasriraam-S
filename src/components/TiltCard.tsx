import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '../lib/prefersReducedMotion';

type TiltCardProps = {
    children: ReactNode;
    className?: string;
    maxTilt?: number;
};

/** Wraps children with a subtle cursor-driven 3D tilt; no-op on touch/reduced-motion. */
export function TiltCard({ children, className = '', maxTilt = 5 }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const reducedMotion = usePrefersReducedMotion();

    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const springX = useSpring(rotateX, { stiffness: 220, damping: 22, mass: 0.5 });
    const springY = useSpring(rotateY, { stiffness: 220, damping: 22, mass: 0.5 });

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        if (reducedMotion || event.pointerType !== 'mouse') return;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        rotateY.set(px * maxTilt * 2);
        rotateX.set(-py * maxTilt * 2);
    };

    const handlePointerLeave = () => {
        rotateX.set(0);
        rotateY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            style={{
                rotateX: springX,
                rotateY: springY,
                transformPerspective: 800,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
