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

// Reusable section header component
const SectionHeader = ({
  title,
  subtitle,
  delay = 0,
}: {
  title: string;
  subtitle: string;
  delay?: number;
}) => (
  <Animate
    type="slideUp"
    duration={0.8}
    delay={delay}
    once={true}
    className="text-center mb-12"
  >
    <Heading level={2} className="mb-4" showDot>
      {title}
    </Heading>
    <Text
      size="lg"
      variant="muted"
      align="center"
      className="max-w-2xl mx-auto"
    >
      {subtitle}
    </Text>
  </Animate>
);

// Reusable animated card component
const AnimatedCard = ({
  children,
  delay = 0.2,
  animationType = "slideUp",
}: {
  children: React.ReactNode;
  delay?: number;
  animationType?: "slideUp" | "scale";
}) => (
  <Animate type={animationType} duration={0.8} delay={delay} once={true}>
    <Card>{children}</Card>
  </Animate>
);

// Timeline dot component
const TimelineDot = () => (
  <div className="absolute left-4 top-3 -translate-x-1/2" aria-hidden="true">
    <span className="relative flex h-3 w-3">
      <span className="absolute inline-flex h-3 w-3 rounded-full bg-blue-500/35" />
      <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-400" />
    </span>
  </div>
);

// Contact buttons component
const ContactButtons = () => (
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
        Request CV
      </Button>
      <Button variant="secondary" icon={ArrowRight} iconPosition="right">
        <a href={contactInfo.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </Button>
    </Stack>
  </Animate>
);

// About text content component
const AboutContent = () => (
  <Animate
    type="slideUp"
    duration={0.8}
    delay={0.2}
    once={true}
    className="prose prose-lg max-w-none"
  >
    <Stack spacing="lg">
      <Text variant="muted">
        I&apos;m {personalInfo.name.split(" ")[0]}, a passionate developer who
        loves building modern web applications that solve real-world problems.
        With over 8 years of experience, I&apos;ve worked on projects ranging
        from small business websites to enterprise-level applications.
      </Text>
      <Text variant="muted">
        My expertise lies in full-stack development with a focus on React,
        Node.js, and TypeScript. I have extensive experience with cloud
        platforms like Azure and AWS, and I&apos;m well-versed in DevOps
        practices including CI/CD, Docker, and infrastructure management.
      </Text>
      <Text variant="muted">
        I believe in writing clean, maintainable code and delivering solutions
        that not only meet requirements but exceed expectations. My approach
        combines technical excellence with a deep understanding of business
        needs.
      </Text>
    </Stack>
  </Animate>
);

// Experience timeline component
const ExperienceTimeline = () => (
  <div className="relative">
    <div
      className="pointer-events-none absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-zinc-700/60 via-zinc-800/40 to-transparent"
      aria-hidden="true"
    />
    <Stack spacing="xl">
      {experience.map((exp, index) => (
        <div key={exp.title} className="relative pl-12">
          <TimelineDot />
          <Animate
            type="slideUp"
            duration={0.7}
            delay={index * 0.08}
            once={true}
          >
            <Card>
              <Stack spacing="xl">
                <Heading level={5} className="mb-2 sm:mb-0">
                  {exp.title}
                </Heading>
                <Text size="sm" variant="muted">
                  {exp.period}
                </Text>
              </Stack>
              <Stack>
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
);

// Languages grid component
const LanguagesGrid = () => (
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
);

export default function About() {
  return (
    <div id="about">
      {/* Hero Section */}
      <HeroSection title="About Me">
        <AboutContent />
        <ContactButtons />
      </HeroSection>

      {/* Technologies Section */}
      <TechnologiesSection technologies={skills.technologies} />

      {/* Experience Section */}
      <Section>
        <Container>
          <SectionHeader
            title="Experience"
            subtitle="My professional journey in software development"
          />
          <ExperienceTimeline />
        </Container>
      </Section>

      {/* Education Section */}
      <Section>
        <Container>
          <SectionHeader title="Education" subtitle="My academic background" />
          <AnimatedCard>
            <div className="mb-4">
              <Heading level={3} className="mb-2">
                {personalInfo.education.degree}
              </Heading>
              <Text variant="accent" weight="medium">
                {personalInfo.education.university}
              </Text>
            </div>
          </AnimatedCard>
        </Container>
      </Section>

      {/* Languages Section */}
      <Section>
        <Container>
          <SectionHeader
            title="Languages"
            subtitle="Languages I speak and understand"
          />
          <LanguagesGrid />
        </Container>
      </Section>
    </div>
  );
}
