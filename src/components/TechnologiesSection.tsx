import React from "react";
import Section from "./ui/Section";
import Heading from "./ui/Heading";
import Badge from "./ui/Badge";
import { Animate, Grid, Stack, Text } from "./ui";

interface TechnologiesSectionProps {
  technologies: string[];
}

const TechnologiesSection: React.FC<TechnologiesSectionProps> = ({
  technologies,
}) => {
  return (
    <Section>
      <Animate
        type="slideUp"
        duration={0.8}
        once={true}
        className="text-center mb-12"
      >
        <Heading level={2} className="mb-4">
          Technologies I use.
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

      <Animate type="slideUp" duration={0.8} delay={0.2} once={true}>
        <Grid cols={6} gap="md" responsive={true}>
          {technologies.map((tech, index) => (
            <Animate
              key={tech}
              type="scale"
              duration={0.5}
              delay={index * 0.05}
              once={true}
            >
              <Badge className="w-full text-center justify-center">
                {tech}
              </Badge>
            </Animate>
          ))}
        </Grid>
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
