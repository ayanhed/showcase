import {
  personalInfo,
  contactInfo,
  projects,
  Project,
  experience,
} from "./data";

// Base schema types
export interface BaseSchema {
  "@context": string;
  "@type": string;
}

export interface Person extends BaseSchema {
  "@type": "Person";
  name: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  url?: string;
  sameAs?: string[];
  email?: string;
  telephone?: string;
  address?: PostalAddress;
  worksFor?: Organization;
  alumniOf?: EducationalOrganization;
  knowsLanguage?: string[];
}

export interface Organization extends BaseSchema {
  "@type": "Organization";
  name: string;
  url?: string;
  logo?: ImageObject;
  description?: string;
  contactPoint?: ContactPoint;
  founder?: Person;
  sameAs?: string[];
}

export interface Website extends BaseSchema {
  "@type": "Website";
  name: string;
  url: string;
  description?: string;
  inLanguage?: string;
  author?: Person;
  publisher?: Organization;
}

export interface WebPage extends BaseSchema {
  "@type": "WebPage";
  name: string;
  url: string;
  description?: string;
  inLanguage?: string;
  isPartOf?: Website;
  author?: Person;
  datePublished?: string;
  dateModified?: string;
  breadcrumb?: BreadcrumbList;
}

export interface ProfilePage extends BaseSchema {
  "@type": "ProfilePage";
  name: string;
  url: string;
  description?: string;
  inLanguage?: string;
  isPartOf?: Website;
  about?: Person;
  datePublished?: string;
  dateModified?: string;
  mainEntity?: Person;
}

export interface BlogPosting extends BaseSchema {
  "@type": "BlogPosting";
  headline: string;
  description?: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: Person;
  publisher?: Organization;
  image?: ImageObject;
  mainEntityOfPage?: WebPage;
  wordCount?: number;
  articleSection?: string;
}

export interface CreativeWork extends BaseSchema {
  "@type": "CreativeWork";
  name: string;
  description?: string;
  url?: string;
  dateCreated?: string;
  creator?: Person;
  about?: string;
  keywords?: string[];
  image?: ImageObject;
}

export interface SoftwareApplication extends BaseSchema {
  "@type": "SoftwareApplication";
  name: string;
  description?: string;
  url?: string;
  dateCreated?: string;
  creator?: Person;
  applicationCategory?: string;
  operatingSystem?: string;
  screenshot?: ImageObject;
  offers?: Offer;
}

export interface BreadcrumbList extends BaseSchema {
  "@type": "BreadcrumbList";
  itemListElement: ListItem[];
}

export interface ListItem extends BaseSchema {
  "@type": "ListItem";
  position: number;
  name: string;
  item?: string;
}

export interface ImageObject extends BaseSchema {
  "@type": "ImageObject";
  url: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface PostalAddress extends BaseSchema {
  "@type": "PostalAddress";
  addressLocality?: string;
  addressCountry?: string;
  addressRegion?: string;
}

export interface ContactPoint extends BaseSchema {
  "@type": "ContactPoint";
  telephone?: string;
  email?: string;
  contactType?: string;
}

export interface EducationalOrganization extends BaseSchema {
  "@type": "EducationalOrganization";
  name: string;
}

export interface Offer extends BaseSchema {
  "@type": "Offer";
  price?: string;
  priceCurrency?: string;
  availability?: string;
}

// Utility functions
export const createBaseUrl = (): string => {
  return "https://ayanhedayati.com";
};

export const createPerson = (): Person => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    description: personalInfo.about,
    image: `${createBaseUrl()}${personalInfo.profileImage}`,
    url: createBaseUrl(),
    email: personalInfo.email,
    address: {
      "@context": "https://schema.org",
      "@type": "PostalAddress",
      addressLocality: "Birmingham",
      addressCountry: "UK",
    },
    alumniOf: {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: personalInfo.education.university,
    },
    knowsLanguage: personalInfo.languages.map((lang) => lang.name),
    sameAs: [contactInfo.github, contactInfo.linkedin, contactInfo.instagram],
  };
};

export const createWebsite = (): Website => {
  return {
    "@context": "https://schema.org",
    "@type": "Website",
    name: `${personalInfo.name} - ${personalInfo.title}`,
    url: createBaseUrl(),
    description: personalInfo.about,
    inLanguage: "en-US",
    author: createPerson(),
    publisher: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: personalInfo.name,
      url: createBaseUrl(),
      founder: createPerson(),
    },
  };
};

export const createWebPage = (
  name: string,
  path: string,
  description?: string,
  datePublished?: string,
  dateModified?: string
): WebPage => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    url: `${createBaseUrl()}${path}`,
    description: description || personalInfo.about,
    inLanguage: "en-US",
    isPartOf: createWebsite(),
    author: createPerson(),
    datePublished,
    dateModified,
  };
};

export const createProfilePage = (
  name: string,
  path: string,
  description?: string
): ProfilePage => {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name,
    url: `${createBaseUrl()}${path}`,
    description: description || personalInfo.about,
    inLanguage: "en-US",
    isPartOf: createWebsite(),
    about: createPerson(),
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    mainEntity: createPerson(),
  };
};

