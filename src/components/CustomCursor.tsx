import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Custom cursor: a small instant dot + a springy trailing ring.
 * Only rendered on fine pointers (mouse/trackpad). Disabled on touch.
 * Ring scales up over interactive elements (a, button, [data-cursor]).
 */
export function CustomCursor() {
    const [enabled, setEnabled] = useState(false);
    const [hovering, setHovering] = useState(false);
    const [visible, setVisible] = useState(false);

    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const ringX = useSpring(x, { stiffness: 350, damping: 32, mass: 0.6 });
    const ringY = useSpring(y, { stiffness: 350, damping: 32, mass: 0.6 });

    useEffect(() => {
        const mq = window.matchMedia('(pointer: fine)');
        setEnabled(mq.matches);
        if (!mq.matches) return;

        const onMove = (event: MouseEvent) => {
            x.set(event.clientX);
            y.set(event.clientY);
            setVisible(true);
        };

        const onOver = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;
            const interactive = target?.closest(
                'a, button, [role="button"], [data-cursor], input, textarea, select, label',
            );
            setHovering(!!interactive);
        };

        const onLeave = () => setVisible(false);
        const onEnter = () => setVisible(true);

        window.addEventListener('mousemove', onMove, { passive: true });
        document.addEventListener('mouseover', onOver, { passive: true });
        document.documentElement.addEventListener('mouseleave', onLeave);
        document.documentElement.addEventListener('mouseenter', onEnter);

        return () => {
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseover', onOver);
            document.documentElement.removeEventListener('mouseleave', onLeave);
            document.documentElement.removeEventListener('mouseenter', onEnter);
        };
    }, [x, y]);

    if (!enabled) return null;

    return (
        <>
            {/* trailing ring */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[130] h-9 w-9 rounded-full border border-white mix-blend-difference"
                style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
                animate={{
                    scale: hovering ? 1.9 : 1,
                    opacity: visible ? 1 : 0,
                }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                aria-hidden="true"
            />
            {/* instant dot */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[130] h-[5px] w-[5px] rounded-full bg-white mix-blend-difference"
                style={{ x, y, translateX: '-50%', translateY: '-50%' }}
                animate={{
                    scale: hovering ? 0.4 : 1,
                    opacity: visible ? 1 : 0,
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                aria-hidden="true"
            />
        </>
    );
}
