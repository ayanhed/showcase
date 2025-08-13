import Image from "next/image";
import { getProject } from "./actions";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Badge from "@/components/ui/Badge";
import Stack from "@/components/ui/Stack";
import Grid from "@/components/ui/Grid";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

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
              sizes="100vw"
              className="object-cover"
              priority
            />
          )}
        </div>
        <Stack spacing="md">
          <Heading level={2}>{project.title}</Heading>
          <Text variant="muted">{project.description}</Text>
          {project.link && (
            <Button
              as="a"
              href={project.link}
              target="_blank"
              icon={ArrowRight}
              iconPosition="right"
              size="sm"
            >
              View Project
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
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          )}
        </div>
        <Stack spacing="md">
          <Heading level={2}>{project.title}</Heading>
          <Text variant="muted">{project.description}</Text>
          {project.link && (
            <Button
              as="a"
              href={project.link}
              target="_blank"
              icon={ArrowRight}
              iconPosition="right"
              size="sm"
            >
              View Project
            </Button>
          )}
        </Stack>
      </Grid>

      {project.techDetails && (
        <div className="mt-10">
          <Heading level={3} showDot>
            Tech Stack
          </Heading>
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
          <Heading level={3} showDot>
            Key Features
          </Heading>
          <ul className="mt-4 list-disc pl-5">
            {project.features.map((f, idx) => (
              <li key={idx}>
                <Text variant="muted">{f}</Text>
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.challenge && (
        <div className="mt-10">
          <Heading level={3} showDot>
            Notable Challenge
          </Heading>
          <Text variant="muted">{project.challenge}</Text>
        </div>
      )}

      {project.result && (
        <div className="mt-10">
          <Heading level={3} showDot>
            Result / Status
          </Heading>
          <Text variant="muted">{project.result}</Text>
        </div>
      )}
    </div>
  );
}