export const createBlogPosting = (
  title: string,
  slug: string,
  description: string,
  datePublished: string,
  dateModified?: string,
  wordCount?: number
): BlogPosting => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: `${createBaseUrl()}/blog/${slug}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: createPerson(),
    publisher: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: personalInfo.name,
      url: createBaseUrl(),
    },
    mainEntityOfPage: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      url: `${createBaseUrl()}/blog/${slug}`,
      description,
      inLanguage: "en-US",
    },
    wordCount,
    articleSection: "Technology",
  };
};

export const createSoftwareApplication = (
  project: Project
): SoftwareApplication => {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    url: project.link,
    dateCreated: project.date,
    creator: createPerson(),
    applicationCategory: "WebApplication",
    operatingSystem: "Web Browser",
    screenshot: project.projectImage
      ? {
          "@context": "https://schema.org",
          "@type": "ImageObject",
          url: `${createBaseUrl()}${project.projectImage}`,
        }
      : undefined,
    offers: project.link
      ? {
          "@context": "https://schema.org",
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        }
      : undefined,
  };
};

export const createCreativeWork = (project: Project): CreativeWork => {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: project.link,
    dateCreated: project.date,
    creator: createPerson(),
    about: "Software Development",
    keywords: [
      ...(project.techDetails.frontend || []),
      ...(project.techDetails.backend || []),
      ...(project.techDetails.libraries || []),
    ],
    image: project.projectImage
      ? {
          "@context": "https://schema.org",
          "@type": "ImageObject",
          url: `${createBaseUrl()}${project.projectImage}`,
        }
      : undefined,
  };
};

export const createBreadcrumbList = (
  items: { name: string; url?: string }[]
): BreadcrumbList => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@context": "https://schema.org",
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url ? `${createBaseUrl()}${item.url}` : undefined,
    })),
  };
};

// Combined schemas for different page types
export const getHomePageSchemas = () => {
  return [
    createWebsite(),
    createProfilePage(
      `${personalInfo.name} - ${personalInfo.title}`,
      "/",
      personalInfo.about
    ),
    createPerson(),
  ];
};

export const getAboutPageSchemas = () => {
  return [
    createProfilePage(
      `About ${personalInfo.name}`,
      "/about",
      `Learn more about ${personalInfo.name}, ${personalInfo.title} based in ${personalInfo.location}`
    ),
    createPerson(),
    createBreadcrumbList([{ name: "Home", url: "/" }, { name: "About" }]),
  ];
};

export const getBlogPageSchemas = () => {
  return [
    createWebPage(
      "Tech Blog",
      "/blog",
      "A blog about technology, programming, and various intriguing topics"
    ),
    createBreadcrumbList([{ name: "Home", url: "/" }, { name: "Blog" }]),
  ];
};

export const getProjectsPageSchemas = () => {
  return [
    createWebPage(
      "Projects",
      "/projects",
      "Explore my latest projects and software development work"
    ),
    createBreadcrumbList([{ name: "Home", url: "/" }, { name: "Projects" }]),
    ...projects.map((project) => createSoftwareApplication(project)),
  ];
};

export const getContactPageSchemas = () => {
  return [
    createWebPage(
      "Contact",
      "/contact",
      `Get in touch with ${personalInfo.name} for collaboration opportunities`
    ),
    createBreadcrumbList([{ name: "Home", url: "/" }, { name: "Contact" }]),
  ];
};

// Individual blog post schema generator
export const getBlogPostSchemas = (
  title: string,
  slug: string,
  excerpt: string,
  publishedDate: string,
  modifiedDate?: string,
  content?: string
) => {
  const wordCount = content ? content.split(/\s+/).length : undefined;

  return [
    createBlogPosting(
      title,
      slug,
      excerpt,
      publishedDate,
      modifiedDate,
      wordCount
    ),
    createBreadcrumbList([
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
      { name: title },
    ]),
  ];
};

// Individual project page schema generator
export const getProjectPageSchemas = (project: Project) => {
  return [
    createWebPage(
      project.title,
      `/projects/${project.slug}`,
      project.description
    ),
    createSoftwareApplication(project),
    createCreativeWork(project),
    createBreadcrumbList([
      { name: "Home", url: "/" },
      { name: "Projects", url: "/projects" },
      { name: project.title },
    ]),
  ];
};

// FAQ Page schema (if you add FAQ in the future)
export const createFAQPage = (faqs: { question: string; answer: string }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};

// Service schema for freelance work
export const createServiceSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Full Stack Development Services",
    description:
      "Professional web development, React applications, and cloud solutions",
    provider: createPerson(),
    areaServed: ["United Kingdom", "Europe", "Remote"],
    serviceType: "Software Development",
    offers: [
      {
        "@type": "Offer",
        name: "Frontend Development",
        description: "React, TypeScript, and modern web applications",
        category: "Web Development",
      },
      {
        "@type": "Offer",
        name: "Backend Development",
        description: "Node.js, APIs, and cloud infrastructure",
        category: "Backend Development",
      },
      {
        "@type": "Offer",
        name: "Full Stack Solutions",
        description: "End-to-end web application development",
        category: "Full Stack Development",
      },
    ],
  };
};

// Professional Profile schema for enhanced LinkedIn-style SEO
export const createProfessionalProfile = () => {
  const person = createPerson();
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2024-01-01",
    dateModified: new Date().toISOString(),
    mainEntity: {
      ...person,
      hasOccupation: {
        "@type": "Occupation",
        name: personalInfo.title,
        occupationalCategory: "Software Developer",
        responsibilities: [
          "Full-stack web development",
          "React and TypeScript applications",
          "Cloud infrastructure and DevOps",
          "Technical leadership and mentoring",
        ],
      },
      worksFor: experience.map((exp) => ({
        "@type": "Organization",
        name: exp.company,
        startDate: exp.period.split(" - ")[0],
        endDate: exp.period.includes("Present")
          ? undefined
          : exp.period.split(" - ")[1],
      })),
    },
  };
};
