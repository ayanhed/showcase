import type { MetadataRoute } from "next";
import * as data from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: data.personalInfo.name,
    short_name: data.personalInfo.shortAppName,
    description: data.personalInfo.about,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: data.theme.background,
    theme_color: data.theme.background,
    orientation: "portrait",
    lang: "en-GB",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["productivity", "portfolio", "business"],
    id: "/",
    prefer_related_applications: false,
    shortcuts: [
      {
        name: "Projects",
        url: "/projects",
        description: "View highlighted projects",
      },
      {
        name: "Blog",
        url: "/blog",
        description: "Read blog posts",
      },
      {
        name: "Contact",
        url: "/contact",
        description: "Get in touch",
      },
    ],
  };
}
