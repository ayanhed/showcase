"use client";

import { projects } from "@/lib/data";
import {
  Section,
  Container,
  HeroSection,
  CallToAction,
  Animate,
  Stack,
} from "@/components/ui";
import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
  return (
    <div id="projects">
      {/* Hero Section */}
      <HeroSection
        title="My Projects"
        subtitle="A collection of projects showcasing my skills in full-stack development, from small applications to enterprise-level solutions."
      />

      {/* Projects Grid */}
      <Section>
        <Container>
          <Stack spacing="xl">
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
                  date={project.date}
                  liveDemo={project.link}
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
