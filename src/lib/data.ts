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
  mission: "Build beautifully, have fun & ship fast!",
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
    { name: "Shopify", weight: 0.4 },
    { name: "Express", weight: -0.7 },
    { name: "Redux", weight: 0.35 },
    { name: "Gatsby", weight: 0.55 },
    { name: "Next.js", weight: 0.15 },
    { name: "Webpack", weight: 0.75 },
    { name: "Tailwind", weight: 0.23 },
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
    title: "ayanhedayati.com",
    slug: "site",
    date: "2025 - Present",
    description:
      "My personal website showcasing projects, blog, and contact — built with a modern, accessible, high‑performance stack.",
    oneLiner:
      "This site: a fast, accessible personal website with App Router, modern UI, and solid SEO.",
    techDetails: {
      frontend: ["Next.js 15 (App Router)", "React 19", "TypeScript", "Tailwind CSS"],
      backend: [],
      libraries: ["Radix UI", "Framer Motion", "GSAP"],
      tools: ["Netlify", "Vercel", "Jest + Testing Library"],
    },
    features: [
      "App Router architecture with shared UI primitives and animations",
      "Centralized SEO (Metadata, Open Graph, JSON‑LD) and custom sitemap",
      "Responsive, accessible design with Tailwind CSS and Radix UI",
      "Deployed with production configs for Netlify and Vercel",
    ],
    result: "Live, iterated frequently. New content landing soon.",
    link: "https://ayanhedayati.com",
    isLatest: true,
  },
  // Temporarily hiding previous projects — they will return soon.
  /*
  (Snooks.app, Rockafellas.co.uk, Alphabet Runner)
  */
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
] as const;
