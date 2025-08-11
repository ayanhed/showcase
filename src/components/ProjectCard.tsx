import React from "react";
import { ArrowRight } from "lucide-react";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import Heading from "./ui/Heading";
import Button from "./ui/Button";
import { Grid, Stack, Text } from "./ui";
import Image from "next/image";

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
    <Card className="p-0 overflow-hidden">
      <Grid cols={2} gap="lg" responsive={true}>
        <div className="relative overflow-hidden bg-gray-800 w-full ">
          {image ? (
            <>
              <Image
                src={image}
                alt={`${title} screenshot`}
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                priority={Boolean(isLatest) || index === 0}
                className="object-cover"
              />
              {/* <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b via-transparent to-dark-card"></div> */}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
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
          )}
        </div>
        <Stack spacing="md" className="p-6">
          <Stack direction="horizontal" spacing="sm" align="center">
            <Heading level={3}>{title}</Heading>
          </Stack>
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
      </Grid>
    </Card>
  );
};

export default ProjectCard;
