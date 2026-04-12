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

export const navLinks: NavLink[] = [
  { href: '#education', label: 'Education' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
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
    tags: ['React.js', 'Next.js', 'TypeScript', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Tailwind CSS', 'Material UI', 'Ant Design', 'SCSS'],
  },
  {
    title: 'State & Mobile',
    icon: 'state',
    tags: ['Redux', 'Redux Toolkit', 'Zustand', 'Ionic React', 'Capacitor', 'PWA'],
  },
  {
    title: 'Backend',
    icon: 'backend',
    tags: ['Node.js', 'Express.js', 'GraphQL', 'GraphQL Yoga', 'REST APIs', 'Firebase', 'MongoDB'],
  },
  {
    title: 'Real-Time & IoT',
    icon: 'realtime',
    tags: ['MQTT', 'WebSocket', 'Chart.js', 'Firebase Realtime DB', 'Cloud Messaging'],
  },
  {
    title: 'Tools & Design',
    icon: 'tools',
    tags: ['Git', 'GitHub', 'Postman', 'Figma', 'CI/CD Pipelines'],
  },
  {
    title: 'Architecture',
    icon: 'architecture',
    tags: ['MERN Stack', 'SOLID Principles', 'Custom Hooks', 'RBAC', 'JWT Auth'],
  },
];

export const experiences: ExperienceItem[] = [
  {
    date: 'Dec 2024 — Present',
    role: 'Junior Software Developer',
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
    role: 'Junior Developer',
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
    tags: ['Ionic', 'Capacitor', 'SCSS', 'Redux', 'Firebase', 'MQTT', 'Chart.js'],
    desc: 'An IoT-based water distribution management app that allows users to monitor, control, and automate pumps and valves across multiple stations in real time. The app connects to IoT devices using MQTT over WebSocket, visualizes telemetry data, and sends push alerts for pressure, flow, and system health metrics.',
    image: '/project/cenpilot.png',
    bullets: [
      'Integrated MQTT over WebSocket for real-time telemetry updates and bidirectional pump control, delivering a 35–40% improvement in real-time control performance',
      'Designed a responsive UI with modular components for device lists, alerts, and analytics dashboards',
      'Built live charts using Chart.js to visualize flow rates, tank levels, and water usage patterns',
      'Connected Firebase for authentication, notification handling, and data caching',
      'Increased IoT command response speed by 45% through optimized event handling and async operations',
    ],
    impact: [
      { num: 'PPV', label: 'Company' },
      { num: '7+', label: 'Technologies' },
      { num: 'Live', label: 'Availability' },
    ],
  },
  {
    num: '04',
    title: 'Cenpoilt – Web',
    tags: ['React.js', 'Bootstrap', 'Redux', 'Firebase', 'REST API', 'Chart.js'],
    desc: 'The centralized web dashboard for the Cenpoilt IoT ecosystem. Provides an all-in-one admin interface for managing devices, monitoring live telemetry, analyzing reports, and assigning user permissions. The system ensures seamless coordination between IoT endpoints and operational users.',
    image: '/project/cenpilot.png',
    bullets: [
      'Engineered a clean and functional dashboard for device configuration and live telemetry visualization',
      'Implemented real-time synchronization with MQTT broker through Firebase Cloud Messaging',
      'Built analytics components to show daily, weekly, and monthly system health trends',
      'Reduced admin data retrieval latency by 35% using optimized Firestore queries and modular Redux store design',
      'Developed admin panel with device provisioning, configuration management, and automated alert systems',
    ],
    impact: [
      { num: 'PPV', label: 'Company' },
      { num: '6+', label: 'Technologies' },
      { num: 'Live', label: 'Availability' },
    ],
  },
  {
    num: '05',
    title: 'Tiaano ERP',
    tags: ['React.js', 'Tailwind CSS', 'Redux', 'Firebase', 'Chart.js', 'REST API'],
    desc: 'A full-featured ERP web application built for a manufacturing firm to handle production, inventory, sales, and purchase workflows. The system integrates Firebase authentication and provides real-time dashboards with Chart.js visualizations for data-driven management.',
    image: '/project/tiaano.png',
    bullets: [
      'Designed and developed dynamic modules for inventory, production tracking, and employee task monitoring',
      'Created a clean UI using Tailwind CSS for consistent UX across all internal modules',
      'Integrated REST APIs for transaction workflows, ensuring smooth synchronization between modules',
      'Built real-time charts and analytics panels with Chart.js for operational visibility',
      'Reduced code redundancy by 30% via reusable Redux patterns and component abstraction',
    ],
    impact: [
      { num: 'Tiaano', label: 'Company' },
      { num: '6+', label: 'Technologies' },
      { num: 'Developing', label: 'Availability' },
    ],
  },
  {
    num: '06',
    title: 'PPV ERP Internal Operations Platform',
    tags: ['React.js', 'Tailwind CSS', 'Redux Toolkit', 'Headless UI', 'Chart.js', "Firebase"],
    desc: 'A modern in-house ERP solution for managing PPV internal operations — from tracking and billing to production analytics. Designed for performance, scalability, and seamless cross-department workflow automation.',
    image: '/project/ppverp.webp',
    bullets: [
      'Architected a modular React.js + Redux Toolkit frontend across finance, HR, and production modules — reducing code duplication by 30%',
      'Built real-time BI dashboards with Chart.js displaying live KPIs, production metrics, and sales analytics used daily across departments',
      'Engineered a granular RBAC system using Headless UI, supporting 4 distinct user roles across HR, finance, production, and admin',
      'Improved API throughput by 40% through MongoDB query optimization and optimized async data flow',
      'Architected reusable component structure with custom hooks and utility functions, cutting new-feature delivery time by 35%',
    ],
    impact: [
      { num: 'PPV', label: 'Company' },
      { num: '6+', label: 'Technologies' },
      { num: 'Developing', label: 'Availability' },
    ],
  },
  {
    num: '07',
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
    num: '08',
    title: 'Paarambhariya – E-commerce & Admin Platform',
    tags: ['React.js', 'Tailwind CSS', 'Zustand', 'Chart.js', 'REST API', 'Axios'],
    desc: 'A full-scale e-commerce and enterprise admin platform built for Paarambhariya, covering the entire business lifecycle — from storefront and order management to production, logistics, finance, and analytics. Designed for enterprise users with role-based access control, modular architecture, and a high-performance React.js frontend powered by Zustand state management and REST API integration.',
    image: '/project/Nayagi.png',
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
    num: '09',
    title: 'Vipani ERP',
    tags: ['React.js', 'Next.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'GraphQL Yoga', 'MongoDB', 'Redis', 'Socket.io', 'JWT'],
    desc: 'A full-scale enterprise resource planning platform built for small and medium-sized businesses, encompassing 12 production modules including Inventory, HR, Payroll, Finance, CRM, Purchase, Sales, Reports, Settings, User Management, Appointments, and Production. Features real-time collaboration, role-based access control, and a high-performance backend.',
    image: '/project/VIPANI.png',
    bullets: [
      'Engineered a full-stack ERP platform across 12 modules (Inventory, HR, Payroll, CRM, Finance, Sales, Production) using Node.js, Express.js, and GraphQL Yoga',
      'Implemented JWT authentication with refresh token rotation and granular RBAC across all workflows and user roles',
      'Deployed Redis caching + MongoDB aggregation optimization, reducing API response times by 35–40% under concurrent load',
      'Integrated GraphQL subscriptions and Socket.io for real-time bidirectional data sync across all 12 modules',
      'Built middleware for request validation, structured error handling, and audit logging',
      'Developed a responsive ERP frontend using React.js and Next.js with Tailwind CSS',
    ],
    impact: [
      { num: 'Akkenam', label: 'Company' },
      { num: '10+', label: 'Technologies' },
      { num: 'Live', label: 'Availability' },
    ],
  },
  {
    num: '10',
    title: 'MySmartAlign',
    tags: ['Next.js', 'React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'GraphQL Yoga', 'MongoDB', 'Redis', 'Socket.io', 'JWT', 'Firebase'],
    desc: 'A full-scale dental ecosystem platform covering the full lifecycle: patient-facing site, appointment booking, clinic dashboards, mobile apps for patients and doctors, treatment tracking, and internal ERP modules. Built with Next.js frontend and Node.js + GraphQL Yoga backend with real-time updates.',
    image: '/project/mysmartalign.png',
    bullets: [
      'Architected a multi-service backend using Node.js, Express.js, and GraphQL Yoga serving patients, doctors, admin, and staff roles in one unified ecosystem',
      'Built a SEO-optimized patient-facing platform in Next.js and comprehensive admin interfaces in React.js, deployed to production',
      'Implemented JWT-based authentication with RBAC across patient, doctor, admin, and staff roles',
      'Optimized MongoDB aggregation pipelines with compound indexing, cutting data retrieval time by ~40% across high-volume appointment and billing queries',
      'Integrated Socket.io for real-time appointment and treatment progress updates',
      'Configured Firebase Cloud Messaging with a custom notification service for targeted push alerts across all user roles',
    ],
    impact: [
      { num: 'Akkenam', label: 'Company' },
      { num: '11+', label: 'Technologies' },
      { num: 'Live', label: 'Availability' },
    ],
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Design Direction',
    text: 'I start by defining layout hierarchy, interaction goals, and visual direction so the product has a clear structure before development begins.',
  },
  {
    step: '02',
    title: 'Component Build',
    text: 'I translate approved designs into reusable frontend systems with clean components, scalable state flow, and responsive behavior across screens.',
  },
  {
    step: '03',
    title: 'Integration & Polish',
    text: 'I connect APIs, real-time services, and business workflows, then optimize loading, edge states, and usability so the product feels production-ready.',
  },
  {
    step: '04',
    title: 'Deploy & Improve',
    text: 'After launch, I focus on stability, performance improvements, and iteration so the system keeps evolving with product and team needs.',
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
    title: 'Aathadi Aathadi',
    artist: 'SS Thaman',
    image: '/songs/106.jpg',
    link: 'https://www.jiosaavn.com/song/aathadi-aathadi/QSAbWUEBRnA',
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
    image: '/songs/6.jpg',
    link: 'https://www.jiosaavn.com/song/paravaiye-engu-irukkirai/L1ocBzECc2Q',
  },
  {
    title: 'Rasathi',
    artist: 'Ilaiyaraaja, Shahul Hameed',
    image: '/songs/7.jpg',
    link: 'https://www.jiosaavn.com/song/rasathi/FT8nbkx3RHc',
  },
  {
    title: 'Poongatrile',
    artist: 'A.R. Rahman, Unnikrishnan',
    image: '/songs/8.jpg',
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
    title: 'Uyire Un Uyirena',
    artist: 'A.R. Rahman, Hariharan',
    image: '/songs/12.jpg',
    link: 'https://www.jiosaavn.com/song/uyire-un-uyirena/PRgBByV7Dkc',
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

export const contactLinks: ContactLink[] = [
  { label: 'Email', value: 'jayasriraam.job@gmail.com', href: 'mailto:jayasriraam.job@gmail.com' },
  { label: 'Phone', value: '+91 97901 61669', href: 'tel:+919790161669' },
  { label: 'GitHub', value: 'github.com/jayasriraam', href: 'https://github.com/jayasriraam' },
  { label: 'LinkedIn', value: 'linkedin.com/in/jayasriraam', href: 'https://linkedin.com/in/jayasriraam' },
];