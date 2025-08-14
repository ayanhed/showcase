import React from "react";
import { ArrowRight } from "lucide-react";
import Card from "./ui/Card";
import Heading from "./ui/Heading";
import Button from "./ui/Button";
import { Grid, Stack, Text } from "./ui";
import Image from "next/image";
import NextLink from "next/link";
import Icon from "./ui/Icon";
import { Monitor } from "lucide-react";

interface ProjectCardProps {
  title: string;
  slug?: string;
  description: string;
  image?: string;
  isLatest?: boolean;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  slug,
  description,
  image,
  isLatest,
  index,
}) => {
  return (
    <Card className="p-0 group md:h-[300px]">
      <Grid cols={2} gap="sm" responsive={true} className="h-full">
        <div className="relative overflow-hidden bg-gray-800 w-full h-48 md:h-full">
          {image ? (
            <Image
              src={image}
              alt={`${title} screenshot`}
              fill
              priority={Boolean(isLatest) || index === 0}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Icon icon={Monitor} size="2xl" className="text-white" />
                </div>
                <Text weight="semibold">Project Screenshot</Text>
                <Text size="sm" variant="muted">
                  Placeholder
                </Text>
              </div>
            </div>
          )}
        </div>
        <Stack spacing="md" className="p-4 sm:p-6 flex-1 min-w-0">
          <Heading level={4}>{title}</Heading>
          <Text variant="muted">{description}</Text>

          <Stack direction="horizontal" spacing="md" className="mt-auto">
            {slug && (
              <NextLink href={`/projects/${slug}`}>
                <Button
                  icon={ArrowRight}
                  iconPosition="right"
                  size="sm"
                  className="text-sm"
                >
                  Read more
                </Button>
              </NextLink>
            )}
          </Stack>
        </Stack>
      </Grid>
    </Card>
  );
};

export default ProjectCard;
