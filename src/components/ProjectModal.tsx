import type { ProjectItem } from '../data/portfolio';

type ProjectModalProps = {
    project: ProjectItem | null;
    onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
    return (
        <div
            className={`fixed inset-0 z-100 flex items-center justify-center bg-black/85 px-4 py-8 backdrop-blur-md transition-opacity duration-300 ${project ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
                }`}
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
            aria-hidden={project === null}
        >
            <div className="modal-scrollbar max-h-[88vh] w-full max-w-4xl overflow-y-auto border-2 border-[var(--black)] bg-[var(--white)] transition-transform duration-300 data-[open=false]:translate-y-10 data-[open=false]:scale-[0.97]"
                data-open={project !== null}
            >
                {project ? (
                    <>
                        <div className="relative flex items-start justify-between gap-4 border-b-2 border-[var(--black)] px-6 py-6 md:px-10 md:py-10">
                            <div className="flex-1 pr-16 md:pr-28">
                                <div className="mb-2 font-display text-[2rem] leading-none tracking-[0.04em] md:text-[2.5rem]">{project.title}</div>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="border border-[var(--black)] px-3 py-1 text-[0.6rem] uppercase tracking-[0.1em]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {project.image ? (
                                <div className="mb-8 overflow-hidden">
                                    <img src={project.image} alt={`${project.title} preview`} className="h-auto w-25 object-cover" loading="lazy" />
                                </div>
                            ) : null}

                            <div
                                className="pointer-events-none absolute right-20 top-4 select-none font-display text-[clamp(4.5rem,11vw,9rem)] leading-none tracking-[0.04em] text-black/8 md:right-24 md:top-5"
                                aria-hidden="true"
                            >
                                {project.num}
                            </div>

                            <button
                                type="button"
                                onClick={onClose}
                                className="relative z-10 flex h-9 w-9 items-center justify-center bg-[var(--black)] text-lg text-[var(--white)] transition-colors hover:bg-[var(--accent2)]"
                                aria-label="Close project details"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="px-6 py-6 md:px-10 md:py-10">
                            <div className="modal-label">Overview</div>
                            <p className="text-[0.75rem] leading-[1.9] text-black/80 md:text-[0.8rem]">{project.desc}</p>

                            <div className="modal-label">Key Highlights</div>
                            <ul className="flex list-none flex-col gap-2">
                                {project.bullets.map((bullet) => (
                                    <li key={bullet} className="bullet-item text-[0.72rem] leading-[1.8] text-black/80">
                                        {bullet}
                                    </li>
                                ))}
                            </ul>

                            <div className="modal-label">Impact</div>
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                {project.impact.map((impact) => (
                                    <div key={impact.label} className="-ml-px -mt-px border-2 border-[var(--black)] px-4 py-5 text-center">
                                        <div className="font-display text-[2rem] leading-none text-[var(--accent2)]">{impact.num}</div>
                                        <div className="mt-1 text-[0.6rem] uppercase tracking-[0.08em] text-[var(--gray)]">{impact.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
}