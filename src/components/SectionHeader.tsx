import { motion } from 'framer-motion';

type SectionHeaderProps = {
    number: string;
    title: string;
    inverted?: boolean;
};

export function SectionHeader({ number, title, inverted = false }: SectionHeaderProps) {
    return (
        <div className="section-header mb-10 flex items-center gap-6 md:mb-16">
            <motion.span
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`font-display text-5xl leading-none md:text-7xl ${inverted ? 'text-white/10' : 'text-black/8'}`}
            >
                {number}
            </motion.span>

            <div className="overflow-hidden">
                <motion.h2
                    initial={{ y: '110%' }}
                    whileInView={{ y: '0%' }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-[2.5rem] leading-none tracking-[0.05em] md:text-[4rem]"
                >
                    {title}
                </motion.h2>
            </div>

            <div className={`section-line h-[2px] flex-1 ${inverted ? 'bg-white' : 'bg-[var(--black)]'}`} />
        </div>
    );
}
