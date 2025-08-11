import { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, Project } from "@/lib/data";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

interface ProjectLayoutProps {
  children: React.ReactNode;
  params: { slug: string };
}

export async function generateStaticParams() {
  return (projects as Project[]).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;
  const project = (projects as Project[]).find((p) => p.slug === slug);
  if (!project) return {};

  const title = project.title;
  const description = project.oneLiner || project.description;
  const baseUrl = "https://ayanhedayati.com";
  const url = `${baseUrl}/projects/${project.slug}`;
  const ogImage = project.projectImage
    ? project.projectImage.startsWith("http")
      ? project.projectImage
      : `${baseUrl}${project.projectImage}`
    : undefined;

  const keywords = [
    ...(project.techDetails?.frontend ?? []),
    ...(project.techDetails?.backend ?? []),
    ...(project.techDetails?.libraries ?? []),
    ...(project.techDetails?.tools ?? []),
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "article",
      url,
      images: ogImage
        ? [{ url: ogImage, alt: `${project.title} screenshot` }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    alternates: { canonical: url },
  };
}

export default async function ProjectLayout({
  children,
  params,
}: ProjectLayoutProps) {
  const slug = params.slug;
  const project = (projects as Project[]).find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <div id="project">
      <Section>
        <Container>{children}</Container>
      </Section>
    </div>
  );
}
