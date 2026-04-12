import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { ProjectModal } from './components/ProjectModal';
import { SectionHeader } from './components/SectionHeader';
import {
    achievements,
    blogDetails,
    contactLinks,
    educations,
    experiences,
    heroStats,
    musicTracks,
    processSteps,
    projects,
    skillCategories,
    type AchievementItem,
    type ProjectItem,
    type SkillCategory,
} from './data/portfolio';

function SkillIcon({ icon }: { icon: SkillCategory['icon'] }) {
    const className = 'mb-4 block h-9 w-9 stroke-current stroke-[1.8]';

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

function AchievementIcon({ icon }: { icon: AchievementItem['icon'] }) {
    switch (icon) {
        case 'bars':
            return (
                <svg viewBox="0 0 26 26" className="h-7 w-7 stroke-current stroke-[1.8]" fill="none">
                    <rect x="2" y="14" width="6" height="10" rx="1" />
                    <rect x="10" y="9" width="6" height="15" rx="1" />
                    <rect x="18" y="4" width="6" height="20" rx="1" />
                </svg>
            );
        case 'gear':
            return (
                <svg viewBox="0 0 26 26" className="h-7 w-7 stroke-current stroke-[1.8]" fill="none">
                    <circle cx="13" cy="13" r="4" />
                    <path d="M13 2v3M13 21v3M2 13h3M21 13h3M5.6 5.6l2.1 2.1M18.3 18.3l2.1 2.1M18.3 7.7l-2.1 2.1M7.7 18.3l-2.1 2.1" />
                </svg>
            );
        case 'bolt':
            return (
                <svg viewBox="0 0 26 26" className="h-7 w-7 stroke-current stroke-[1.8]" fill="none">
                    <path d="M13 3L4 14h7l-2 9 11-13h-7l2-7z" />
                </svg>
            );
        case 'clock':
            return (
                <svg viewBox="0 0 26 26" className="h-7 w-7 stroke-current stroke-[1.8]" fill="none">
                    <path d="M4 13a9 9 0 1118 0" />
                    <path d="M13 4v9l5 3" />
                    <circle cx="13" cy="22" r="2" fill="currentColor" stroke="none" />
                </svg>
            );
    }
}

const processVisuals = [
    '/1.png',
    '/2.jpg',
    '/3.jpg',
    '/4.jpg',
];

function App() {
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [navHidden, setNavHidden] = useState(false);

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

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setSelectedProject(null);
                setMenuOpen(false);
            }
        };

        document.body.style.overflow = selectedProject ? 'hidden' : '';
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [selectedProject]);

    return (
        <div className="bg-[var(--white)] text-[var(--black)]">
            <Navbar
                hidden={navHidden}
                menuOpen={menuOpen}
                onToggleMenu={() => setMenuOpen((current) => !current)}
                onCloseMenu={() => setMenuOpen(false)}
            />

            <main>
                <section id="hero" className="grid min-h-screen border-b-2 border-[var(--black)] pt-[72px] md:grid-cols-2">
                    <div className="relative overflow-hidden border-b-2 border-[var(--black)] px-6 py-16 md:border-b-0 md:border-r-2 md:px-12 md:py-20">
                        <div className="hero-mark">JS</div>
                        <p className="animate-slide-up text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[var(--accent)]">
                            Full Stack Developer · Chennai, India
                        </p>

                        <h1 className="mt-6 font-display text-[3.5rem] leading-[0.9] tracking-[0.02em] md:text-[8rem]">
                            <span className="animate-slide-up block [animation-delay:0.2s]">JAYA</span>
                            <span className="animate-slide-up block [animation-delay:0.35s]">SRI</span>
                            <span className="underline-red animate-slide-up block [animation-delay:0.5s]">RAAM S</span>
                        </h1>

                        <p className="animate-slide-up mt-6 font-serif text-[1.25rem] italic text-[var(--gray)] md:text-[1.4rem] [animation-delay:0.65s]">
                            Building things that scale
                            <span className="ml-1 inline-block animate-blink text-[var(--accent2)]">|</span>
                        </p>

                        <p className="animate-slide-up mt-8 max-w-[420px] text-[0.78rem] leading-[1.9] text-black/80 [animation-delay:0.8s]">
                            Full Stack Developer with 3+ years of experience building scalable web applications, enterprise ERP systems, and cross-platform mobile solutions. Specialized in React.js, Next.js, Node.js, GraphQL, and the MERN stack.
                        </p>

                        <div className="animate-slide-up mt-12 flex flex-wrap gap-4 [animation-delay:0.95s]">
                            <a href="#projects" className="button-primary">
                                View Projects
                            </a>
                            <a href="mailto:jayasriraam.job@gmail.com" className="button-secondary">
                                Get In Touch
                            </a>
                        </div>

                        <div className="absolute bottom-8 left-6 hidden flex-col items-center gap-2 md:flex md:left-12">
                            <div className="scroll-line" />
                            <span className="text-[0.55rem] uppercase tracking-[0.2em] text-[var(--gray)]">Scroll</span>
                        </div>
                    </div>

                    <div className="relative flex flex-col justify-end px-6 py-10 md:px-12 md:py-16">
                        <div className="absolute right-0 top-16 hidden border-l-2 border-[var(--black)] px-2 py-4 text-[0.6rem] uppercase tracking-[0.2em] text-[var(--gray)] [writing-mode:vertical-lr] md:block">
                            <a href="mailto:jayasriraam.job@gmail.com" className="text-[var(--black)] no-underline">
                                jayasriraam.job@gmail.com
                            </a>
                        </div>

                        <div className="mt-auto grid grid-cols-2">
                            {heroStats.map((stat, index) => (
                                <div
                                    key={stat.label}
                                    className={`animate-fade-in border-t-2 border-[var(--black)] p-5 opacity-0 md:p-8 ${index % 2 === 0 ? 'border-r-2' : ''
                                        }`}
                                    style={{ animationDelay: `${1.05 + index * 0.15}s` }}
                                >
                                    <div className="font-display text-[2.5rem] leading-none md:text-[3.5rem]">
                                        {stat.num.slice(0, -1)}
                                        <span className="text-[var(--accent2)]">{stat.num.slice(-1)}</span>
                                    </div>
                                    <div className="mt-1 text-[0.65rem] uppercase tracking-[0.15em] text-[var(--gray)]">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="skills" className="border-b-2 border-[var(--black)] px-6 py-20 md:px-12 md:py-28">
                    <SectionHeader number="01" title="TECH STACK" />
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {skillCategories.map((category) => (
                            <div
                                key={category.title}
                                className="reveal skill-card -ml-px -mt-px border-2 border-[var(--black)] px-8 py-10 transition-colors duration-300"
                            >
                                <SkillIcon icon={category.icon} />
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

                <section id="projects" className="border-b-2 border-[var(--black)] px-6 py-20 md:px-12 md:py-28">
                    <SectionHeader number="03" title="KEY PROJECTS" />
                    <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                        {projects.map((project) => (
                            <button
                                type="button"
                                key={project.num}
                                className="reveal project-card group -ml-px -mt-px cursor-pointer border-2 border-[var(--black)] px-8 py-10 text-left transition-colors duration-300"
                                onClick={() => setSelectedProject(project)}
                            >
                                <div className="pointer-events-none absolute right-4 top-4 font-display text-[5rem] leading-none text-black/5 transition-colors duration-300 group-hover:text-white/5">
                                    {project.num}
                                </div>
                                <div className="relative font-syne text-[1.2rem] font-extrabold leading-[1.2]">{project.title}</div>
                                <div className="relative mt-3 text-[0.7rem] leading-[1.9] text-black/65 transition-colors duration-300 group-hover:text-white/60">
                                    {project.desc}
                                </div>
                                <div className="relative mt-6 flex flex-wrap gap-2">
                                    {project.tags.slice(0, 4).map((tag) => (
                                        <span
                                            key={tag}
                                            className="border border-black/20 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.1em] text-black/60 transition-colors duration-300 group-hover:border-white/30 group-hover:text-white/60"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="relative mt-4 inline-block text-[1.2rem] transition-colors duration-300 group-hover:text-[var(--accent2)]">
                                    ↗
                                </div>
                                <span className="relative mt-2 block text-[0.55rem] uppercase tracking-[0.15em] text-[var(--gray)] transition-colors duration-300 group-hover:text-white/30">
                                    Click to view details
                                </span>
                            </button>
                        ))}
                    </div>
                </section>

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
                                        <p className="mt-5 max-w-[48ch] text-[0.72rem] leading-[1.9] text-black/62">
                                            {education.focus}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 bg-[var(--black)] text-[var(--white)]">
                                        <div className="border-b border-r border-white/15 px-6 py-7 md:px-7">
                                            <div className="text-[0.55rem] uppercase tracking-[0.22em] text-white/40">Period</div>
                                            <div className="mt-3 font-display text-[1.4rem] leading-none text-[0.85rem]">{education.period}</div>
                                        </div>
                                        {education.cgpa ? (
                                            <div className="border-b border-white/15 px-6 py-7 md:px-7">
                                                <div className="text-[0.55rem] uppercase tracking-[0.22em] text-white/40">CGPA</div>
                                                <div className="mt-3 font-display text-[1.8rem] leading-none text-[var(--accent2)]">{education.cgpa}</div>
                                                <div className="mt-1 text-[0.72rem] text-white/65">out of 10</div>
                                            </div>
                                        ) : (
                                            <div className="border-b border-white/15 px-6 py-7 md:px-7">
                                                <div className="text-[0.55rem] uppercase tracking-[0.22em] text-white/40">Status</div>
                                                <div className="mt-3 text-[0.72rem] leading-[1.8] text-white/72">In Progress</div>
                                            </div>
                                        )}
                                        <div className="border-r border-white/15 px-6 py-7 md:px-7">
                                            <div className="text-[0.55rem] uppercase tracking-[0.22em] text-white/40">Location</div>
                                            <div className="mt-3 text-[0.78rem] leading-[1.8] text-white/72">{education.location}</div>
                                        </div>
                                        <div className="px-6 py-7 md:px-7">
                                            <div className="text-[0.55rem] uppercase tracking-[0.22em] text-white/40">Field</div>
                                            <div className="mt-3 text-[0.78rem] leading-[1.8] text-white/72">{education.degree.split(' ').slice(0, 2).join(' ')}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="process" className="border-b-2 border-[var(--black)] bg-[var(--black)] px-6 py-20 text-[var(--white)] md:px-12 md:py-28">
                    <SectionHeader number="05" title="WORKFLOW / PROCESS" inverted />

                    <p className="reveal mb-10 max-w-[640px] text-[0.72rem] leading-[1.9] text-white/55 md:mb-12">
                        A visual run-through of how I move from clarity to shipment. Each card highlights one stage in the delivery sequence.
                    </p>

                    <div className="reveal pb-2">
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 md:gap-5">
                            {processSteps.map((item, index) => (
                                <article
                                    key={item.step}
                                    className="process-strip-card text-left text-[var(--white)] no-underline"
                                >
                                    <div className="overflow-hidden border border-white/15 bg-white/5">
                                        <img
                                            src={processVisuals[index % processVisuals.length]}
                                            alt={item.title}
                                            loading="lazy"
                                            className="h-[170px] w-full object-cover grayscale transition-opacity duration-300 md:h-[210px]"
                                        />
                                    </div>

                                    <div className="mt-3 font-display text-[3.2rem] leading-none tracking-[0.02em] md:text-[3.8rem]">
                                        {item.step}
                                    </div>
                                    <div className="mt-2 text-[0.56rem] font-bold uppercase tracking-[0.14em]">{item.title}</div>
                                    <p className="mt-2 text-[0.63rem] leading-[1.65] text-white/60">{item.text}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="achievements" className="bg-[var(--white)] px-6 py-20 text-[var(--black)] md:px-12 md:py-28">
                    <SectionHeader number="06" title="ACHIEVEMENTS" />
                    <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                        {achievements.map((achievement) => (
                            <div
                                key={achievement.title}
                                className="group reveal -ml-px -mt-px flex flex-col gap-4 border-2 border-[var(--black)] px-8 py-10 transition-colors duration-200 hover:bg-[var(--black)] hover:text-[var(--white)]"
                            >
                                <div className="flex h-13 w-13 items-center justify-center border-2 border-[var(--accent2)] bg-[var(--accent2)]/8 text-[var(--accent2)] transition-colors duration-200 group-hover:border-white/35 group-hover:bg-white/10 group-hover:text-[var(--white)]">
                                    <AchievementIcon icon={achievement.icon} />
                                </div>
                                <div className="font-syne text-[0.75rem] font-extrabold uppercase tracking-[0.15em] text-black/90 transition-colors duration-200 group-hover:text-white/90">{achievement.title}</div>
                                <div className="text-[0.72rem] leading-[1.9] text-black/70 transition-colors duration-200 group-hover:text-white/75">{achievement.text}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="blog" className="border-b-2 border-[var(--black)] px-6 py-20 md:px-12 md:py-28">
                    <SectionHeader number="07" title="BLOG WRITINGS" />

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
                                <a
                                    key={post.url}
                                    href={post.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="reveal mb-4 group -ml-px -mt-px block border-2 border-[var(--black)] bg-[var(--white)] text-inherit no-underline transition-colors duration-300 hover:bg-[var(--black)] hover:text-[var(--white)]"
                                >
                                    <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-[var(--black)]">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            loading="lazy"
                                            className="h-full w-full object-cover grayscale transition-opacity duration-300 group-hover:opacity-90"
                                            referrerPolicy="no-referrer"
                                        />
                                    </div>
                                    <div className="px-6 py-6">
                                        <div className="text-[0.58rem] font-bold uppercase tracking-[0.22em] text-[var(--accent2)]">{post.date}</div>
                                        <h3 className="mt-3 font-syne text-[1rem] font-extrabold leading-[1.4] tracking-[0.02em]">{post.title}</h3>
                                        <div className="mt-5 inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.15em] text-black/65 transition-colors duration-300 group-hover:text-white/80">
                                            Read article <span className="text-[0.9rem]">↗</span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                    </div>
                </section>

                <section id="music" className="overflow-hidden border-b-2 border-[var(--black)] bg-[var(--black)] px-6 py-20 text-[var(--white)] md:px-12 md:py-28">
                    <SectionHeader number="08" title="FRESH TUNES" inverted />
                    <p className="reveal mb-12 max-w-[480px] text-[0.72rem] leading-[1.8] text-white/45">
                        A few songs I can recommend if you're looking for some fresh tunes — Tamil cinema classics that never leave the playlist.
                    </p>

                    {/* Auto-scrolling marquee — duplicated list creates seamless loop */}
                    <div className="reveal overflow-hidden pb-4">
                        <div className="marquee-track flex w-max gap-6 py-2">
                            {[...musicTracks, ...musicTracks].map((track, i) => (
                                <a
                                    key={`${track.title}-${i}`}
                                    href={track.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="music-card block w-[140px] flex-none overflow-hidden border border-white/12 bg-white/5 text-inherit no-underline transition-colors duration-300 hover:border-[var(--accent2)] hover:bg-white/10 md:w-[190px]"
                                >
                                    <div className="relative aspect-square bg-[#1a1a1a]">
                                        <img src={track.image} alt={track.title} className="h-full w-full object-cover" loading="lazy" />
                                        <div className="vinyl-overlay absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300">
                                            <div className="vinyl-spin h-[60px] w-[60px] rounded-full border-[3px] border-[#444]" />
                                        </div>
                                    </div>
                                    <div className="px-4 py-4">
                                        <div className="font-syne text-[0.78rem] font-bold leading-[1.3] text-[var(--white)]">{track.title}</div>
                                        <div className="mt-1 text-[0.62rem] tracking-[0.05em] text-white/45">{track.artist}</div>
                                        <div className="mt-2 text-[0.6rem] uppercase tracking-[0.1em] text-[var(--accent2)]">Open Track</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="reveal mt-12 inline-flex items-center gap-4 border border-white/12 px-6 py-5">
                        <div className="text-[0.65rem] leading-[1.7] tracking-[0.05em] text-white/40">
                            Tamil classics on repeat — every line feels like it knows me.
                        </div>
                    </div>
                </section>

                <section id="contact" className="relative overflow-hidden bg-[var(--black)] px-6 py-20 text-[var(--white)] md:px-12 md:py-28">
                    <div className="pointer-events-none absolute bottom-[-3rem] right-[-1rem] font-display text-[8rem] leading-none text-white/5 md:text-[18rem]">
                        HELLO
                    </div>
                    <div className="grid gap-12 md:grid-cols-2 md:gap-20">
                        <div className="reveal">
                            <h2 className="font-display text-[3rem] leading-[0.95] md:text-[6rem]">
                                LET'S <span className="font-serif italic text-[var(--accent2)]">BUILD</span> SOMETHING.
                            </h2>
                            <p className="mt-8 max-w-[380px] text-[0.72rem] leading-[1.9] text-white/50">
                                Open to exciting roles, freelance projects, and collaborations. Let's talk about what we can build together.
                            </p>
                        </div>

                        <div className="reveal mt-2 flex flex-col">
                            {contactLinks.map((contact) => (
                                <a
                                    key={contact.label}
                                    href={contact.href}
                                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                                    rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
                                    className="flex items-center gap-6 border-b border-white/10 py-6 text-[var(--white)] no-underline transition-colors duration-200 hover:text-[var(--accent2)]"
                                >
                                    <span className="w-20 text-[0.6rem] uppercase tracking-[0.2em] text-[var(--gray)]">{contact.label}</span>
                                    <span className="font-syne text-[0.8rem] font-bold md:text-[0.95rem]">{contact.value}</span>
                                    <span className="ml-auto text-[1.2rem]">↗</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <footer className="flex flex-wrap items-center justify-center gap-2 border-t-2 border-[var(--black)] bg-[var(--black)] px-6 py-5 text-center text-[0.6rem] tracking-[0.1em] text-white/30 md:justify-between md:px-12">
                <span>© 2023 Jayasriraam S</span>
                <span>Full Stack Developer · Chennai, India</span>
                <span>Designed with ♥</span>
            </footer>

            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </div>
    );
}

export default App;