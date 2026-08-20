import { AnimatePresence, motion } from 'framer-motion';
import { navLinks } from '../data/portfolio';
import { ScrambleText } from './ScrambleText';

type NavbarProps = {
    hidden: boolean;
    menuOpen: boolean;
    onToggleMenu: () => void;
    onCloseMenu: () => void;
};

export function Navbar({ hidden, menuOpen, onToggleMenu, onCloseMenu }: NavbarProps) {
    return (
        <>
            <nav
                className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b-2 border-[var(--black)] bg-[var(--white)] px-5 py-4 transition-transform duration-300 max-w-[100vw] md:px-12 ${hidden ? '-translate-y-full' : 'translate-y-0'
                    }`}
            >
                <a href="#hero" className="font-display text-[1.6rem] tracking-[0.1em] no-underline">
                    JS
                </a>

                <ul className="hidden list-none gap-8 md:flex">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a href={link.href} className="nav-link text-[0.7rem] uppercase tracking-[0.15em] no-underline">
                                <ScrambleText text={link.label} />
                            </a>
                        </li>
                    ))}
                </ul>

                <button
                    type="button"
                    className="flex flex-col gap-[5px] bg-transparent p-1 md:hidden"
                    onClick={onToggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    <span className={`h-[2px] w-6 bg-[var(--black)] transition-all ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
                    <span className={`h-[2px] w-6 bg-[var(--black)] transition-all ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`h-[2px] w-6 bg-[var(--black)] transition-all ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
                </button>
            </nav>

            <AnimatePresence>
                {menuOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed left-0 right-0 top-16 z-40 flex list-none flex-col border-b-2 border-[var(--black)] bg-[var(--black)] px-8 py-6 max-w-[100vw] md:hidden"
                    >
                        {navLinks.map((link, index) => (
                            <motion.li
                                key={link.href}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.32, delay: 0.06 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <a
                                    href={link.href}
                                    onClick={onCloseMenu}
                                    className="flex items-center gap-4 border-b border-white/10 py-4 text-[var(--white)] no-underline"
                                >
                                    <span className="text-[0.55rem] text-[var(--accent2)]">{String(index + 1).padStart(2, '0')}</span>
                                    <span className="flex-1 text-[0.85rem] uppercase tracking-[0.15em]">{link.mobileLabel ?? link.label}</span>
                                    <span className="text-[var(--accent2)]">→</span>
                                </a>
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>

            {/* Tap outside the menu to close */}
            {menuOpen && (
                <div
                    className="fixed inset-0 top-16 z-30 bg-transparent md:hidden"
                    onClick={onCloseMenu}
                    aria-hidden="true"
                />
            )}
        </>
    );
}
