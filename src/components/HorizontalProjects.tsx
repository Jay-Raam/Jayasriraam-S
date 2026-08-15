import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValueEvent,
} from 'framer-motion';
import type { ProjectItem } from '../data/portfolio';
import { SectionHeader } from './SectionHeader';

type HorizontalProjectsProps = {
    projects: ProjectItem[];
    onSelect: (project: ProjectItem) => void;
};

function ProjectCard({
    project,
    onSelect,
    compact = false,
}: {
    project: ProjectItem;
    onSelect: (project: ProjectItem) => void;
    compact?: boolean;
}) {
    return (
        <button
            type="button"
            onClick={() => onSelect(project)}
            className={`group relative -ml-px -mt-px flex cursor-pointer flex-col overflow-hidden border-2 border-[var(--black)] bg-[var(--white)] text-left transition-colors duration-300 hover:bg-[var(--black)] hover:text-[var(--white)] ${
                compact ? 'w-full' : 'h-[58vh] min-w-[86vw] md:h-[66vh] md:min-w-[580px]'
            }`}
        >
            <div className="pointer-events-none absolute right-3 top-0 z-10 font-display text-[5rem] leading-none text-black/5 transition-colors duration-300 group-hover:text-white/10 md:text-[7rem]">
                {project.num}
            </div>

            {project.image ? (
                <div className="relative h-36 shrink-0 overflow-hidden border-b-2 border-[var(--black)] md:h-48">
                    <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    />
                </div>
            ) : null}

            <div className="flex flex-1 flex-col p-8 md:p-9">
                <div className="relative flex items-center gap-3 text-[0.55rem] font-bold uppercase tracking-[0.22em] text-[var(--accent2)]">
                    <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent2)] transition-colors duration-300 group-hover:bg-white/60" />
                    Selected Work
                </div>

                <h3 className="relative mt-4 font-display text-[clamp(1.6rem,2.8vw,2.3rem)] leading-[0.95] tracking-[0.03em]">
                    {project.title}
                </h3>

                <p className="relative mt-3 line-clamp-2 max-w-[46ch] text-[0.7rem] leading-[1.85] text-black/75 transition-colors duration-300 group-hover:text-white/60">
                    {project.desc}
                </p>

                <div className="relative mt-auto flex flex-wrap gap-2 pt-5">
                    {project.tags.slice(0, 4).map((tag) => (
                        <span
                            key={tag}
                            className="border border-black/20 px-2.5 py-1 text-[0.55rem] uppercase tracking-[0.1em] text-black/72 transition-colors duration-300 group-hover:border-white/30 group-hover:text-white/60"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="relative mt-4 flex items-center justify-between border-t border-black/15 pt-3 transition-colors duration-300 group-hover:border-white/15">
                    <span className="text-[0.55rem] uppercase tracking-[0.15em] text-[var(--gray)] transition-colors duration-300 group-hover:text-white/30">
                        Click to view details
                    </span>
                    <span className="text-[1.3rem] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--accent2)]">
                        ↗
                    </span>
                </div>
            </div>
        </button>
    );
}

export function HorizontalProjects({ projects, onSelect }: HorizontalProjectsProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [maxScroll, setMaxScroll] = useState(0);
    const [current, setCurrent] = useState(0);

    // Mobile detection
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        setIsMobile(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    // Measure how far the track can translate
    useLayoutEffect(() => {
        if (isMobile) return;
        const measure = () => {
            const track = trackRef.current;
            const section = sectionRef.current;
            if (!track || !section) return;
            setMaxScroll(Math.max(track.scrollWidth - window.innerWidth, 0));
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [isMobile]);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    });

    const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
    const x = useTransform(smooth, [0, 1], [0, -maxScroll]);

    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        setCurrent(Math.min(Math.round(v * (projects.length - 1)), projects.length - 1));
    });

    // Mobile: simple vertical list
    if (isMobile) {
        return (
            <section
                id="projects"
                className="border-b-2 border-[var(--black)] px-6 py-20 md:px-12 md:py-28"
            >
                <SectionHeader number="03" title="KEY PROJECTS" />
                <div className="flex flex-col gap-3">
                    {projects.map((project) => (
                        <ProjectCard key={project.num} project={project} onSelect={onSelect} compact />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative border-b-2 border-[var(--black)] bg-[var(--white)]"
            style={{ height: `${maxScroll + window.innerHeight}px` }}
        >
            <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
                {/* Header row */}
                <div className="flex items-end justify-between gap-6 px-6 pt-20 md:px-12">
                    <SectionHeader number="03" title="KEY PROJECTS" />
                    <div className="mb-14 hidden items-center gap-4 text-[0.6rem] uppercase tracking-[0.22em] text-[var(--gray)] md:flex md:mb-16">
                        <span className="font-display text-[1.4rem] tracking-[0.08em] text-[var(--black)]">
                            {String(current + 1).padStart(2, '0')}
                            <span className="text-[var(--accent2)]"> / {String(projects.length).padStart(2, '0')}</span>
                        </span>
                        <span className="flex items-center gap-2">
                            Scroll
                            <svg className="h-3.5 w-3.5 text-[var(--accent2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </div>
                </div>

                {/* Track */}
                <div className="flex flex-1 items-center overflow-hidden">
                    <motion.div
                        ref={trackRef}
                        style={{ x }}
                        className="flex items-stretch gap-6 px-6 will-change-transform md:px-12"
                    >
                        {projects.map((project) => (
                            <ProjectCard key={project.num} project={project} onSelect={onSelect} />
                        ))}

                        {/* End CTA card */}
                        <a
                            href="#contact"
                            className="group -ml-px -mt-px flex h-[58vh] min-w-[70vw] cursor-pointer flex-col items-start justify-between border-2 border-[var(--black)] bg-[var(--black)] p-10 text-[var(--white)] no-underline transition-colors duration-300 md:h-[66vh] md:min-w-[480px]"
                        >
                            <div className="text-[0.55rem] font-bold uppercase tracking-[0.22em] text-[var(--accent2)]">
                                More?
                            </div>
                            <div className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[0.95] tracking-[0.03em]">
                                Let's build
                                <br />
                                the next one
                                <span className="text-[var(--accent2)]">.</span>
                            </div>
                            <span className="text-[0.62rem] uppercase tracking-[0.2em] text-white/50 transition-colors duration-300 group-hover:text-[var(--accent2)]">
                                Get in touch ↗
                            </span>
                        </a>
                    </motion.div>
                </div>

                {/* Bottom edge */}
                <div className="border-t-2 border-[var(--black)] py-4 text-center text-[0.55rem] uppercase tracking-[0.3em] text-[var(--gray)]">
                    {projects.length} production-grade projects — click any card for the full story
                </div>
            </div>
        </section>
    );
}
