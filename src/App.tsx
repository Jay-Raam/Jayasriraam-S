import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { ProjectModal } from './components/ProjectModal';
import { SectionHeader } from './components/SectionHeader';
import { Preloader } from './components/Preloader';
import { RotatingBadge } from './components/RotatingBadge';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Marquee } from './components/Marquee';
import { CountUp } from './components/CountUp';
import { HorizontalProjects } from './components/HorizontalProjects';

import {
    blogDetails,
    contactLinks,
    educations,
    experiences,
    heroStats,
    musicTracks,
    projects,
    skillCategories,
    type BlogPost,
    type ProjectItem,
    type SkillCategory,
} from './data/portfolio';

import { WorkflowSection } from './components/Workflowsection';
import { FreshTunes } from './components/FreshTunes';
import { TamilKavithai } from './components/TamilKavithai';
import { JourneyTimeline } from './components/JourneyTimeline';
import { Bookshelf } from './components/Bookshelf';
import { TravelGallery } from './components/TravelGallery';

const SKILL_MARQUEE = [
    'React.js',
    'Next.js',
    'Node.js',
    'GraphQL',
    'TypeScript',
    'MongoDB',
    'MQTT',
    'Tailwind',
    'Firebase',
    'Redux',
    'Ionic',
    'Redis',
];

const CONTACT_MARQUEE = [
    'Open to work',
    "Let's build something",
    'Freelance & collabs',
    'Full Stack · Chennai',
];

const BLOG_MARQUEE = ['Longform writing', 'Tamil essays', 'Stories & travel', 'Life & code'];

function SkillIcon({ icon }: { icon: SkillCategory['icon'] }) {
    const className = 'block h-9 w-9 stroke-current stroke-[1.8]';

    switch (icon) {
        case 'frontend':
            return (
                <svg viewBox="0 0 36 36" className={className} fill="none">
                    <rect x="2" y="6" width="32" height="24" rx="2" />
                    <path d="M10 14L6 18L10 22M26 14L30 18L26 22M21 12L15 24" />
                </svg>
            );
        case 'state':
            return (
                <svg viewBox="0 0 36 36" className={className} fill="none">
                    <circle cx="18" cy="18" r="5" />
                    <circle cx="18" cy="18" r="12" strokeDasharray="4 3" />
                    <path d="M18 6V2M18 34V30M6 18H2M34 18H30" />
                </svg>
            );
        case 'backend':
            return (
                <svg viewBox="0 0 36 36" className={className} fill="none">
                    <rect x="3" y="5" width="30" height="8" rx="1" />
                    <rect x="3" y="15" width="30" height="8" rx="1" />
                    <rect x="3" y="25" width="30" height="6" rx="1" />
                    <circle cx="28" cy="9" r="1.5" fill="currentColor" stroke="none" />
                    <circle cx="28" cy="19" r="1.5" fill="currentColor" stroke="none" />
                </svg>
            );
        case 'realtime':
            return (
                <svg viewBox="0 0 36 36" className={className} fill="none">
                    <path d="M4 28C4 28 8 10 18 10C28 10 32 28 32 28" />
                    <path d="M9 28C9 28 11 18 18 18C25 18 27 28 27 28" />
                    <circle cx="18" cy="28" r="2.5" fill="currentColor" stroke="none" />
                </svg>
            );
        case 'tools':
            return (
                <svg viewBox="0 0 36 36" className={className} fill="none">
                    <path d="M14 6L8 12L12 16L6 22L14 30L20 24L24 28L30 22L18 10L22 6L14 6Z" />
                    <circle cx="27" cy="27" r="4" />
                </svg>
            );
        case 'architecture':
            return (
                <svg viewBox="0 0 36 36" className={className} fill="none">
                    <rect x="2" y="2" width="10" height="10" rx="1" />
                    <rect x="13" y="2" width="10" height="10" rx="1" />
                    <rect x="24" y="2" width="10" height="10" rx="1" />
                    <rect x="7" y="24" width="10" height="10" rx="1" />
                    <rect x="19" y="24" width="10" height="10" rx="1" />
                    <path d="M7 12V18H29V12M12 18V24M24 18V24" />
                </svg>
            );
    }
}

