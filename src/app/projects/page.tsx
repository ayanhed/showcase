"use client";

import { projects } from "@/lib/data";
import {
  Section,
  Container,
  HeroSection,
  CallToAction,
  Animate,
  Stack,
  Text,
} from "@/components/ui";
import ProjectCard from "@/components/ProjectCard";
import JsonLd from "@/components/JsonLd";
import { getProjectsPageSchemas } from "@/lib/jsonld";

export default function Projects() {
  return (
    <div id="projects">
      {/* JSON-LD Structured Data */}
      <JsonLd data={getProjectsPageSchemas()} />
      
      {/* Hero Section */}
      <HeroSection
        title="My Projects"
        subtitle="A collection of projects showcasing my skills in full-stack development, from small applications to enterprise-level solutions."
      />

      {/* Note about upcoming content */}
      <Section>
        <Container>
          <Text variant="muted">I’m refreshing this section — new projects will be added soon.</Text>
        </Container>
      </Section>

      {/* Projects Grid */}
      <Section>
        <Container>
          <Stack spacing="xl" className="space-y-8">
            {projects.map((project, index) => (
              <Animate
                key={project.title}
                type="slideUp"
                delay={index * 0.1}
                once={true}
                className="w-full"
              >
                <ProjectCard
                  title={project.title}
                  slug={project.slug}
                  description={project.description}
                  isLatest={project.isLatest}
                  index={index}
                  image={project.projectImage}
                />
              </Animate>
            ))}
          </Stack>
        </Container>
      </Section>

      {/* Call to Action */}
      <CallToAction
        title="Interested in working together? Let's discuss your project!"
        buttonText="Get in Touch"
        buttonHref="/contact"
      />
    </div>
  );
}
