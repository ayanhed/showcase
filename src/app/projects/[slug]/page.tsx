"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { projects, Project } from "@/lib/data";
import { Heading, Text, Badge, Stack, Grid, Button } from "@/components/ui";
import { ArrowRight } from "lucide-react";

export default function ProjectPage() {
  const params = useParams<{ slug: string }>();
  const slug = (params?.slug as string) || "";
  const project = (projects as Project[]).find((p) => p.slug === slug);
  if (!project) return null;

  return (
    <div className="space-y-6">
      {/* Mobile Layout: Image at top */}
      <div className="block lg:hidden">
        <div className="relative overflow-hidden bg-gray-800 w-full h-48 sm:h-64 rounded-lg mb-6">
          {project.projectImage && (
            <Image
              src={project.projectImage}
              alt={`${project.title} screenshot`}
              fill
              sizes="100dvw"
              className="object-cover"
              priority
            />
          )}
        </div>
        <Stack spacing="md">
          <Heading level={2} className="text-xl sm:text-2xl">
            {project.title}
          </Heading>
          <Text variant="muted" className="text-sm sm:text-base">
            {project.description}
          </Text>
          {project.link && (
            <Button
              as="a"
              href={project.link}
              icon={ArrowRight}
              iconPosition="right"
              size="sm"
            >
              Visit website
            </Button>
          )}
        </Stack>
      </div>

      {/* Desktop Layout: Side by side */}
      <Grid cols={2} gap="lg" responsive={true} className="hidden lg:grid">
        <div className="relative overflow-hidden bg-gray-800 w-full h-48 sm:h-64 md:h-80 lg:h-70 rounded-lg">
          {project.projectImage && (
            <Image
              src={project.projectImage}
              alt={`${project.title} screenshot`}
              fill
              sizes="(min-width: 1024px) 40dvw, (min-width: 768px) 50dvw, 100dvw"
              className="object-cover"
              priority
            />
          )}
        </div>
        <Stack spacing="md">
          <Heading level={2} className="text-xl sm:text-2xl lg:text-3xl">
            {project.title}
          </Heading>
          <Text variant="muted" className="text-sm sm:text-base">
            {project.description}
          </Text>
          {project.link && (
            <Button
              as="a"
              href={project.link}
              icon={ArrowRight}
              iconPosition="right"
              size="sm"
            >
              Visit website
            </Button>
          )}
        </Stack>
      </Grid>

      {project.techDetails && (
        <div className="mt-10">
          <Heading level={3}>Tech Stack</Heading>
          <Grid cols={2} gap="md" responsive={true} className="mt-4">
            <div>
              <Text weight="semibold">Frontend</Text>
              <Stack
                direction="horizontal"
                spacing="sm"
                wrap={true}
                className="mt-2"
              >
                {project.techDetails.frontend?.map((t) => (
                  <Badge key={t} size="sm">
                    {t}
                  </Badge>
                ))}
              </Stack>
            </div>
            <div>
              <Text weight="semibold">Backend</Text>
              <Stack
                direction="horizontal"
                spacing="sm"
                wrap={true}
                className="mt-2"
              >
                {project.techDetails.backend?.map((t) => (
                  <Badge key={t} size="sm">
                    {t}
                  </Badge>
                ))}
              </Stack>
            </div>
            <div>
              <Text weight="semibold">Key Libraries</Text>
              <Stack
                direction="horizontal"
                spacing="sm"
                wrap={true}
                className="mt-2"
              >
                {project.techDetails.libraries?.map((t) => (
                  <Badge key={t} size="sm">
                    {t}
                  </Badge>
                ))}
              </Stack>
            </div>
            <div>
              <Text weight="semibold">Build Tools</Text>
              <Stack
                direction="horizontal"
                spacing="sm"
                wrap={true}
                className="mt-2"
              >
                {project.techDetails.tools?.map((t) => (
                  <Badge key={t} size="sm">
                    {t}
                  </Badge>
                ))}
              </Stack>
            </div>
          </Grid>
        </div>
      )}

      {project.features && (
        <div className="mt-10">
          <Heading level={3}>Key Features</Heading>
          <Stack spacing="sm" className="mt-4">
            {project.features.map((f, idx) => (
              <Text key={idx} className="text-sm sm:text-base">
                • {f}
              </Text>
            ))}
          </Stack>
        </div>
      )}

      {project.challenge && (
        <div className="mt-10">
          <Heading level={3}>Notable Challenge</Heading>
          <Text variant="muted" className="mt-2 text-sm sm:text-base">
            {project.challenge}
          </Text>
        </div>
      )}

      {project.result && (
        <div className="mt-10">
          <Heading level={3}>Result / Status</Heading>
          <Text variant="muted" className="mt-2 text-sm sm:text-base">
            {project.result}
          </Text>
        </div>
      )}
    </div>
  );
}