const HERO_NAME_LINES = [
    { text: 'JAYA', className: '' },
    { text: 'SRI', className: '' },
    { text: 'RAAM S', className: 'underline-red' },
];

function BlogCard({ post }: { post: BlogPost }) {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ['start end', 'end start'],
    });
    const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

    return (
        <a
            ref={cardRef}
            href={post.url}
            target="_blank"
            rel="noreferrer"
            className="reveal mb-4 group -ml-px -mt-px block border-2 border-[var(--black)] bg-[var(--white)] text-inherit no-underline transition-colors duration-300 hover:bg-[var(--black)] hover:text-[var(--white)]"
        >
            <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-[var(--black)]">
                <motion.img
                    style={{ y: imgY }}
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="h-[120%] w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                    referrerPolicy="no-referrer"
                />
            </div>
            <div className="px-6 py-6">
                <div className="text-[0.58rem] font-bold uppercase tracking-[0.22em] text-[var(--accent2)]">{post.date}</div>
                <h3 className="mt-3 font-syne text-[1rem] font-extrabold leading-[1.4] tracking-[0.02em]">{post.title}</h3>
                <div className="mt-5 inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.15em] text-black/75 transition-colors duration-300 group-hover:text-white/80">
                    Read article <span className="text-[0.9rem]">↗</span>
                </div>
            </div>
        </a>
    );
}

