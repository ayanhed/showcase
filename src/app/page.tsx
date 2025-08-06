"use client";

import Link from "next/link";
import { ArrowRight, Github, Mail, MessageCircle } from "lucide-react";
import { personalInfo, skills, projects, contactInfo } from "@/lib/data";

// Import our new components
import Hero from "@/components/Hero";
import TechnologiesSection from "@/components/TechnologiesSection";
import ContactForm from "@/components/ContactForm";
import {
  Section,
  Heading,
  Button,
  Badge,
  Card,
  Animate,
  Stack,
  Text,
} from "@/components/ui";
import FeatureCard from "@/components/FeatureCard";

export default function Home() {
  return (
    <div id="home">
      {/* Hero Section - Now using our component */}
      <Hero personalInfo={personalInfo} />
      {/* About Me Section - Refactored with components */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side */}
          <Animate type="slideLeft" duration={0.8} once={true}>
            <Heading level={2} className="mb-6">
              About me.
            </Heading>
            <Text size="lg" variant="muted">
              I have been coding for over 8 years, beginning my journey in 2016.
              I specialize in building scalable, production-grade systems using
              modern web technologies and cloud-native architectures.
            </Text>
            <Text size="lg" variant="muted">
              My expertise lies in full-stack development with React, Node.js,
              and TypeScript, along with extensive experience in Azure cloud
              infrastructure and DevOps practices including CI/CD pipelines.
            </Text>
            <Stack direction="horizontal" spacing="md">
              <Button icon={ArrowRight} iconPosition="right">
                <Link href={contactInfo.github}>View my Github</Link>
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
            once={true}
            className="space-y-6"
          >
            {/* Services Cards */}
            <Stack spacing="md">
              <FeatureCard
                icon="⭐"
                title="Professional"
                description="With 8+ years of experience in software development, I've worked on diverse projects from startups to enterprise solutions. Always learning, always growing."
                variant="purple"
                cta={{
                  text: "View Timeline",
                  href: "/about",
                }}
              />
              <FeatureCard
                icon="💻"
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

      {/* Recent Projects Section - Refactored */}
      <Section>
        <Animate
          type="slideUp"
          duration={0.8}
          once={true}
          className="text-center mb-12"
        >
          <Heading level={2} className="mb-4">
            Recent Projects.
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
          {projects.slice(0, 2).map((project, index) => (
            <Animate
              key={project.title}
              type="slideUp"
              duration={0.8}
              delay={index * 0.2}
              once={true}
            >
              <Card>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Heading level={3}>{project.title}</Heading>
                      {project.isLatest && (
                        <Badge variant="warning">🔥 Latest</Badge>
                      )}
                    </div>
                    <Text variant="muted">{project.date}</Text>
                    <Text variant="muted">{project.description}</Text>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>

                    <Button icon={ArrowRight} iconPosition="right">
                      <Link href={project.link}>Visit website</Link>
                    </Button>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white text-2xl">🖥️</span>
                      </div>
                      <Text weight="semibold">Project Screenshot</Text>
                      <Text size="sm" variant="muted">
                        Placeholder
                      </Text>
                    </div>
                  </div>
                </div>
              </Card>
            </Animate>
          ))}
        </Stack>
      </Section>

      {/* Technologies Section - Now using our component */}
      <TechnologiesSection technologies={skills.technologies} />

      {/* Contact Section - Refactored */}
      <Section>
        <Animate
          type="slideUp"
          duration={0.8}
          once={true}
          className="text-center mb-12"
        >
          <Heading level={2} className="mb-4">
            Contact me.
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

        <Animate
          type="slideUp"
          duration={0.8}
          delay={0.4}
          once={true}
          className="text-center mt-8"
        >
          <Text variant="muted" align="center">
            Or contact me with...
          </Text>
          <Stack direction="horizontal" spacing="md" className="justify-center">
            <Button variant="secondary" icon={Mail}>
              <Link href={`mailto:${contactInfo.email}`}>Email</Link>
            </Button>
            <Button variant="secondary" icon={Github}>
              <Link href={contactInfo.github}>GitHub</Link>
            </Button>
            <Button variant="secondary" icon={MessageCircle}>
              <Link href="#">LinkedIn</Link>
            </Button>
          </Stack>
        </Animate>
      </Section>
    </div>
  );
}
