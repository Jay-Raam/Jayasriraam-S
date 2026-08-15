import { useRef, useState } from 'react';

type ScrambleTextProps = {
    text: string;
    className?: string;
};

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export function ScrambleText({ text, className }: ScrambleTextProps) {
    const [display, setDisplay] = useState(text);
    const intervalRef = useRef<number | null>(null);

    const run = () => {
        if (intervalRef.current) window.clearInterval(intervalRef.current);
        let frame = 0;
        const totalFrames = 28;
        intervalRef.current = window.setInterval(() => {
            frame += 1;
            const progress = (frame / totalFrames) * text.length;
            setDisplay(
                text
                    .split('')
                    .map((char, i) => {
                        if (char === ' ') return ' ';
                        if (i < progress) return char;
                        return CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join(''),
            );
            if (frame >= totalFrames) {
                if (intervalRef.current) window.clearInterval(intervalRef.current);
                intervalRef.current = null;
                setDisplay(text);
            }
        }, 20);
    };

    const reset = () => {
        if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setDisplay(text);
    };

    return (
        <span
            aria-label={text}
            className={className}
            onMouseEnter={run}
            onMouseLeave={reset}
            onFocus={run}
            onBlur={reset}
        >
            {display}
        </span>
    );
}
