import { useId } from 'react';

type RotatingBadgeProps = {
    className?: string;
    text?: string;
};

export function RotatingBadge({
    className = '',
    text = "OPEN TO WORK ✦ LET'S TALK",
}: RotatingBadgeProps) {
    const pathId = useId().replace(/:/g, 'sticker');

    return (
        <div className={`pointer-events-none select-none ${className}`}>
            <div className="relative h-24 w-24 md:h-28 md:w-28">
                <svg viewBox="0 0 120 120" className="h-full w-full animate-spin-slow text-[var(--accent2)]">
                    <defs>
                        <path
                            id={pathId}
                            d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0"
                        />
                    </defs>
                    <circle
                        cx="60"
                        cy="60"
                        r="58"
                        fill="var(--white)"
                        stroke="var(--black)"
                        strokeWidth="2"
                    />
                    <text
                        fill="currentColor"
                        fontSize="10.5"
                        fontWeight="700"
                        letterSpacing="2.2"
                    >
                        <textPath href={`#${pathId}`}>{text} ✦ {text} ✦</textPath>
                    </text>
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[1.2rem] text-[var(--accent2)]">
                    ✦
                </span>
            </div>
        </div>
    );
}
