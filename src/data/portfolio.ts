export type NavLink = {
  href: string;
  label: string;
  mobileLabel?: string;
};

export type SkillCategory = {
  title: string;
  icon: 'frontend' | 'state' | 'backend' | 'realtime' | 'tools' | 'architecture';
  tags: string[];
};

export type ExperienceItem = {
  date: string;
  role: string;
  company: string;
  location: string;
  bullets: string[];
};

export type ImpactMetric = {
  num: string;
  label: string;
};

export type ProjectItem = {
  num: string;
  title: string;
  desc: string;
  image?: string;
  tags: string[];
  bullets: string[];
  impact: ImpactMetric[];
};

export type AchievementItem = {
  title: string;
  text: string;
  icon: 'bars' | 'gear' | 'bolt' | 'clock';
};

export type ProcessStep = {
  step: string;
  title: string;
  text: string;
};

export type EducationItem = {
  degree: string;
  university: string;
  location: string;
  period: string;
  status: string;
  cgpa?: string;
  focus: string;
};

export type MusicTrack = {
  title: string;
  artist: string;
  image: string;
  link: string;
};

export type BlogPost = {
  title: string;
  image: string;
  date: string;
  url: string;
  available: boolean;
};

export type ContactLink = {
  label: string;
  value: string;
  href: string;
};

export type Kavithai = {
  tamil: string;
  english: string;
  author?: string;
};

export type TimelineEvent = {
  year: string;
  title: string;
  description: string;
  icon: 'start' | 'work' | 'edu' | 'milestone' | 'current';
};

export type BookItem = {
  title: string;
  author: string;
  genre: string;
  status: 'reading' | 'completed' | 'wishlist';
  note?: string;
};

export type GalleryItem = {
  image: string;
  location: string;
  caption: string;
  date: string;
};

export type GalleryVideoItem = {
  video: string;
  location: string;
  caption: string;
  date: string;
};

export const navLinks: NavLink[] = [
  { href: '#education', label: 'Education' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
];

export const educations: EducationItem[] = [
  {
    degree: 'BACHELOR OF COMPUTER APPLICATION',
    university: 'G.T.N Arts College',
    location: 'Dindigul, Tamil Nadu',
    period: '2020 - 2023',
    status: 'Completed',
    cgpa: '8.0',
    focus: 'Programming, systems thinking, and software fundamentals',
  },
  {
    degree: 'MASTER OF COMPUTER APPLICATIONS',
    university: 'Bharathidasan University',
    location: 'Tiruchirappalli, Tamil Nadu',
    period: '2026 - 2028',
    status: 'Currently Studying',
    focus: 'Advanced software architecture, distributed systems, and enterprise solutions',
  },
];

export const blogDetails: BlogPost[] = [
  {
    title: 'பயணம் ஆண்டிபட்டி - கோழிப்பண்ணை',
    image: '/Blog/blog3.jpeg',
    date: 'MAY 2024',
    url: 'https://jayasriraam.blogspot.com/2024/04/blog-post.html',
    available: true,
  },
  {
    title: 'என் கொள்கை',
    image: '/Blog/Kolkai.webp',
    date: 'MAY 2024',
    url: 'https://jayasriraam.blogspot.com/2024/03/blog-post.html',
    available: true,
  },
  {
    title: 'முதல் பரிசு',
    image: '/Blog/blog2.jpeg',
    date: 'APR 2024',
    url: 'https://jayasriraam.blogspot.com/2024/02/blog-post.html',
    available: true,
  },
  {
    title: 'முதல் சந்திப்பு',
    image: '/Blog/blog4.png',
    date: 'Oct 2024',
    url: 'https://jayasriraam.blogspot.com/2024/09/blog-post.html',
    available: true,
  },
  {
    title: 'காதல் - ஒரு இன்ப சுற்றுலா',
    image: '/Blog/blog1.jpeg',
    date: 'Oct 2024',
    url: 'https://jayasriraam.blogspot.com/2024/10/blog-post.html',
    available: true,
  },
  {
    title: 'காத்திருப்பு',
    image: '/Blog/image6.webp',
    date: 'Aug 2025',
    url: 'https://jayasriraam.blogspot.com/2025/08/blog-post.html',
    available: true,
  },
];

export const heroStats = [
  { num: '3+', label: 'Years Experience' },
  { num: '10+', label: 'Production Apps' },
  { num: '45%', label: 'Perf. Improvement' },
  { num: '40%', label: 'Faster Load Times' },
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: 'frontend',
    tags: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Material UI', 'Ant Design', 'SCSS'],
  },
  {
    title: 'State & Mobile',
    icon: 'state',
    tags: ['Redux', 'Redux Toolkit', 'Zustand', 'Ionic React', 'Capacitor', 'PWA'],
  },
  {
    title: 'Backend',
    icon: 'backend',
    tags: ['Node.js', 'Express.js', 'GraphQL', 'GraphQL Yoga', 'Python', 'Firebase', 'MongoDB', 'PostgreSQL'],
  },
  {
    title: 'Real-Time & IoT',
    icon: 'realtime',
    tags: ['MQTT', 'WebSocket', 'Three.js', 'Redis', 'Cloud Messaging'],
  },
  {
    title: 'Tools & Design',
    icon: 'tools',
    tags: ['Git', 'GitHub', 'Postman', 'Figma', 'CI/CD Pipelines', 'Framer',],
  },
  {
  title: 'Hobbies & Interests',
  icon: 'architecture',
  tags: ['Gen AI', 'Prompt Engineering', 'Chatbots', "Writing", 'Anime', 'Music', 'Travel'],
}
];

