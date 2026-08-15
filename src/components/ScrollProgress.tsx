import { motion, useScroll } from 'framer-motion';

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    return (
        <motion.div
            className="fixed inset-x-0 top-0 z-[110] h-[3px] origin-left bg-[var(--accent2)]"
            style={{ scaleX: scrollYProgress }}
            aria-hidden="true"
        />
    );
}
