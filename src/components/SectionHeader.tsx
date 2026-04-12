type SectionHeaderProps = {
    number: string;
    title: string;
    inverted?: boolean;
};

export function SectionHeader({ number, title, inverted = false }: SectionHeaderProps) {
    return (
        <div className="section-header reveal mb-10 flex items-center gap-6 md:mb-16">
            <span className={`font-display text-5xl leading-none md:text-7xl ${inverted ? 'text-white/10' : 'text-black/8'}`}>
                {number}
            </span>
            <h2 className="font-display text-[2.5rem] leading-none tracking-[0.05em] md:text-[4rem]">{title}</h2>
            <div className={`section-line h-[2px] flex-1 ${inverted ? 'bg-white' : 'bg-[var(--black)]'}`} />
        </div>
    );
}