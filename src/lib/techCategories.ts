export type TechBucket = 'Frontend' | 'Backend' | 'Database' | 'Tools';

// keyword -> bucket, derived only from tech already present across portfolio.ts
const BUCKET_MAP: Record<string, TechBucket> = {
    'react.js': 'Frontend',
    'react': 'Frontend',
    'next.js': 'Frontend',
    'typescript': 'Frontend',
    'tailwind css': 'Frontend',
    'tailwind': 'Frontend',
    'bootstrap': 'Frontend',
    'redux': 'Frontend',
    'redux toolkit': 'Frontend',
    'ionic': 'Frontend',
    'capacitor': 'Frontend',
    'css': 'Frontend',
    'chart.js': 'Frontend',

    'node.js': 'Backend',
    'express.js': 'Backend',
    'graphql': 'Backend',
    'graphql yoga': 'Backend',
    'rest api': 'Backend',
    'mqtt': 'Backend',
    'websocket': 'Backend',
    'python': 'Backend',

    'mongodb': 'Database',
    'postgresql': 'Database',
    'firebase': 'Database',
    'redis': 'Database',

    'git': 'Tools',
    'github': 'Tools',
    'figma': 'Tools',
    'postman': 'Tools',
    'ci/cd pipelines': 'Tools',
};

export function categorizeTags(tags: string[]): Partial<Record<TechBucket, string[]>> {
    const result: Partial<Record<TechBucket, string[]>> = {};

    for (const tag of tags) {
        const bucket = BUCKET_MAP[tag.toLowerCase()];
        if (!bucket) continue;
        if (!result[bucket]) result[bucket] = [];
        result[bucket]!.push(tag);
    }

    return result;
}