export const experiences: ExperienceItem[] = [
  {
    date: 'Dec 2024 — Present',
    role: 'Software Developer',
    company: 'PPV Technology Private Limited',
    location: 'Chennai, TN',
    bullets: [
      'Designed end-to-end UI/UX in Figma and built fully responsive, pixel-perfect React components',
      'Built cross-platform mobile apps with Ionic React, Capacitor & TypeScript — 40% UI rendering boost via lazy loading',
      'Architected scalable frontends with modular components, custom hooks, and reusable utilities',
      'Integrated Firebase Cloud Messaging & Realtime DB — ~40% boost in user engagement',
      'Developed real-time IoT dashboards using MQTT over WebSocket — 40–50% faster system response',
    ],
  },
  {
    date: 'May 2023 — Dec 2024',
    role: 'Full Stack Developer',
    company: 'Akkenam Technologies',
    location: 'Dindigul, TN',
    bullets: [
      'Created modern UI layouts and component systems in Figma with responsive breakpoints',
      'Developed and maintained GraphQL APIs using GraphQL Yoga & Node.js with query optimizations',
      'Designed MongoDB schemas with indexing & aggregation pipelines — ~40% faster queries',
      'Built RESTful and GraphQL backends with Express.js; improved server reliability by 20%',
      'Integrated third-party services ensuring reliable data processing across distributed systems',
    ],
  },
];

