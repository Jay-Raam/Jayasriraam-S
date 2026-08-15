import type { AchievementItem } from '../data/portfolio';

export function AchievementIcon({ icon }: { icon: AchievementItem['icon'] }) {
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
