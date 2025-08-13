export interface TechDetails {
  frontend?: string[];
  backend?: string[];
  libraries?: string[];
  tools?: string[];
}

export interface Project {
  title: string;
  slug: string;
  date: string;
  description: string;
  oneLiner?: string;
  techDetails: TechDetails;
  features?: string[];
  challenge?: string;
  result?: string;
  link?: string;
  isLatest?: boolean;
  projectImage?: string;
}

export const theme = {
  primary: "#ad46ff",
  background: "#1A1A1A",
};

export const personalInfo = {
  name: "Ayan Hedayati",
  title: "Senior Full Stack Developer",
  shortAppName: "AH.",
  location: "Birmingham, UK",
  email: "ayanhedaya0@gmail.com",
  phone: "+44 7828724419",
  website: "ayanhedayati.com",
  github: "ayanhedayat",
  profileImage: "/profile.jpg", // Add profile image path - replace with actual JPG when available
  about:
    "Full Stack Developer with a designer's eye and a maker's mindset. Building software that feels as good as it works.",
  mission: "Build beautifully, think deeply, and ship fast!",
  education: {
    degree: "Computer Systems BSc (Hons.)",
    university: "Nottingham Trent University",
  },
  languages: [
    { name: "English", level: "Fluent" },
    { name: "Urdu", level: "Fluent Verbal" },
    { name: "Balouchi", level: "Learning" },
    { name: "Arabic", level: "Learning" },
  ],
};

export const skills = {
  technologies: [
    { name: "React", weight: 0.1 },
    { name: "TypeScript", weight: 0.3 },
    { name: "Node.js", weight: -0.5 },
    { name: "CSS", weight: 0.5 },
    { name: "Git", weight: -0.3 },
    { name: "Docker", weight: -0.8 },
    { name: "Azure", weight: -0.6 },
    { name: "AWS", weight: -0.9 },
    { name: "Shopify", weight: 0.1 },
    { name: "Express", weight: -0.7 },
    { name: "Redux", weight: 0.35 },
    { name: "Gatsby", weight: 0.55 },
    { name: "Next.js", weight: 0.15 },
    { name: "Webpack", weight: 0.75 },
    { name: "Tailwind", weight: 0.4 },
    { name: "Storybook", weight: 0.6 },
  ],
};

