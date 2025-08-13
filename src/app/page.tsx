"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { personalInfo, skills, projects, contactInfo } from "@/lib/data";

// Import our new components
import Hero from "@/components/Hero";
import TechnologiesSection from "@/components/TechnologiesSection";
import ContactForm from "@/components/ContactForm";
import {
  Section,
  Heading,
  Button,
  Animate,
  Stack,
  Text,
} from "@/components/ui";
import FeatureCard from "@/components/FeatureCard";
import ProjectCard from "@/components/ProjectCard";
import { Briefcase, Laptop } from "lucide-react";
import ContactQuickLinks from "@/components/ContactQuickLinks";

export default function Home() {
  return (
    <div id="home">
      {/* Hero Section - Now using our component */}
      <Hero personalInfo={personalInfo} />
      {/* About Me Section - Refactored with components */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side */}
          <Animate type="slideLeft" duration={0.8} delay={0.4} once={true}>
            <Heading level={2} showDot>
              About me
            </Heading>
            <Text size="lg" variant="muted">
              I build things for the web and occasionally break them just to
              make them better. My happy place is somewhere between designing
              sleek UIs, engineering scalable backends, and finding that one
              missing semicolon that ruined everything.
            </Text>
            <Text size="lg" variant="muted">
              This site is my digital workshop — a mix of blog posts, side
              projects, and random experiments. Sometimes it’s polished,
              sometimes it’s chaotic, but it’s always me, building, learning,
              and sharing along the way.
            </Text>
            <Stack direction="horizontal" spacing="md">
              <Button icon={ArrowRight} iconPosition="right">
                <Link target="_blank" href={contactInfo.github}>
                  My Github
                </Link>
              </Button>
              <Button
                variant="secondary"
                icon={ArrowRight}
                iconPosition="right"
              >
                <Link href="/contact">Contact me</Link>
              </Button>
            </Stack>
          </Animate>

          {/* Right Side */}
          <Animate
            type="slideRight"
            duration={0.8}
            delay={0.4}
            once={true}
            className="space-y-6"
          >
            {/* Services Cards */}
            <Stack spacing="md">
              <FeatureCard
                icon={Briefcase}
                title="Professional"
                description="With 8+ years of experience in software development, I've worked on diverse projects from startups to enterprise solutions. Always learning, always growing."
                variant="purple"
                cta={{
                  text: "View Timeline",
                  href: "/about",
                }}
              />
              <FeatureCard
                icon={Laptop}
                title="Freelance"
                description="Whether you need a new project developed from scratch or assistance with an ongoing one, I offer expert freelance services tailored to your needs."
                variant="green"
                cta={{
                  text: "Contact me",
                  href: "/contact",
                }}
              />
            </Stack>
          </Animate>
        </div>
      </Section>

      {/* Technologies Section - Now using our component */}
      <TechnologiesSection technologies={skills.technologies} />

      {/* Recent Projects Section - Refactored */}
      <Section>
        <Animate
          type="slideUp"
          duration={0.8}
          delay={0.4}
          once={true}
          className="text-center mb-12"
        >
          <Heading level={2} showDot>
            Recent Projects
          </Heading>
          <Text
            size="lg"
            variant="muted"
            align="center"
            className="max-w-2xl mx-auto"
          >
            Explore some of my recent projects below. For more, visit my GitHub
            profile.
          </Text>
        </Animate>

        <Stack spacing="xl">
          {projects.map((project, index) => (
            <Animate
              key={project.title}
              type="slideUp"
              duration={0.8}
              delay={index * 0.2}
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
      </Section>

      {/* Contact Section - Refactored */}
      <Section>
        <Animate
          type="slideUp"
          duration={0.8}
          delay={0.4}
          once={true}
          className="text-center mb-12"
        >
          <Heading level={2} showDot>
            Contact me
          </Heading>
          <Text
            size="lg"
            variant="muted"
            align="center"
            className="max-w-2xl mx-auto"
          >
            I&apos;m always eager to explore new opportunities and take on
            exciting projects. If you have a project in mind, or just want to
            say hi, feel free to send me a message.
          </Text>
        </Animate>

        {/* Contact Form - Now using our component */}
        <ContactForm />
        <ContactQuickLinks />
      </Section>
    </div>
  );
}
