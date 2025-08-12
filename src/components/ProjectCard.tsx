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
            </>
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
        <Stack spacing="md" className="p-6">
          <Stack direction="horizontal" spacing="sm" align="center">
            {slug ? (
              <NextLink href={`/projects/${slug}`} className="hover:underline">
                <Heading level={3}>{title}</Heading>
              </NextLink>
            ) : (
              <Heading level={3}>{title}</Heading>
            )}
          </Stack>
          <Text variant="muted">{description}</Text>

          <Stack direction="horizontal" spacing="md">
            {slug && (
              <NextLink href={`/projects/${slug}`}>
                <Button icon={ArrowRight} iconPosition="right">
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
