import { motion } from 'framer-motion';
import { kavithaigal, type Kavithai } from '../data/portfolio';
import { SectionHeader } from './SectionHeader';

function KavithaiCard({ item, index }: { item: Kavithai; index: number }) {
    const EASE = [0.16, 1, 0.3, 1] as const;

    return (
        <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
            className="group relative border-2 border-[var(--black)] bg-[var(--white)] px-8 py-10 transition-colors duration-300 hover:bg-[var(--black)] hover:text-[var(--white)]"
        >
            {/* Decorative corner quote mark */}
            <div className="absolute right-4 top-3 font-display text-[4rem] leading-none text-black/5 transition-colors duration-300 group-hover:text-white/8">
                "
            </div>

            {/* Tamil verse */}
            <p className="kavithai-tamil relative z-10 whitespace-pre-line text-[1.3rem] leading-[2] text-[var(--black)] transition-colors duration-300 group-hover:text-[var(--white)]">
                {item.tamil}
            </p>

            {/* Divider */}
            <div className="my-5 h-[1px] w-12 bg-[var(--accent2)]" />

            {/* English translation */}
            <p className="whitespace-pre-line font-serif text-[0.82rem] italic leading-[1.9] text-[var(--gray)] transition-colors duration-300 group-hover:text-white/60">
                {item.english}
            </p>

            {item.author && (
                <div className="mt-4 text-[0.55rem] uppercase tracking-[0.2em] text-[var(--accent2)]">
                    — {item.author}
                </div>
            )}
        </motion.div>
    );
}

export function TamilKavithai() {
    const EASE = [0.16, 1, 0.3, 1] as const;

    return (
        <section id="kavithai" className="border-b-2 border-[var(--black)] bg-[var(--white)] px-6 py-20 md:px-12 md:py-28">
            <SectionHeader number="07" title="தமிழ் கவிதை" />

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                className="mb-10 max-w-[520px]"
            >
                <p className="font-serif text-[0.85rem] italic leading-[1.9] text-[var(--gray)]">
                    Words that live in my heart — Tamil verses about love, life, rain, and the sea.
                    These are the lines I write when code sleeps and the poet wakes.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {kavithaigal.map((item, index) => (
                    <KavithaiCard key={index} item={item} index={index} />
                ))}
            </div>
        </section>
    );
}
