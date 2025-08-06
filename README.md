# Ayan Hedayati - Personal Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. The website showcases Ayan's experience as a Senior Full Stack Developer with over 8 years of experience in building scalable, production-grade systems.

## 🚀 Features

- **Modern Design**: Clean, professional design with dark theme
- **Responsive**: Fully responsive across all devices
- **Fast Performance**: Built with Next.js for optimal performance
- **Easy Content Management**: Centralized data file for easy updates
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **SEO Optimized**: Built with SEO best practices

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── about/page.tsx     # About page
│   ├── projects/page.tsx  # Projects page
│   ├── blog/page.tsx      # Blog page
│   ├── contact/page.tsx   # Contact page
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── Navigation.tsx     # Navigation component
│   ├── ClientOnly.tsx     # Client-side only component
│   ├── ProjectCard.tsx    # Project card component
│   └── SectionTitle.tsx   # Section title component
└── lib/
    └── data.ts           # Centralized data file
```

## 🎯 Easy Content Updates

All website content is centralized in `src/lib/data.ts`. To update the website content, simply edit this file:

### Personal Information

```typescript
export const personalInfo = {
  name: "Ayan Hedayati",
  title: "Senior Full Stack Developer",
  location: "Birmingham, UK",
  email: "ayanhedaya0@gmail.com",
  phone: "+44 7828724419",
  website: "ayanhedaya0.com",
  github: "ayanhedayat",
  about: "Your professional summary...",
  mission: "Your mission statement...",
  education: {
    degree: "Computer Systems BSc (Hons.)",
    university: "Nottingham Trent University",
  },
  languages: [
    { name: "English", level: "Fluent" },
    // Add more languages...
  ],
};
```

### Skills & Technologies

```typescript
export const skills = {
  topSkills: [
    "Software Engineer",
    "Team / Project Lead",
    // Add more skills...
  ],
  technologies: [
    "React",
    "TypeScript",
    "Node.js",
    // Add more technologies...
  ],
};
```

### Experience

```typescript
export const experience = [
  {
    title: "Senior Full Stack Engineer",
    company: "D/Gauge Ltd (Part of TÜV Rheinland UK)",
    period: "Jan 2020 - Present",
    location: "Birmingham, UK",
    achievements: [
      "Designed and built the system architecture...",
      // Add more achievements...
    ],
  },
  // Add more experience entries...
];
```

### Projects

```typescript
export const projects = [
  {
    title: "RiJ Platform",
    date: "2020 - Present",
    description: "A comprehensive platform...",
    tech: ["React", "Node.js", ".NET", "Azure"],
    link: "#",
    isLatest: true,
  },
  // Add more projects...
];
```

### Blog Posts

```typescript
export const blogPosts = [
  {
    title: "Building Scalable Microservices with Node.js",
    excerpt: "A deep dive into designing...",
    date: "March 15, 2024",
    slug: "building-scalable-microservices",
    isLatest: true,
  },
  // Add more blog posts...
];
```

### Contact Information

```typescript
export const contactInfo = {
  email: "ayanhedaya0@gmail.com",
  phone: "+44 7828724419",
  location: "Birmingham, UK",
  website: "ayanhedaya0.com",
  github: "https://github.com/ayanhedayat",
  linkedin: "#",
};
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd showcase
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## 📝 Content Management Guide

### Adding New Projects

1. Open `src/lib/data.ts`
2. Add a new project to the `projects` array
3. Include all required fields: `title`, `date`, `description`, `tech`, `link`
4. Set `isLatest: true` for the most recent project

### Adding New Blog Posts

1. Open `src/lib/data.ts`
2. Add a new blog post to the `blogPosts` array
3. Include all required fields: `title`, `excerpt`, `date`, `slug`
4. Set `isLatest: true` for the most recent post

### Updating Experience

1. Open `src/lib/data.ts`
2. Modify the `experience` array
3. Each experience entry should include: `title`, `company`, `period`, `location`, `achievements`

### Updating Skills

1. Open `src/lib/data.ts`
2. Modify the `skills` object
3. Update `topSkills` and `technologies` arrays as needed

## 🎨 Customization

### Colors

The website uses a dark theme with custom colors defined in `tailwind.config.ts`. You can modify the color scheme by updating the theme configuration.

### Styling

All styling is done with Tailwind CSS. You can modify the appearance by updating the className attributes in the components.

### Animations

Animations are powered by Framer Motion. You can adjust animation parameters in the motion components throughout the codebase.

## 📱 Responsive Design

The website is fully responsive and optimized for:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔧 Development

### Code Style

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting

### File Structure

- Components are reusable and modular
- Data is centralized in `src/lib/data.ts`
- Pages are organized in the app directory

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The website can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or support, please contact:

- Email: ayanhedaya0@gmail.com
- GitHub: [ayanhedayat](https://github.com/ayanhedayat)

---

Built with ❤️ by Ayan Hedayati
