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
    <Grid cols={2} gap="lg" responsive={true}>
      <div className="relative overflow-hidden bg-gray-800 w-full aspect-video rounded-lg">
        {project.projectImage && (
          <Image
            src={project.projectImage}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        )}
      </div>
      <Stack spacing="md">
        <Heading level={2}>{project.title}</Heading>
        <Text variant="muted">{project.description}</Text>
        <Stack direction="horizontal" spacing="md">
          {project.link && (
            <Button
              as="a"
              href={project.link}
              icon={ArrowRight}
              iconPosition="right"
            >
              Visit website
            </Button>
          )}
        </Stack>
      </Stack>

      {project.techDetails && (
        <div className="col-span-2 mt-10">
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
        <div className="col-span-2 mt-10">
          <Heading level={3}>Key Features</Heading>
          <Stack spacing="sm" className="mt-4">
            {project.features.map((f, idx) => (
              <Text key={idx}>• {f}</Text>
            ))}
          </Stack>
        </div>
      )}

      {project.challenge && (
        <div className="col-span-2 mt-10">
          <Heading level={3}>Notable Challenge</Heading>
          <Text variant="muted" className="mt-2">
            {project.challenge}
          </Text>
        </div>
      )}

      {project.result && (
        <div className="col-span-2 mt-10">
          <Heading level={3}>Result / Status</Heading>
          <Text variant="muted" className="mt-2">
            {project.result}
          </Text>
        </div>
      )}
    </Grid>
  );
}
