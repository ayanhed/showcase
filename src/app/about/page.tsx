"use client";

import { ArrowRight } from "lucide-react";
import { personalInfo, skills, experience, contactInfo } from "@/lib/data";
import {
  Section,
  Heading,
  Button,
  Card,
  Container,
  HeroSection,
  Animate,
  Stack,
  Grid,
  Text,
} from "@/components/ui";
import TechnologiesSection from "@/components/TechnologiesSection";

export default function About() {
  return (
    <div id="about">
      {/* Hero Section */}
      <HeroSection title="About Me" subtitle={personalInfo.about}>
        <Animate
          type="slideUp"
          duration={0.8}
          delay={0.2}
          once={true}
          className="prose prose-lg max-w-none"
        >
          <Stack spacing="lg">
            <Text size="lg" variant="muted">
              I&apos;m {personalInfo.name.split(" ")[0]}, a passionate developer
              who loves building modern web applications that solve real-world
              problems. With over 8 years of experience, I&apos;ve worked on
              projects ranging from small business websites to enterprise-level
              applications.
            </Text>
            <Text size="lg" variant="muted">
              My expertise lies in full-stack development with a focus on React,
              Node.js, and TypeScript. I have extensive experience with cloud
              platforms like Azure and AWS, and I&apos;m well-versed in DevOps
              practices including CI/CD, Docker, and infrastructure management.
            </Text>
            <Text size="lg" variant="muted">
              I believe in writing clean, maintainable code and delivering
              solutions that not only meet requirements but exceed expectations.
              My approach combines technical excellence with a deep
              understanding of business needs.
            </Text>
          </Stack>
        </Animate>

        {/* Contact Links */}
        <Animate type="slideUp" duration={0.8} delay={0.4} once={true}>
          <Stack
            direction="horizontal"
            spacing="md"
            className="justify-center"
            wrap={true}
          >
            <Button icon={ArrowRight} iconPosition="right">
              <a href="/contact">Get in Touch</a>
            </Button>
            <Button variant="secondary" icon={ArrowRight} iconPosition="right">
              <a href="#">Download CV</a>
            </Button>
            <Button variant="secondary" icon={ArrowRight} iconPosition="right">
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </Button>
          </Stack>
        </Animate>
      </HeroSection>

      {/* Technologies Section */}
      <TechnologiesSection technologies={skills.technologies} />

      {/* Experience Section */}
      <Section>
        <Container>
          <Animate
            type="slideUp"
            duration={0.8}
            once={true}
            className="text-center mb-12"
          >
            <Heading level={2} className="mb-4" showDot>
              Experience
            </Heading>
            <Text
              size="lg"
              variant="muted"
              align="center"
              className="max-w-2xl mx-auto"
            >
              My professional journey in software development
            </Text>
          </Animate>

          <div className="relative">
            <div
              className="pointer-events-none absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-zinc-700/60 via-zinc-800/40 to-transparent"
              aria-hidden="true"
            />
            <Stack spacing="xl">
              {experience.map((exp, index) => (
                <div key={exp.title} className="relative pl-12">
                  <div
                    className="absolute left-4 top-3 -translate-x-1/2"
                    aria-hidden="true"
                  >
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-3 w-3 rounded-full bg-blue-500/35" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-400" />
                    </span>
                  </div>
                  <Animate
                    type="slideUp"
                    duration={0.7}
                    delay={index * 0.08}
                    once={true}
                  >
                    <Card>
                      <Stack spacing="md">
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                          <Heading level={3} className="mb-2 sm:mb-0">
                            {exp.title}
                          </Heading>
                          <Text size="sm" variant="muted" className="sm:ml-4">
                            {exp.period}
                          </Text>
                        </div>
                        <Text variant="accent" weight="medium">
                          {exp.company}
                        </Text>
                        <Stack spacing="sm">
                          {exp.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <Text size="sm" variant="muted">
                                {achievement}
                              </Text>
                            </div>
                          ))}
                        </Stack>
                      </Stack>
                    </Card>
                  </Animate>
                </div>
              ))}
            </Stack>
          </div>
        </Container>
      </Section>

      {/* Education Section */}
      <Section>
        <Container>
          <Animate
            type="slideUp"
            duration={0.8}
            once={true}
            className="text-center mb-12"
          >
            <Heading level={2} className="mb-4" showDot>
              Education
            </Heading>
            <Text
              size="lg"
              variant="muted"
              align="center"
              className="max-w-2xl mx-auto"
            >
              My academic background
            </Text>
          </Animate>

          <Animate type="slideUp" duration={0.8} delay={0.2} once={true}>
            <Card>
              <div className="mb-4">
                <Heading level={3} className="mb-2">
                  {personalInfo.education.degree}
                </Heading>
                <Text variant="accent" weight="medium">
                  {personalInfo.education.university}
                </Text>
              </div>
            </Card>
          </Animate>
        </Container>
      </Section>

      {/* Languages Section */}
      <Section>
        <Container>
          <Animate
            type="slideUp"
            duration={0.8}
            once={true}
            className="text-center mb-12"
          >
            <Heading level={2} className="mb-4" showDot>
              Languages
            </Heading>
            <Text
              size="lg"
              variant="muted"
              align="center"
              className="max-w-2xl mx-auto"
            >
              Languages I speak and understand
            </Text>
          </Animate>

          <Animate type="slideUp" duration={0.8} delay={0.2} once={true}>
            <Grid cols={2} gap="md" responsive={true}>
              {personalInfo.languages.map((language, index) => (
                <Animate
                  key={language.name}
                  type="scale"
                  duration={0.5}
                  delay={index * 0.1}
                  once={true}
                >
                  <Card>
                    <div className="flex justify-between items-center">
                      <Text weight="medium">{language.name}</Text>
                      <Text size="sm" variant="muted">
                        {language.level}
                      </Text>
                    </div>
                  </Card>
                </Animate>
              ))}
            </Grid>
          </Animate>
        </Container>
      </Section>
    </div>
  );
}