export const projects: ProjectItem[] = [
  {
    num: '01',
    title: 'Athikaalai Bhakthi – Mobile',
    tags: ['Ionic', 'Capacitor', 'CSS', 'Redux Toolkit', 'Firebase', 'REST API'],
    desc: 'A cross-platform devotional mobile app that helps users begin their day with spiritual inspiration. Features real-time quote notifications, Tamil devotional mantras, temple schedules, and festival reminders. The app bridges technology and tradition, ensuring that every user stays connected to daily rituals wherever they are.',
    image: '/project/AKB.png',
    bullets: [
      'Architected a scalable Ionic React frontend integrated with Firebase, delivering real-time devotional updates and quotes',
      'Implemented Redux Toolkit with normalized state structure, async thunks, and entity adapters across dynamic modules like Daily Quotes and Temple Timings',
      'Integrated Firebase Cloud Messaging for real-time push notifications, driving ~40% increase in daily user engagement',
      'Reduced initial load time by 25% via Capacitor build optimization for Android and iOS',
      'Designed a simple yet elegant UI with CSS for devotional consistency and intuitive navigation',
    ],
    impact: [
      { num: 'PPV', label: 'Company' },
      { num: '6+', label: 'Technologies' },
      { num: 'Live', label: 'Availability' },
    ],
  },
  {
    num: '02',
    title: 'Athikaalai Bhakthi – Web',
    tags: ['React.js', 'Bootstrap', 'Redux', 'Firebase', 'REST API'],
    desc: 'The web counterpart to the Athikaalai Bhakthi mobile app — an admin management system that controls devotional content, schedules, and user notifications. Built for temple admins and volunteers, the dashboard streamlines publishing updates, scheduling festivals, and managing push notifications through Firebase integration.',
    image: '/project/AKB.png',
    bullets: [
      'Developed a responsive admin dashboard with React.js and Bootstrap, ensuring pixel-perfect UI alignment across breakpoints',
      'Implemented secure role-based access (Admin, Volunteer, Viewer) to streamline responsibilities and prevent unauthorized access',
      'Used Firebase Firestore for live content management and integrated push notification triggers',
      'Optimized performance using React Lazy Loading and Suspense, improving page load time by 20%',
      'Collaborated with backend developers to define REST endpoints for content synchronization and real-time dashboard metrics',
    ],
    impact: [
      { num: 'PPV', label: 'Company' },
      { num: '5+', label: 'Technologies' },
      { num: 'Live', label: 'Availability' },
    ],
  },
  {
    num: '03',
    title: 'Cenpoilt – Mobile',
    tags: ['React.js', 'Node.js', 'MQTT', 'WebSocket', 'Chart.js', 'Ionic', 'Capacitor'],
    desc: 'Enterprise IoT mobile platform for real-time water distribution monitoring and control across multiple geographic locations.',
    image: '/project/cenpilot.png',
    bullets: [
      'Implemented bidirectional device communication using MQTT over WebSocket for real-time monitoring and control',
      'Improved real-time control performance by approximately 35–40% through communication and application-level optimization',
      'Developed administration interfaces for device provisioning, configuration management, monitoring, and automated alerts',
      'Built real-time visualization workflows to monitor device status, system activity, and operational metrics',
    ],
    impact: [
      { num: 'PPV', label: 'Company' },
      { num: '7', label: 'Technologies' },
      { num: 'Live', label: 'Availability' },
    ],
  },
  {
    num: '04',
    title: 'Cenpoilt – Web',
    tags: ['React.js', 'Node.js', 'MQTT', 'WebSocket', 'Chart.js'],
    desc: 'Enterprise IoT web platform for real-time water distribution monitoring and control across multiple geographic locations.',
    image: '/project/cenpilot.png',
    bullets: [
      'Implemented bidirectional device communication using MQTT over WebSocket for real-time monitoring and control',
      'Improved real-time control performance by approximately 35–40% through communication and application-level optimization',
      'Developed administration interfaces for device provisioning, configuration management, monitoring, and automated alerts',
      'Built real-time visualization workflows to monitor device status, system activity, and operational metrics',
    ],
    impact: [
      { num: 'PPV', label: 'Company' },
      { num: '5', label: 'Technologies' },
      { num: 'Live', label: 'Availability' },
    ],
  },
  {
    num: '05',
    title: 'PPV ERP — Enterprise Resource Planning System',
    tags: ['React.js', 'TypeScript', 'REST APIs', 'OpenAPI', 'Three.js'],
    desc: 'Enterprise ERP platform with 12+ business modules, where I worked across inventory, production, sales, purchasing, HR, finance, reporting, and other core enterprise operations.',
    image: '/project/ppverp.webp',
    bullets: [
      'Developed reusable application architecture for complex ERP workflows across multiple interconnected business modules',
      'Built interactive business intelligence dashboards for KPIs, sales analytics, production metrics, and operational reporting',
      'Implemented granular role-based access control for different organizational roles and departments',
      'Developed data-driven interfaces for high-volume enterprise workflows with reusable components and optimized state management',
    ],
    impact: [
      { num: 'PPV', label: 'Company' },
      { num: '5', label: 'Technologies' },
      { num: 'Live', label: 'Availability' },
    ],
  },
  {
    num: '06',
    title: 'Siligreen – Mobile',
    tags: ['Ionic', 'Capacitor', 'Redux', 'Firebase', 'REST API', 'MQTT'],
    desc: 'An IoT-powered mobile application built for the Siligreen IOT management system. The app enables users to monitor and control smart devices such as motors, tanks, and sensors in real time using MQTT over WebSocket.',
    image: '/project/sili.png',
    bullets: [
      'Developed a cross-platform IoT mobile application using Ionic React and Capacitor for Android and iOS',
      'Integrated MQTT over WebSocket for real-time device monitoring and bidirectional control commands',
      'Implemented Redux for seamless state management and live telemetry data tracking across device dashboards',
      'Used Firebase for push notifications and device configuration storage',
      'Reduced connection latency by 35% through efficient asynchronous updates and optimized event handling',
    ],
    impact: [
      { num: 'PPV', label: 'Company' },
      { num: '6+', label: 'Technologies' },
      { num: 'Live', label: 'Availability' },
    ],
  },
  {
    num: '07',
    title: 'Paarambhariya – E-commerce & Admin Platform',
    tags: ['React.js', 'Tailwind CSS', 'Zustand', 'Chart.js', 'REST API', 'Axios'],
    desc: 'A full-scale e-commerce and enterprise admin platform built for Paarambhariya, covering the entire business lifecycle — from storefront and order management to production, logistics, finance, and analytics. Designed for enterprise users with role-based access control, modular architecture, and a high-performance React.js frontend powered by Zustand state management and REST API integration.',
    image: '/project/paarambhariya_logo.jpg',
    bullets: [
      'Independently built and deployed a full-scale e-commerce + admin platform covering storefront, orders, production, logistics, and finance end-to-end',
      'Implemented Zustand for lightweight, scalable client-side state management across complex admin workflows',
      'Built dynamic analytics dashboards using Chart.js to visualize sales, production, logistics, and finance trends across all business units',
      'Engineered code splitting, lazy loading, and Axios-level request caching — improving API response time by 40% and achieving sub-2s page loads',
      'Implemented role-based access control with granular permission boundaries across all user types',
      'Developed file upload and export flows for bulk imports, invoices, and CSV/Excel exports',
    ],
    impact: [
      { num: 'PPV', label: 'Company' },
      { num: '6+', label: 'Technologies' },
      { num: 'Live', label: 'Availability' },
    ],
  },
  {
    num: '08',
    title: 'Vipani — Customizable Enterprise Management System',
    tags: ['Node.js', 'Express.js', 'GraphQL Yoga', 'PostgreSQL', 'Redis'],
    desc: 'Modular enterprise management platform supporting customizable business workflows, modular integrations, and high performance API routing.',
    image: '/project/VIPANI.png',
    bullets: [
      'Built a modular ERP solution with GraphQL Yoga and Express.js, implementing JWT authentication, refresh token rotation, and authorization mechanisms',
      'Optimized PostgreSQL queries with indexing and aggregation pipelines, improving database performance',
      'Developed GraphQL APIs using GraphQL Yoga and Node.js, enabling flexible and efficient data fetching across inventory, HR, and finance modules',
      'Optimized GraphQL queries and Express.js middleware with batching and caching, reducing API response time across modules',
    ],
    impact: [
      { num: 'Akkenam', label: 'Company' },
      { num: '5', label: 'Technologies' },
      { num: 'Live', label: 'Availability' },
    ],
  },
  {
    num: '09',
    title: 'MySmartalign — Modular Enterprise Management Platform',
    tags: ['Node.js', 'Express.js', 'GraphQL Yoga', 'MongoDB', 'PostgreSQL', 'Redis', 'React.js'],
    desc: 'Modular enterprise management platform supporting sales, procurement, finance, and operational workflows.',
    image: '/project/mysmartalign.png',
    bullets: [
      'Designed and developed scalable GraphQL APIs using GraphQL Yoga, including schemas, resolvers, queries, mutations, and business logic',
      'Implemented secure JWT authentication and role-based authorization across multiple users, roles, and departments',
      'Worked with MongoDB and PostgreSQL for different data management requirements and integrated Redis for frequently accessed data',
      'Developed reusable React.js interfaces and state-management patterns for complex, data-intensive enterprise workflows',
    ],
    impact: [
      { num: 'Akkenam', label: 'Company' },
      { num: '7', label: 'Technologies' },
      { num: 'Live', label: 'Availability' },
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Problem Framing',
    text: 'I break down product goals into clear system boundaries, defining what to build, what to avoid, and how decisions impact long-term scalability.',
  },
  {
    step: '02',
    title: 'Architecture & Trade-offs',
    text: 'I design frontend architecture with a focus on maintainability, performance, and team velocity, making conscious trade-offs instead of over-engineering.',
  },
  {
    step: '03',
    title: 'Robust Integration',
    text: 'I integrate services with production-level thinking, handling failures, edge cases, and real-world unpredictability as first-class concerns.',
  },
  {
    step: '04',
    title: 'Sustain & Evolve',
    text: 'I treat launch as a baseline, continuously improving system reliability, developer experience, and performance as the product scales.',
  },
];

export const achievements: AchievementItem[] = [
  {
    title: '10+ Production Apps',
    text: 'Owned and led frontend development for 10+ production-grade web and mobile applications in a lean startup environment.',
    icon: 'bars',
  },
  {
    title: 'Scalable GraphQL APIs',
    text: 'Architected scalable GraphQL Yoga and Node.js backends, reducing data-fetching overhead and improving API response efficiency across multiple projects.',
    icon: 'gear',
  },
  {
    title: '40% Speed Boost',
    text: 'Optimized frontend architecture and backend query performance, boosting overall rendering speed and runtime by 40% across all production deployments.',
    icon: 'bolt',
  },
  {
    title: 'CI/CD Automation',
    text: 'Implemented CI/CD pipelines to automate deployments, reducing manual effort and ensuring zero-downtime releases across all production environments.',
    icon: 'clock',
  },
];

export const musicTracks: MusicTrack[] = [
  {
    title: 'Uyire Un Uyirena',
    artist: 'Anirudh Ravichander',
    image: '/songs/12.jpg',
    link: 'https://www.jiosaavn.com/song/uyire-un-uyirena/PRgBByV7Dkc',
  },
  {
    title: 'Annul Maelae',
    artist: 'Harris Jayaraj, Sudha Ragunathan',
    image: '/songs/103.jpg',
    link: 'https://www.jiosaavn.com/song/annul-maelae/EQoTCCtYWlk',
  },
  {
    title: 'Something Something Unakkum Enakkum',
    artist: 'Devi Sri Prasad',
    image: '/songs/105.jpg',
    link: 'https://www.jiosaavn.com/album/something-something-unakkum-enakkum/WDRqlQWiLeY_',
  },
  {
    title: 'Enkiruthai',
    artist: 'Yuvan Shankar Raja',
    image: '/songs/104.jpg',
    link: 'https://www.jiosaavn.com/album/winner/zOD5WwUP6-8_',
  },
  {
    title: 'En Iniya Pon Nilave',
    artist: 'K.J. Yesudas, Ilaiyaraaja',
    image: '/songs/Frame%2011.png',
    link: 'https://open.spotify.com/track/5QAj9kZouI8eSwqDqtywNr',
  },
  {
    title: 'Aathangara Marame',
    artist: 'A.R. Rahman, Mano, Sujatha',
    image: '/songs/Frame%2015.png',
    link: 'https://www.jiosaavn.com/song/aathangara-marame-from-kizhakku-cheemayile/BQwHaUBBUUY',
  },
  {
    title: 'Machaan Machaan',
    artist: 'Yuvan Shankar Raja',
    image: '/songs/5.jpg',
    link: 'https://www.jiosaavn.com/song/machaan-machaan/QDg-awFgTXo',
  },
  {
    title: 'Paravaiye Engu Irukkirai',
    artist: 'Yuvan Shankar Raja, Ilaiyaraaja',
 image: '/songs/8.jpg',
    link: 'https://www.jiosaavn.com/song/paravaiye-engu-irukkirai/L1ocBzECc2Q',
  },
  {
    title: 'Rasathi',
    artist: 'Ilaiyaraaja, Shahul Hameed',
    image: '/songs/6.jpg',
    link: 'https://www.jiosaavn.com/song/rasathi/FT8nbkx3RHc',
  },
  {
    title: 'Poongatrile',
    artist: 'A.R. Rahman, Unnikrishnan',
    image: '/songs/7.jpg',
    link: 'https://www.jiosaavn.com/song/poongatrile/RgcHSTkGeEY',
  },
  {
    title: 'Pogadhe',
    artist: 'Yuvan Shankar Raja',
    image: '/songs/9.jpg',
    link: 'https://www.jiosaavn.com/song/pogadhe/PwQuUzhFBFg',
  },
  {
    title: 'Thaaliyae Thevaiyillai',
    artist: 'Ilaiyaraaja',
    image: '/songs/102.jpg',
    link: 'https://www.jiosaavn.com/song/thaaliyae-thevaiyillai/JxE6VBxIAnk',
  },
    {
    title: 'Moongil Thottam',
    artist: 'A.R. Rahman, Vijay Yesudas',
    image: '/songs/04.jpg',
    link: 'https://www.jiosaavn.com/song/moongil-thottam/KRE4WD54BEk',
  },
  {
    title: 'Love Pannu (Oru Punnagai Poove)',
    artist: 'Yuvan Shankar Raja',
    image: '/songs/11.jpg',
    link: 'https://www.jiosaavn.com/song/love-pannu-oru-punnagai-poove/SRAaWjlWB1Y',
  },
  {
    title: 'Avatha Paiya',
    artist: 'Yuvan Shankar Raja, Sathyan',
    image: '/songs/01.jpg',
    link: 'https://www.jiosaavn.com/song/avatha-paiya/JTEpSSZgfnA',
  },
  {
    title: 'Azhagana Rakshasiyea',
    artist: 'A.R. Rahman, S.P. Balasubrahmanyam, Harini',
    image: '/songs/02.jpg',
    link: 'https://www.jiosaavn.com/song/azhagana-rakshasiyea/PBI9aQ5vfx4',
  },
  {
    title: 'Chennai Sentamizh',
    artist: 'A.R. Rahman, Harini',
    image: '/songs/03.jpg',
    link: 'https://www.jiosaavn.com/song/chennai-sentamizh/RR4YcBBGX2U',
  },
  {
    title: 'Adiye',
    artist: 'A.R. Rahman, Vijay Yesudas',
    image: '/songs/04.jpg',
    link: 'https://www.jiosaavn.com/song/adiye/J10IAB1hTQM',
  },
    {
    title: 'Aathadi Aathadi',
    artist: 'SS Thaman',
    image: '/songs/106.jpg',
    link: 'https://www.jiosaavn.com/song/aathadi-aathadi/QSAbWUEBRnA',
  },
  {
    title: 'Kumaari',
    artist: 'A.R. Rahman',
    image: '/songs/05.jpg',
    link: 'https://www.jiosaavn.com/song/kumaari/JT1ddgxxdls',
  },
  {
    title: 'Kanaa Kaangiren',
    artist: 'Harris Jayaraj, Nithyasree Mahadevan',
    image: '/songs/06.jpg',
    link: 'https://www.jiosaavn.com/song/kanaa-kaangiren/GlxYU0RHdF4',
  },
  {
    title: 'Mazhaiye Mazhaiye',
    artist: 'S.A. Rajkumar',
    image: '/songs/07.jpg',
    link: 'https://www.jiosaavn.com/song/mazhaiye-mazhaiye/OjspX0NVZws',
  },
  {
    title: 'Nee Partha',
    artist: 'Yuvan Shankar Raja',
    image: '/songs/08.jpg',
    link: 'https://www.jiosaavn.com/song/nee-partha/BQcGVAFXW1I',
  },
  {
    title: 'Snehidhane',
    artist: 'A.R. Rahman, Sadhana Sargam',
    image: '/songs/09.jpg',
    link: 'https://www.jiosaavn.com/song/snehidhane/ExE-dxsIUQo',
  },
  {
    title: 'Sotta Sotta',
    artist: 'Yuvan Shankar Raja',
    image: '/songs/010.jpg',
    link: 'https://www.jiosaavn.com/song/sotta-sotta/QDwOBkRUUns',
  },
];

export const kavithaigal: Kavithai[] = [
  // Romantic - 4
  {
    tamil: 'அவள் நினைவுகள் போதும்,\nஇந்த தனிமையும் அழகாகிறது...',
    english: 'Her memories are enough,\nEven this solitude becomes beautiful...',
  },

  {
    tamil: 'நீ கொடுத்த முதல் முத்தத்தின்\nஎச்சில் கூடக் காயவில்லை,\nஎவ்வாறு உனை இழப்பேன்?',
    english: 'Even the trace of your first kiss\nhas not yet dried,\nhow could I ever lose you?',
  },

  {
    tamil: 'உன் உயிர் காட்டில்\nமோகம் தலைக்கேறி,\nஉயிர் மறந்து கனவு தொலைந்தேன்...',
    english: 'Lost in the forest of your soul,\nconsumed by desire,\nI forgot myself and lost my dreams...',
  },

  {
    tamil: 'என் போராட்ட குணம்\nஉன் காலடியில்,\nமுடிவு உன்னுடையது...',
    english: 'My fighting spirit\nlies at your feet,\nthe decision is yours...',
  },

  // Philosophy - 3
  {
    tamil: 'நிழலைத் தேடி நடந்தவன்,\nவெயிலை குறை சொல்லவில்லை,\nதன்னை மட்டும் மறந்திருந்தான்.',
    english: 'The one who walked searching for a shadow\ndid not blame the sunlight,\nhe had simply forgotten himself.',
  },

  {
    tamil: 'முடிந்த கதவின் மறுபக்கம்\nயாரும் இல்லை,\nதிறக்காமல் இருந்தவன் மட்டும் இருந்தான்.',
    english: 'There was no one\non the other side of the closed door,\nonly the one who never opened it.',
  },

  {
    tamil: 'நதி கடலை அடைந்த பிறகு,\nதன் பெயரை இழந்தது,\nஆனால் பயணம் அல்ல.',
    english: 'After the river reached the sea,\nit lost its name,\nbut not its journey.',
  },

  // Normal - 2
  {
    tamil: 'இப்போது இவள் இதயத்துடிப்பின் சத்தம் மட்டும்,\nஎன் அமைதி பேரமைதி.',
    english: 'Now, only the sound of her heartbeat,\nmy silence has become absolute peace.',
  },

  {
    tamil: 'போதுமா என் ஆசை ராணிக்கு ஒப்பனை,\nவருவாய் இந்த மாயேனை தேடி,\nகாத்திருப்பேன் உன் பதிலை நாடி...',
    english: 'Is this adornment enough for my queen?\nCome searching for this dreamer,\nI will wait for your answer...',
  },
];

export const timeline: TimelineEvent[] = [
  {
    year: '2020',
    title: 'Started BCA',
    description: 'Began my journey in Computer Applications at G.T.N Arts College, Dindigul. Fell in love with coding and problem-solving.',
    icon: 'start',
  },
  {
    year: '2023',
    title: 'Graduated BCA — 8.0 CGPA',
    description: 'Completed Bachelor of Computer Applications with first class. Built my first full-stack projects and discovered my passion for frontend development.',
    icon: 'edu',
  },
  {
    year: 'May 2023',
    title: 'Full Stack Developer at Akkenam',
    description: 'Joined Akkenam Technologies in Dindigul. Built GraphQL APIs, MongoDB schemas, and modern UI systems. Grew from junior to confident full-stack developer.',
    icon: 'work',
  },
  {
    year: 'Dec 2024',
    title: 'Software Developer at PPV Technology',
    description: 'Moved to Chennai to join PPV Technology. Leading frontend development for IoT dashboards, mobile apps, and enterprise ERP platforms.',
    icon: 'milestone',
  },
  {
    year: '2026',
    title: 'Started MCA at Bharathidasan University',
    description: 'Pursuing Master of Computer Applications to deepen expertise in distributed systems and enterprise architecture.',
    icon: 'edu',
  },
  {
    year: 'Now',
    title: 'Building & Learning Every Day',
    description: '10+ production apps shipped. Exploring Gen AI, prompt engineering, and Tamil tech writing. Always building, always learning.',
    icon: 'current',
  },
];

export const bookshelf: BookItem[] = [
  // =========================
  // Tamil Classics - 5
  // =========================
  {
    title: 'நாலடியார்',
    author: 'சமண முனிவர்கள்',
    genre: 'Tamil Classic',
    status: 'wishlist',
    note: 'Ancient Tamil wisdom on ethics, discipline, impermanence, and the way we should live.',
  },
  {
    title: 'புறநானூறு',
    author: 'பல சங்கப் புலவர்கள்',
    genre: 'Tamil Classic',
    status: 'reading',
    note: 'Raw Sangam-era wisdom about leadership, war, friendship, generosity, mortality, and human nature.',
  },
  {
    title: 'அகநானூறு',
    author: 'பல சங்கப் புலவர்கள்',
    genre: 'Tamil Classic',
    status: 'wishlist',
    note: 'A rare window into ancient Tamil emotions, relationships, love, separation, and human psychology.',
  },
  {
    title: 'பதிற்றுப்பத்து',
    author: 'பல சங்கப் புலவர்கள்',
    genre: 'Tamil Classic',
    status: 'wishlist',
    note: 'Sangam poetry focused on Chera kings, leadership, courage, generosity, and the values of ancient Tamil society.',
  },
  {
    title: 'சிறுபாணாற்றுப்படை',
    author: 'நத்தத்தனார்',
    genre: 'Tamil Classic',
    status: 'wishlist',
    note: 'A beautiful Sangam-era journey through landscapes, people, culture, generosity, and the life of an ancient Tamil poet.',
  },

  // =========================
  // Technology - 4
  // =========================
  {
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    genre: 'Systems Design',
    status: 'reading',
    note: 'A deep dive into distributed systems, databases, scalability, reliability, and building data-intensive applications.',
  },
  {
    title: 'The Pragmatic Programmer',
    author: 'David Thomas & Andrew Hunt',
    genre: 'Software Engineering',
    status: 'reading',
    note: 'A timeless guide to software craftsmanship, engineering habits, maintainability, and becoming a better developer.',
  },
  {
    title: 'Refactoring',
    author: 'Martin Fowler',
    genre: 'Software Engineering',
    status: 'wishlist',
    note: 'A practical guide to improving existing code structure without changing its external behavior.',
  },
  {
    title: 'Clean Architecture',
    author: 'Robert C. Martin',
    genre: 'Software Architecture',
    status: 'wishlist',
    note: 'A strong foundation for designing maintainable, scalable, testable, and long-lived software systems.',
  },

  // =========================
  // Psychology - 3
  // =========================
  {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    genre: 'Psychology',
    status: 'wishlist',
    note: 'Explores how people think, make decisions, use intuition, and fall into predictable cognitive biases.',
  },
  {
    title: 'Influence',
    author: 'Robert B. Cialdini',
    genre: 'Psychology',
    status: 'wishlist',
    note: 'A fascinating study of persuasion, social influence, decision-making, and why people say yes.',
  },
  {
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    genre: 'Behavioral Psychology',
    status: 'wishlist',
    note: 'Explains how emotions, behavior, personal experiences, and psychology shape financial decisions.',
  },
];

export const galleryImages: GalleryItem[] = [
  {
    image: '/Pictures/nazreen-banu-xTjrbT_4moA-unsplash.jpg',
    location: 'Vaigai Dam, Tamil Nadu',
    caption: 'Streets of Vaigai Dam — where life moves fast and every corner has a story.',
    date: 'OCT 2024',
  },
  {
    image: '/Pictures/pexels-unnikrishnan-hari-407276183-16768843.jpg',
    location: 'Dindigul, Tamil Nadu',
    caption: 'The hills of Dindigul — quiet mornings and scenic beauty.',
    date: 'APR 2024',
  },
];

export const galleryVideos: GalleryVideoItem[] = [
  {
    video: '/Pictures/17647200-hd_1920_1080_60fps.mp4',
    location: 'Andipatti, Theni',
    caption: 'Rolling hills and green pastures in Andipatti.',
    date: 'MAY 2024',
  },
  {
    video: '/Pictures/16351089_1920_1080_50fps.mp4',
    location: 'Kodaikanal, Tamil Nadu', 
    caption: 'Walking through the mist in Kodaikanal.',
    date: 'MAY 2024',
  },
  {
    video: '/Pictures/14876008_1920_1080_60fps.mp4',
    location: 'Nilgiris, Tamil Nadu',
    caption: 'Winding roads and breathtaking views of the Western Ghats.',
    date: 'SEP 2024',
  },
  {
    video: '/Pictures/19669265-hd_1920_1080_25fps.mp4',
    location: 'Sirumalai, Dindigul',
    caption: 'Sunset at Sirumalai — the endless horizon and calming waves.',
    date: 'OCT 2024',
  },
];

export const gallery: GalleryItem[] = galleryImages;

export const contactLinks: ContactLink[] = [
  { label: 'Email', value: 'jayasriraam.job@gmail.com', href: 'mailto:jayasriraam.job@gmail.com' },
  { label: 'Phone', value: '+91 97901 61669', href: 'tel:+919790161669' },
  { label: 'GitHub', value: 'github.com/Jay-Raam', href: 'https://github.com/Jay-Raam' },
  { label: 'LinkedIn', value: 'linkedin.com/in/jayasriraam', href: 'https://linkedin.com/in/jayasriraam' },
];