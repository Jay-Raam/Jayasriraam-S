import { navLinks } from '../data/portfolio';

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
                className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b-2 border-[var(--black)] bg-[var(--white)] px-5 py-4 transition-transform duration-300 md:px-12 ${hidden ? '-translate-y-full' : 'translate-y-0'
                    }`}
            >
                <a href="#hero" className="font-display text-[1.6rem] tracking-[0.1em] no-underline">
                    JS
                </a>

                <ul className="hidden list-none gap-8 md:flex">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a href={link.href} className="nav-link text-[0.7rem] uppercase tracking-[0.15em] no-underline">
                                {link.label}
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

            <ul
                className={`fixed left-0 right-0 top-16 z-40 list-none flex-col gap-6 border-b-2 border-[var(--black)] bg-[var(--black)] px-8 py-8 ${menuOpen ? 'flex' : 'hidden'
                    } md:hidden`}
            >
                {navLinks.map((link) => (
                    <li key={link.href}>
                        <a
                            href={link.href}
                            onClick={onCloseMenu}
                            className="text-[0.8rem] uppercase tracking-[0.15em] text-[var(--white)] no-underline"
                        >
                            {link.mobileLabel ?? link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </>
    );
}