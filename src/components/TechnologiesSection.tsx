import React from "react";
import Section from "./ui/Section";
import Heading from "./ui/Heading";
import { Animate, Text, SkillSpectrum } from "./ui";

interface TechnologyItem {
  name: string;
  weight: number;
}

interface TechnologiesSectionProps {
  technologies: TechnologyItem[];
}

const TechnologiesSection: React.FC<TechnologiesSectionProps> = ({
  technologies,
}) => {
  // Prepare mapping name -> numeric value for SkillSpectrum
  const mapping = Object.fromEntries(
    technologies.map((t) => [t.name, t.weight])
  );

  return (
    <Section>
      <Animate
        type="slideUp"
        duration={0.8}
        once={true}
        className="text-center mb-12"
      >
        <Heading level={2} className="mb-4" showDot>
          Technologies I use
        </Heading>
        <Text
          size="lg"
          variant="muted"
          align="center"
          className="max-w-2xl mx-auto"
        >
          Over the years, I have worked with a variety of technologies. Here are
          some of the technologies I have experience with:
        </Text>
      </Animate>

      <Animate type="slideUp" duration={0.8} delay={0.15} once={true}>
        <SkillSpectrum
          technologies={technologies.map((t) => t.name)}
          mapping={mapping}
          className="mb-10"
        />
      </Animate>

      <Animate
        type="fade"
        duration={0.8}
        delay={0.4}
        once={true}
        className="text-center mt-8"
      >
        <Text variant="muted" align="center">
          ...and many more!
        </Text>
      </Animate>
    </Section>
  );
};

export default TechnologiesSection;
