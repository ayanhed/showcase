import React from "react";
import { ArrowRight } from "lucide-react";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import Heading from "./ui/Heading";
import Button from "./ui/Button";
import { Grid, Stack, Text } from "./ui";

interface ProjectCardProps {
  title: string;
  description: string;
  date: string;
  techStack: string[];
  liveDemo?: string;
  github?: string;
  caseStudy?: string;
  image?: string;
  isLatest?: boolean;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  date,
  techStack,
  liveDemo,
  github,
  caseStudy,
  image,
  isLatest,
  index,
}) => {
  return (
    <Card>
      <Grid cols={2} gap="lg" responsive={true}>
        <Stack spacing="md">
          <Stack direction="horizontal" spacing="sm" align="center">
            <Heading level={3}>{title}</Heading>
            {isLatest && (
              <Badge variant="warning" size="sm">
                🔥 Latest
              </Badge>
            )}
          </Stack>
          <Text variant="muted">{date}</Text>
          <Text variant="muted">{description}</Text>

          {/* Tech Stack */}
          <Stack direction="horizontal" spacing="sm" wrap={true}>
            {techStack.map((tech) => (
              <Badge key={tech} size="sm">
                {tech}
              </Badge>
            ))}
          </Stack>

          <Stack direction="horizontal" spacing="md">
            {liveDemo && (
              <Button icon={ArrowRight} iconPosition="right">
                <a href={liveDemo}>Visit website</a>
              </Button>
            )}
            {github && (
              <Button
                variant="secondary"
                icon={ArrowRight}
                iconPosition="right"
              >
                <a href={github}>View code</a>
              </Button>
            )}
          </Stack>
        </Stack>

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
      </Grid>
    </Card>
  );
};

export default ProjectCard;