export const experience = [
  {
    title: "Senior Full Stack Engineer",
    company: "D/Gauge Ltd (Part of TÜV Rheinland UK)",
    period: "Jan 2020 - Present",
    location: "Birmingham, UK",
    achievements: [
      "System architecture design",
      "Prototype development",
      "Feature delivery leadership",
      "Codebase performance refactor",
      "CI/CD pipeline setup",
      "Cloud infrastructure management",
      "Internal tools development",
      "Developer mentoring",
    ],
  },
  {
    title: "Software Engineer",
    company: "Holiday Extras Ltd",
    period: "Aug 2018 – Jan 2020",
    location: "Birmingham, UK",
    achievements: [
      "Legacy system migration",
      "Micro-services development",
      "Platform feature enhancement",
      "Continuous delivery software",
      "Split tests design",
      "Usage logs monitoring",
    ],
  },
  {
    title: "Lead Frontend Developer",
    company: "NetSupport Ltd",
    period: "Sep 2016 – Jan 2018",
    location: "Birmingham, UK",
    achievements: [
      "UI developer leadership",
      "UI/UX design",
      "REST API development",
      "Workload management",
      "Agile environment participation",
      "Junior team mentoring",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Snooks.app",
    slug: "snooks-app",
    date: "2024 - Present",
    description: "A social snooker scoreboard app for snooker enthusiasts.",
    oneLiner:
      "Snooks.app: A social, mobile-friendly snooker scoreboard that tracks frames, enforces rules, and lets friends save and share results.",
    techDetails: {
      frontend: [
        "Next.js (App Router)",
        "TypeScript",
        "Tailwind CSS",
        "Radix UI",
        "Formik",
        "Motion",
        "PWA assets",
      ],
      backend: [
        "Drizzle ORM",
        "Vercel Postgres",
        "Edge Runtime APIs",
        "Svix webhooks",
        "Clerk (auth)",
      ],
      libraries: ["PostHog", "Sentry"],
      tools: [],
    },
    features: [
      "Scorekeeping with rules: Full snooker flow (reds/colors, order mode, free ball, fouls, undo, winner detection).",
      "Social graph: Mutual-friends model; authenticated players persist, non-friends saved as guests.",
      "Match history syncing: Local play with resilient client state; server sync on match end via transactional APIs.",
      "Mobile-first UI: Fast, animated scoreboard controls, sounds, and PWA assets for install-like UX.",
      "Observability: PostHog event tracking and Sentry error capture across client and server.",
    ],
    challenge:
      "Ensuring accurate snooker rules and data integrity while syncing from a stateful client to the server with privacy constraints. Solved by a dedicated useSnookerGame hook with immutable state and history for undo, localStorage persistence, and an Edge API that enforces mutual-friend checks and writes frames/scores transactionally via Drizzle.",
    result:
      "MVP in active use with authenticated score persistence, guest support, and production-grade analytics/monitoring; core APIs run at the edge with a Postgres-backed schema and webhook-driven user/org provisioning.",
    link: "https://snooks.app",
    isLatest: true,
    projectImage: "/projects/snooksapp.png",
  },
  {
    title: "Rockafellas.co.uk",
    slug: "rockafellas",
    date: "2024",
    description:
      "A fast, SEO‑optimized restaurant website that showcases Rockafellas’ menu and brand with structured data and a modern, responsive UI.",
    oneLiner:
      "A fast, SEO‑optimized restaurant website that showcases Rockafellas’ menu and brand with structured data and a modern, responsive UI.",
    techDetails: {
      frontend: [
        "TypeScript",
        "Next.js 15 (App Router)",
        "React 19",
        "Tailwind CSS",
        "Google Fonts",
        "Next/Image",
      ],
      backend: [],
      libraries: [
        "Radix UI",
        "class‑variance‑authority",
        "next‑seo",
        "next‑sitemap",
        "react‑awesome‑reveal",
        "Framer Motion",
        "GSAP",
        "Swiper",
      ],
      tools: [
        "Jest + Testing Library",
        "Netlify Next.js plugin",
        "Vercel config",
      ],
    },
    features: [
      "Dynamic Menu: Renders category‑driven menu from local JSON with availability and ‘in‑store only’ flags; data validated via a TypeScript CLI.",
      "SEO & Sharing: Centralized Next.js Metadata, Open Graph/Twitter, JSON‑LD per page, and automated sitemap/robots.",
      "Polished UI: Tailwind‑themed design, Radix UI patterns, custom fonts, responsive image/video hero, and subtle animations.",
      "Ops‑Ready: Environment‑toggle maintenance mode, health check endpoint, and CSP‑aware SVG/image optimization.",
      "Deployable Anywhere: First‑class configs for Netlify and Vercel.",
    ],
    challenge:
      "Avoiding duplicated SEO and schema across App Router pages. Solved by consolidating metadata and JSON‑LD into reusable helpers (src/lib/metadata.ts, src/lib/jsonld.ts) and a drop‑in component (BusinessJsonLd), enabling consistent SEO at page and layout levels.",
    result:
      "Production‑ready and CI‑friendly: automated sitemap generation, structured data baked in, health endpoint provided, JSON content validated at build, and dual deployment configurations included.",
    link: "https://rockaburger.co.uk/",
    isLatest: false,
    projectImage: "/projects/rockafellas.png",
  },
  {
    title: "Alphabet Runner",
    slug: "alphabet-runner",
    date: "2023",
    description:
      "A dynamic web-based word-building game with real-time multiplayer scoring and interactive card-based gameplay.",
    oneLiner:
      "A dynamic web-based word-building game with real-time multiplayer scoring and interactive card-based gameplay.",
    techDetails: {
      frontend: ["React 16.8", "Gatsby 2.3", "SCSS/Sass", "Bootstrap 4.3"],
      backend: ["Firebase Realtime Database", "Firebase App"],
      libraries: [
        "React Bootstrap",
        "FontAwesome",
        "React Confetti",
        "React Timer Hook",
        "Day.js",
      ],
      tools: ["Gatsby plugins (Sharp, PostCSS, React Helmet)", "Node.js"],
    },
    features: [
      "Interactive Card Gameplay: 14 alphabet cards with color-coded letters for strategic word building",
      "Real-time Leaderboard: Firebase-powered score tracking with live updates and player rankings",
      "Progressive Difficulty: Multiple game levels with varying word length requirements (3-4 letters)",
      "Responsive Design: Mobile-optimized interface with adaptive layouts and touch controls",
      "Game State Management: Comprehensive state handling for cards, scoring, timers, and player progression",
    ],
    challenge:
      "Implemented complex card distribution logic ensuring unique card selection across hand, play area, and nominated cards while maintaining game balance. Solved through iterative card validation and collection management to prevent duplicate cards from appearing in multiple game zones simultaneously.",
    result:
      "Successfully deployed interactive word game with real-time multiplayer functionality, featuring a complete game loop with scoring, timer integration, and responsive design optimized for both desktop and mobile play.",
    link: "https://alphabetrunner.com/play",
    isLatest: false,
    projectImage: "/projects/alphabetrunner.png",
  },
];

export const blogPosts = [
  {
    title: "Hello World!",
    excerpt:
      "Join me on this journey as I share insights, experiences, and stories from my life and work.",
    date: "July 30, 2025",
    slug: "welcome-to-my-blog",
    isLatest: true,
  },
];

export const contactInfo = {
  email: "hello@ayanhedayati.com",
  phone: "+44 7828724419",
  location: "Birmingham, UK",
  github: "https://github.com/ayanhed",
  linkedin: "https://www.linkedin.com/in/ayanhedayati/",
  instagram: "https://www.instagram.com/ayaanh92/",
};

export const stories = [
  {
    id: "s1",
    type: "text",
    text: "🎉 My new story feature—it's like Instagram but for my blog! Quick updates, fun visuals, and more.",
    background: "bg-gradient-to-br from-purple-700 via-fuchsia-600 to-pink-600",
    durationMs: 4500,
    cta: { label: "Read blog", href: "/blog" },
  },
  // {
  //   id: "s2",
  //   type: "image",
  //   src: "/projects/rockafellas.png",
  //   durationMs: 5000,
  //   cta: { label: "Projects", href: "/projects" },
  // },
  // {
  //   id: "s3",
  //   type: "video",
  //   src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  //   cta: { label: "Contact me", href: "/contact" },
  // },
] as const;