function App() {
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [navHidden, setNavHidden] = useState(false);
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false,
    );
    const lenisRef = useRef<Lenis | null>(null);
    const heroRef = useRef<HTMLElement>(null);

    const ready = !loading;

    /* ── Lenis smooth scrolling + anchor handling ── */
    useEffect(() => {
        const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
        lenisRef.current = lenis;

        let raf = 0;
        const loop = (time: number) => {
            lenis.raf(time);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        const onClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;
            const anchor = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
            if (!anchor) return;
            const hash = anchor.getAttribute('href');
            if (!hash || hash === '#') return;
            const el = document.querySelector(hash);
            if (!el) return;
            event.preventDefault();
            lenis.scrollTo(el as HTMLElement, { duration: 1.4 });
        };
        document.addEventListener('click', onClick);

        return () => {
            cancelAnimationFrame(raf);
            document.removeEventListener('click', onClick);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    /* ── Navbar hide on scroll ── */
    useEffect(() => {
        let lastScroll = 0;

        const onScroll = () => {
            const now = window.scrollY;
            setNavHidden(now > lastScroll && now > 120);
            lastScroll = now;
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* ── Reveal observer for legacy .reveal elements ── */
    useEffect(() => {
        const revealElements = document.querySelectorAll<HTMLElement>('.reveal');
        const sectionHeaders = document.querySelectorAll<HTMLElement>('.section-header');

        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        window.setTimeout(() => entry.target.classList.add('visible'), index * 80);
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 },
        );

        const lineObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        lineObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 },
        );

        revealElements.forEach((element) => revealObserver.observe(element));
        sectionHeaders.forEach((header) => lineObserver.observe(header));

        return () => {
            revealObserver.disconnect();
            lineObserver.disconnect();
        };
    }, []);

    /* ── Modal: escape key, scroll lock, lenis pause ── */
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setSelectedProject(null);
                setMenuOpen(false);
            }
        };

        const lock = selectedProject || loading;
        document.body.style.overflow = lock ? 'hidden' : '';
        if (lock) {
            lenisRef.current?.stop();
        } else {
            lenisRef.current?.start();
        }
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [selectedProject, loading]);

    /* ── Mobile detection (disables notepad parallax that would overlap the stats) ── */
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    /* ── Hero scroll parallax ── */
    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });
    const heroNameY = useTransform(heroProgress, [0, 1], [0, -90]);
    const heroSkew = useTransform(heroProgress, [0, 1], [0, 5]);
    const heroNoteY = useTransform(heroProgress, [0, 1], isMobile ? [0, 0] : [0, 110]);
    const heroFade = useTransform(heroProgress, [0, 0.75], [1, 0.2]);

    const EASE = [0.16, 1, 0.3, 1] as const;

    return (
        <div className="bg-[var(--white)] text-[var(--black)]">
            <ScrollProgress />
            <CustomCursor />
            <Preloader onComplete={() => setLoading(false)} />

            <Navbar
                hidden={navHidden}
                menuOpen={menuOpen}
                onToggleMenu={() => setMenuOpen((current) => !current)}
                onCloseMenu={() => setMenuOpen(false)}
            />

            <main>
                <section
                    id="hero"
                    ref={heroRef}
                    className="grid min-h-screen border-b-2 border-[var(--black)] pt-[72px] md:grid-cols-2"
                >
                    <motion.div
                        style={{ opacity: heroFade }}
                        className="relative overflow-hidden border-b-2 border-[var(--black)] px-6 py-16 md:border-b-0 md:border-r-2 md:px-12 md:py-20"
                    >
                        <div className="hero-mark">JS</div>

                        <motion.p
                            initial={{ y: 24, opacity: 0 }}
                            animate={ready ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
                            className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[var(--accent)]"
                        >
                            Full Stack Developer · Chennai, India
                        </motion.p>

                        <motion.div
                            style={{ y: heroNameY, skewX: heroSkew }}
                            className="mt-8 font-display text-[3.5rem] leading-[0.9] tracking-[0.02em] md:text-[8rem]"
                        >
                            {HERO_NAME_LINES.map((line, i) => (
                                <span key={line.text} className="block overflow-hidden pb-[0.06em]">
                                    <motion.span
                                        initial={{ y: '115%' }}
                                        animate={ready ? { y: '0%' } : {}}
                                        transition={{ duration: 0.75, delay: 0.12 + i * 0.09, ease: EASE }}
                                        className={`block ${line.className}`}
                                    >
                                        {line.text}
                                    </motion.span>
                                </span>
                            ))}
                        </motion.div>

                        <motion.p
                            initial={{ y: 24, opacity: 0 }}
                            animate={ready ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
                            className="mt-6 font-serif text-[1.25rem] italic text-[var(--gray)] md:text-[1.4rem]"
                        >
                            Building things that scale
                            <span className="ml-1 inline-block animate-blink text-[var(--accent2)]">|</span>
                        </motion.p>

                        <motion.p
                            initial={{ y: 24, opacity: 0 }}
                            animate={ready ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.58, ease: EASE }}
                            className="mt-8 max-w-[420px] text-[0.78rem] leading-[1.9] text-black/80"
                        >
                            Full Stack Developer with 3+ years of experience building scalable web applications, enterprise ERP systems, and cross-platform mobile solutions. Specialized in React.js, Next.js, Node.js, GraphQL, and the MERN stack.
                        </motion.p>

                        <motion.div
                            initial={{ y: 24, opacity: 0 }}
                            animate={ready ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
                            className="mt-12 flex flex-wrap gap-4"
                        >
                            <a href="#projects" className="button-primary">
                                View Projects
                            </a>
                            <a href="mailto:jayasriraam.job@gmail.com" className="button-secondary">
                                Get In Touch
                            </a>
                        </motion.div>

                        <div className="absolute bottom-8 left-6 hidden flex-col items-center gap-2 md:flex md:left-12">
                            <div className="scroll-line" />
                            <span className="text-[0.55rem] uppercase tracking-[0.2em] text-[var(--gray)]">Scroll</span>
                        </div>
                    </motion.div>

                    <div className="relative flex flex-col px-6 py-10 md:px-12 md:py-16">
                        {/* Rotating 'open to work' sticker (mew-style accent) */}
                        <RotatingBadge className="absolute right-4 top-10 hidden md:block md:right-10 md:top-12" />

                        {/* Notepad with pin */}
                        <motion.div style={{ y: heroNoteY }} className="flex flex-1 shrink-0 items-center justify-center py-10">
                            <motion.div
                                initial={{ y: 60, opacity: 0, rotate: isMobile ? -2 : -3 }}
                                animate={ready ? { y: 0, opacity: 1, rotate: isMobile ? 0 : -1.5, scale: isMobile ? 0.94 : 1 } : {}}
                                transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
                                className="notepad-paper"
                            >
                                <div className="notepad-pin" />
                                <p className="note-open note-tamil">அடியே அழகி! <span className="note-check">✓</span></p>
                                <div className="note-divider" />
                                <p className="note-item">→ Next.js · Tailwind CSS</p>
                                <p className="note-item">→ Node.js · GraphQL</p>
                                <p className="note-item">→ TypeScript · MERN</p>
                                <div className="note-divider" />
                                <p className="note-big">Build fast.</p>
                                <p className="note-big">Ship clean. <span className="note-check">✓</span></p>
                                <p className="note-big">Scale smart.</p>
                                <div className="note-divider" />
                                <p className="note-small note-tamil">அவளும் நானும்,</p>
                                <p className="note-small note-tamil">அலையும் கடலும்</p>
                            </motion.div>
                        </motion.div>

                        <div className="mt-auto grid grid-cols-2">
                            {heroStats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={ready ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.6 + index * 0.12, ease: EASE }}
                                    className={`border-t-2 border-[var(--black)] p-5 md:p-8 ${index % 2 === 0 ? 'border-r-2' : ''}`}
                                >
                                    <div className="font-display text-[2.5rem] leading-none md:text-[3.5rem]">
                                        <CountUp value={parseInt(stat.num, 10)} suffix={stat.num.slice(-1)} />
                                    </div>
                                    <div className="mt-1 text-[0.65rem] uppercase tracking-[0.15em] text-[var(--gray)]">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <Marquee
                    items={SKILL_MARQUEE}
                    className="border-b-2 border-[var(--black)] bg-[var(--white)] py-6 text-[var(--black)]"
                    speed={26}
                />

                <section id="skills" className="border-b-2 border-[var(--black)] px-6 py-20 md:px-12 md:py-28">
                    <SectionHeader number="01" title="TECH STACK" />
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {skillCategories.map((category) => (                                <div
                                key={category.title}
                                className="group reveal skill-card -ml-px -mt-px border-2 border-[var(--black)] px-8 py-10 transition-colors duration-300"
                            >
                                <div className="mb-4 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110">
                                    <SkillIcon icon={category.icon} />
                                </div>
                                <div className="mb-5 font-syne text-[0.75rem] font-extrabold uppercase tracking-[0.2em]">{category.title}</div>
                                <div className="flex flex-wrap gap-2">
                                    {category.tags.map((tag) => (
                                        <span key={tag} className="skill-pill text-[0.6rem] tracking-[0.06em]">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="experience" className="border-b-2 border-[var(--black)] bg-[var(--black)] px-6 py-20 text-[var(--white)] md:px-12 md:py-28">
                    <SectionHeader number="02" title="EXPERIENCE" inverted />
                    <div className="flex flex-col">
                        {experiences.map((experience, index) => (
                            <div
                                key={experience.role}
                                className={`reveal grid gap-2 border-white/15 py-12 md:grid-cols-[200px_1fr] ${index === 0 ? 'border-t' : 'border-t'
                                    } ${index === experiences.length - 1 ? 'border-b' : ''}`}
                            >
                                <div className="pr-8 pt-1 text-[0.65rem] uppercase tracking-[0.1em] text-[var(--accent2)]">{experience.date}</div>
                                <div>
                                    <div className="font-display text-[2rem] tracking-[0.05em]">{experience.role}</div>
                                    <div className="mb-6 font-serif text-base italic text-[var(--accent)] md:text-lg">
                                        {experience.company} · {experience.location}
                                    </div>
                                    <ul className="flex list-none flex-col gap-3">
                                        {experience.bullets.map((bullet) => (
                                            <li key={bullet} className="bullet-item text-[0.72rem] leading-[1.8] text-white/70">
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <HorizontalProjects projects={projects} onSelect={setSelectedProject} />

                <section id="education" className="border-b-2 border-[var(--black)] px-6 py-20 md:px-12 md:py-28">
                    <SectionHeader number="04" title="EDUCATION" />

                    <div className="flex flex-col gap-6">
                        {educations.map((education, index) => (
                            <div key={education.degree} className="reveal border-2 border-[var(--black)]">
                                <div className="grid md:grid-cols-[1.2fr_0.8fr]">
                                    <div className="relative overflow-hidden border-b-2 border-[var(--black)] px-8 py-10 md:border-b-0 md:border-r-2 md:px-10 md:py-12">
                                        <div className="pointer-events-none absolute right-4 top-2 font-display text-[3rem] leading-none text-black/5 md:text-[5rem]">
                                            {index + 1}
                                        </div>
                                        <div className="text-[0.58rem] font-bold uppercase tracking-[0.24em] text-[var(--accent2)]">{education.status}</div>
                                        <div className="mt-3 max-w-[20ch] font-display text-[1.75rem] leading-[0.96] tracking-[0.05em] md:text-[2.35rem]">
                                            {education.degree}
                                        </div>
                                        <div className="mt-5 font-serif text-[1.1rem] italic md:text-[1.35rem]">{education.university}</div>
                                        <p className="mt-5 max-w-[48ch] text-[0.72rem] leading-[1.9] text-black/78">
                                            {education.focus}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 bg-[var(--black)] text-[var(--white)]">
                                        <div className="border-b border-r border-white/15 px-6 py-7 md:px-7">
                                            <div className="text-[0.55rem] uppercase tracking-[0.22em] text-white/50">Period</div>
                                            <div className="mt-3 font-display text-[1.4rem] leading-none text-[0.85rem]">{education.period}</div>
                                        </div>
                                        {education.cgpa ? (
                                            <div className="border-b border-white/15 px-6 py-7 md:px-7">
                                                <div className="text-[0.55rem] uppercase tracking-[0.22em] text-white/50">CGPA</div>
                                                <div className="mt-3 font-display text-[1.8rem] leading-none text-[var(--accent2)]">{education.cgpa}</div>
                                                <div className="mt-1 text-[0.72rem] text-white/65">out of 10</div>
                                            </div>
                                        ) : (
                                            <div className="border-b border-white/15 px-6 py-7 md:px-7">
                                                <div className="text-[0.55rem] uppercase tracking-[0.22em] text-white/50">Status</div>
                                                <div className="mt-3 text-[0.72rem] leading-[1.8] text-white/72">In Progress</div>
                                            </div>
                                        )}
                                        <div className="border-r border-white/15 px-6 py-7 md:px-7">
                                            <div className="text-[0.55rem] uppercase tracking-[0.22em] text-white/50">Location</div>
                                            <div className="mt-3 text-[0.78rem] leading-[1.8] text-white/72">{education.location}</div>
                                        </div>
                                        <div className="px-6 py-7 md:px-7">
                                            <div className="text-[0.55rem] uppercase tracking-[0.22em] text-white/50">Field</div>
                                            <div className="mt-3 text-[0.78rem] leading-[1.8] text-white/72">{education.degree.split(' ').slice(0, 2).join(' ')}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <WorkflowSection />

                <JourneyTimeline />

                <TamilKavithai />

                <Marquee
                    items={BLOG_MARQUEE}
                    className="border-b-2 border-[var(--black)] bg-[var(--black)] py-6 text-[var(--white)]"
                    speed={28}
                />

                <section id="blog" className="border-b-2 border-[var(--black)] px-6 py-20 md:px-12 md:py-28">
                    <SectionHeader number="08" title="BLOG WRITINGS" />

                    <div className="reveal mb-8 flex justify-start md:mb-10 md:justify-end">
                        <a
                            href="https://jayasriraam.blogspot.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex w-fit items-center gap-2 border-2 border-[var(--black)] px-4 py-2 text-[0.62rem] uppercase tracking-[0.16em] text-[var(--black)] no-underline transition-colors duration-200 hover:bg-[var(--black)] hover:text-[var(--white)]"
                        >
                            View all posts <span className="text-[0.9rem]">↗</span>
                        </a>
                    </div>

                    <div className="grid mb-4 gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                        {blogDetails
                            .filter((post) => post.available)
                            .map((post) => (
                                <BlogCard key={post.url} post={post} />
                            ))}
                    </div>
                </section>

                <Bookshelf />

                <TravelGallery />

                <FreshTunes tracks={musicTracks} />

                <Marquee
                    items={CONTACT_MARQUEE}
                    className="border-b-2 border-[var(--black)] bg-[var(--black)] py-6 text-[var(--white)]"
                    speed={24}
                />

                <section id="contact" className="relative overflow-hidden bg-[var(--black)] px-6 py-20 text-[var(--white)] md:px-12 md:py-28">
                    <div className="pointer-events-none absolute bottom-[-3rem] right-[-1rem] font-display text-[8rem] leading-none text-white/5 md:text-[18rem]">
                        HELLO
                    </div>
                    <div className="grid gap-12 md:grid-cols-2 md:gap-20">
                        <div className="reveal">
                            <h2 className="font-display text-[3rem] leading-[0.95] md:text-[6rem]">
                                {['LET\'S', 'BUILD', 'SOMETHING.'].map((word, i) => (
                                    <span key={word} className="inline-block overflow-hidden pb-[0.08em] align-top">
                                        <motion.span
                                            initial={{ y: '110%' }}
                                            whileInView={{ y: '0%' }}
                                            viewport={{ once: true, margin: '-80px' }}
                                            transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
                                            className={`inline-block ${i === 1 ? 'font-serif italic text-[var(--accent2)]' : ''}`}
                                        >
                                            {word}
                                        </motion.span>
                                        {i < 2 ? <span>&nbsp;</span> : null}
                                    </span>
                                ))}
                            </h2>
                            <motion.p
                                initial={{ y: 24, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                                className="mt-8 max-w-[380px] text-[0.72rem] leading-[1.9] text-white/62"
                            >
                                Open to exciting roles, freelance projects, and collaborations. Let's talk about what we can build together.
                            </motion.p>
                        </div>

                        <div className="reveal mt-2 flex flex-col">
                            {contactLinks.map((contact) => (
                            <a
                                key={contact.label}
                                href={contact.href}
                                target={contact.href.startsWith('http') ? '_blank' : undefined}
                                rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
                                className="group flex items-center gap-6 border-b border-white/10 py-6 text-[var(--white)] no-underline transition-colors duration-200 hover:text-[var(--accent2)]"
                            >
                                <span className="w-20 text-[0.6rem] uppercase tracking-[0.2em] text-[var(--gray)] transition-colors duration-200 group-hover:text-[var(--accent2)]">{contact.label}</span>
                                <span className="font-syne text-[0.8rem] font-bold md:text-[0.95rem]">{contact.value}</span>
                                <span className="ml-auto text-[1.2rem] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
                            </a>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <footer className="relative overflow-hidden border-t-2 border-[var(--black)] bg-[var(--black)] px-6 py-12 text-[var(--white)] md:px-12 md:py-16">
                <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[10rem] leading-none text-white/[0.04] md:text-[20rem]">
                    JS
                </div>
                <div className="relative flex flex-col items-center gap-8 md:flex-row md:items-end md:justify-between">
                    <div className="text-center md:text-left">
                        <div className="font-display text-[1.8rem] leading-none tracking-[0.08em]">
                            JAYASRIRAM <span className="text-[var(--accent2)]">S</span>
                        </div>
                        <div className="mt-2 text-[0.58rem] uppercase tracking-[0.22em] text-white/35">
                            Full Stack Developer · Chennai, India
                        </div>
                    </div>
                    <div className="flex items-center gap-6 text-[0.6rem] uppercase tracking-[0.18em]">
                        {contactLinks
                            .filter((c) => ['GitHub', 'LinkedIn'].includes(c.label))
                            .map((c) => (
                                <a
                                    key={c.label}
                                    href={c.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-white/60 no-underline transition-colors duration-200 hover:text-[var(--accent2)]"
                                >
                                    {c.label}
                                </a>
                            ))}
                        <a
                            href="#hero"
                            className="text-white/60 no-underline transition-colors duration-200 hover:text-[var(--accent2)]"
                        >
                            Back to top ↑
                        </a>
                    </div>
                    <div className="text-[0.55rem] tracking-[0.15em] text-white/30">
                        © {new Date().getFullYear()} Jayasriraam S · Designed with ♥
                    </div>
                </div>
            </footer>

            <AnimatePresence>
                {selectedProject ? (
                    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                ) : null}
            </AnimatePresence>
        </div>
    );
}

export default App;
