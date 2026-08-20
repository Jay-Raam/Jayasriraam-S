import { motion } from 'framer-motion';
import { bookshelf, type BookItem } from '../data/portfolio';
import { SectionHeader } from './SectionHeader';

function BookIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current stroke-[1.5]" fill="none">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
    );
}

function StatusBadge({ status }: { status: BookItem['status'] }) {
    const styles = {
        reading: 'bg-[var(--accent2)] text-[var(--white)]',
        completed: 'bg-[var(--black)] text-[var(--white)]',
        wishlist: 'border border-[var(--black)] text-[var(--black)] bg-transparent',
    };

    const labels = {
        reading: 'Reading Now',
        completed: 'Completed',
        wishlist: 'On Wishlist',
    };

    return (
        <span className={`inline-block px-2.5 py-1 text-[0.5rem] font-bold uppercase tracking-[0.18em] ${styles[status]}`}>
            {labels[status]}
        </span>
    );
}

function BookCard({ book, index }: { book: BookItem; index: number }) {
    const EASE = [0.16, 1, 0.3, 1] as const;

    return (
        <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
            className="group flex gap-5 border-2 border-[var(--black)] bg-[var(--white)] px-6 py-6 transition-colors duration-300 hover:bg-[var(--black)] hover:text-[var(--white)]"
        >
            {/* Book spine visual */}
            <div className="flex h-16 w-10 shrink-0 items-center justify-center border border-[var(--black)]/20 bg-[var(--black)]/5 text-[var(--black)]/30 transition-colors duration-300 group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white/30">
                <BookIcon />
            </div>

            <div className="flex flex-1 flex-col">
                <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-[1rem] tracking-[0.04em] leading-[1.2]">
                        {book.title}
                    </h3>
                    <StatusBadge status={book.status} />
                </div>

                <div className="mt-1 flex items-center gap-2">
                    <span className="text-[0.62rem] tracking-[0.05em] text-[var(--gray)] transition-colors duration-300 group-hover:text-white/55">
                        {book.author}
                    </span>
                    <span className="text-black/20 transition-colors duration-300 group-hover:text-white/20">·</span>
                    <span className="text-[0.55rem] uppercase tracking-[0.15em] text-[var(--accent2)] transition-colors duration-300 group-hover:text-[var(--accent2)]">
                        {book.genre}
                    </span>
                </div>

                {book.note && (
                    <p className="mt-2.5 text-[0.65rem] leading-[1.85] text-black/68 transition-colors duration-300 group-hover:text-white/55 italic">
                        "{book.note}"
                    </p>
                )}
            </div>
        </motion.div>
    );
}

export function Bookshelf() {
    const EASE = [0.16, 1, 0.3, 1] as const;

    return (
        <section id="bookshelf" className="border-b-2 border-[var(--black)] bg-[var(--white)] px-6 py-20 md:px-12 md:py-28">
            <SectionHeader number="09" title="BOOKSHELF" />

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                className="mb-10 max-w-[520px]"
            >
                <p className="font-serif text-[0.85rem] italic leading-[1.9] text-[var(--gray)]">
                    Books that shaped how I think about code, life, and everything in between.
                    A developer reads too — not just documentation.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {bookshelf.map((book, index) => (
                    <BookCard key={book.title} book={book} index={index} />
                ))}
            </div>
        </section>
    );
}
